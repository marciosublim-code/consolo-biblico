// Banco de dados local (SQLite) com o texto completo da Bíblia
// (Tradução Brasileira, 1917 — domínio público) e o índice de temas.

import Database from "better-sqlite3";

const db = new Database("consolo.db");
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS versiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    livro_abrev TEXT NOT NULL,
    livro_nome TEXT NOT NULL,
    capitulo INTEGER NOT NULL,
    versiculo INTEGER NOT NULL,
    texto TEXT NOT NULL,
    UNIQUE(livro_abrev, capitulo, versiculo)
  );

  CREATE INDEX IF NOT EXISTS idx_versiculos_ref
    ON versiculos(livro_abrev, capitulo, versiculo);
`);

// Nota técnica: a tabela FTS5 (busca por palavra-chave) NÃO é criada
// aqui de propósito. Criá-la vazia antes de importar os 31 mil
// versículos corrompe o índice nesse build do SQLite. Ela só é criada
// depois que os dados já existem, dentro de reconstruirIndiceFts().

export function importarVersiculo(livroAbrev, livroNome, capitulo, versiculo, texto) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO versiculos (livro_abrev, livro_nome, capitulo, versiculo, texto)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(livroAbrev, livroNome, capitulo, versiculo, texto);
}

export function reconstruirIndiceFts() {
  db.exec(`DROP TABLE IF EXISTS versiculos_fts;`);
  db.exec(`
    CREATE VIRTUAL TABLE versiculos_fts USING fts5(
      texto, content='versiculos', content_rowid='id'
    );
  `);
  db.exec(`
    INSERT INTO versiculos_fts(rowid, texto)
    SELECT id, texto FROM versiculos;
  `);
}

export function contarVersiculos() {
  return db.prepare("SELECT COUNT(*) AS total FROM versiculos").get().total;
}

// Busca um intervalo de versículos (ex: Filipenses 4:6 a 4:7)
export function obterPassagem(livroAbrev, capitulo, versiculoInicio, versiculoFim = null) {
  const fim = versiculoFim ?? versiculoInicio;
  return db
    .prepare(`
      SELECT * FROM versiculos
      WHERE livro_abrev = ? AND capitulo = ? AND versiculo BETWEEN ? AND ?
      ORDER BY versiculo
    `)
    .all(livroAbrev, capitulo, versiculoInicio, fim);
}

// Busca livre por palavra-chave no texto inteiro da Bíblia (fallback).
// Requer que reconstruirIndiceFts() já tenha sido rodado uma vez.
export function buscarPorPalavra(palavra, limite = 5) {
  const existeTabela = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='versiculos_fts'"
    )
    .get();

  if (!existeTabela) {
    throw new Error(
      "Índice de busca ainda não foi criado. Rode 'npm run importar' primeiro."
    );
  }

  return db
    .prepare(`
      SELECT v.* FROM versiculos_fts f
      JOIN versiculos v ON v.id = f.rowid
      WHERE versiculos_fts MATCH ?
      LIMIT ?
    `)
    .all(palavra, limite);
}

export default db;
