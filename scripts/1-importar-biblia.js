// Importa o arquivo TB.json (Tradução Brasileira, domínio público) para
// o SQLite. Rode uma única vez: npm run importar

import fs from "node:fs";
import {
  importarVersiculo,
  reconstruirIndiceFts,
  contarVersiculos,
} from "../src/db.js";

const CAMINHO_JSON = "./dados/TB.json";

if (!fs.existsSync(CAMINHO_JSON)) {
  console.error(
    `❌ Não encontrei o arquivo ${CAMINHO_JSON}.\n` +
    "   Baixe em: https://github.com/damarals/biblias/releases/latest/download/TB.json\n" +
    "   e coloque dentro da pasta 'dados/'."
  );
  process.exit(1);
}

console.log("📖 Lendo arquivo da Bíblia...");
const livros = JSON.parse(fs.readFileSync(CAMINHO_JSON, "utf-8"));

console.log(`📚 ${livros.length} livros encontrados. Importando...`);

let totalImportado = 0;
for (const livro of livros) {
  livro.chapters.forEach((capituloVersiculos, indiceCapitulo) => {
    const numeroCapitulo = indiceCapitulo + 1;
    capituloVersiculos.forEach((texto, indiceVersiculo) => {
      const numeroVersiculo = indiceVersiculo + 1;
      importarVersiculo(
        livro.abbrev,
        livro.name,
        numeroCapitulo,
        numeroVersiculo,
        texto
      );
      totalImportado++;
    });
  });
}

console.log("🔍 Reconstruindo índice de busca...");
reconstruirIndiceFts();

const totalNoBanco = contarVersiculos();
console.log(`\n✅ Importação concluída!`);
console.log(`   Versículos processados: ${totalImportado}`);
console.log(`   Versículos no banco: ${totalNoBanco}`);
