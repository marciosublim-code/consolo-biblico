// Recebe como o usuário está se sentindo e devolve versículos relevantes.
// Uso: npm run buscar -- "estou muito ansioso com o futuro"

import { obterPassagem, buscarPorPalavra } from "../src/db.js";
import { identificarTemas } from "../src/temas.js";

const textoUsuario = process.argv.slice(2).join(" ").trim();

if (!textoUsuario) {
  console.error('❌ Use: npm run buscar -- "como você está se sentindo"');
  process.exit(1);
}

const temasEncontrados = identificarTemas(textoUsuario);

if (temasEncontrados.length === 0) {
  console.log(
    "🤔 Não identifiquei um tema específico no que você escreveu.\n" +
    "   Tente descrever com outras palavras (ex: 'estou com medo', " +
    "'me sinto sozinho', 'estou grato por hoje').\n"
  );
  process.exit(0);
}

console.log(`💬 Você escreveu: "${textoUsuario}"\n`);
console.log(
  `Identifiquei que isso está relacionado a: ${temasEncontrados
    .map((t) => t.nome)
    .join(", ")}\n`
);
console.log("═".repeat(60));

for (const tema of temasEncontrados) {
  console.log(`\n📖 Para "${tema.nome}":\n`);

  for (const passagem of tema.passagens) {
    const versiculos = obterPassagem(
      passagem.livro,
      passagem.capitulo,
      passagem.versiculoInicio,
      passagem.versiculoFim
    );

    if (versiculos.length === 0) continue;

    const textoCompleto = versiculos.map((v) => v.texto).join(" ");
    const referencia =
      passagem.versiculoFim && passagem.versiculoFim !== passagem.versiculoInicio
        ? `${versiculos[0].livro_nome} ${passagem.capitulo}:${passagem.versiculoInicio}-${passagem.versiculoFim}`
        : `${versiculos[0].livro_nome} ${passagem.capitulo}:${passagem.versiculoInicio}`;

    console.log(`   "${textoCompleto}"`);
    console.log(`   — ${referencia}\n`);
  }
}

console.log("═".repeat(60));
