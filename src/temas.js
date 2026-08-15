// Dicionário de temas: liga sentimentos do dia a dia (palavras-chave em
// linguagem comum) a passagens bíblicas reconhecidamente relevantes para
// cada situação. O texto de cada versículo é buscado do banco (não fica
// duplicado aqui), só a referência.

// Cada passagem é: { livro (abreviação), capitulo, versiculoInicio, versiculoFim (opcional) }

export const TEMAS = [
  {
    id: "ansiedade",
    nome: "Ansiedade e preocupação",
    palavrasChave: [
      "ansioso", "ansiosa", "ansiedade", "preocupado", "preocupada",
      "preocupação", "aflito", "aflita", "nervoso", "nervosa", "agoniado",
      "aflição", "angustiado", "angustiada",
    ],
    passagens: [
      { livro: "Fp", capitulo: 4, versiculoInicio: 6, versiculoFim: 7 },
      { livro: "Mt", capitulo: 6, versiculoInicio: 25, versiculoFim: 27 },
      { livro: "1Pe", capitulo: 5, versiculoInicio: 7 },
      { livro: "Sl", capitulo: 55, versiculoInicio: 22 },
    ],
  },
  {
    id: "medo",
    nome: "Medo",
    palavrasChave: [
      "medo", "com medo", "assustado", "assustada", "temor", "temendo",
      "apavorado", "apavorada", "receio", "pânico",
    ],
    passagens: [
      { livro: "Is", capitulo: 41, versiculoInicio: 10 },
      { livro: "Js", capitulo: 1, versiculoInicio: 9 },
      { livro: "2Tm", capitulo: 1, versiculoInicio: 7 },
      { livro: "Sl", capitulo: 23, versiculoInicio: 4 },
    ],
  },
  {
    id: "tristeza_luto",
    nome: "Tristeza e luto",
    palavrasChave: [
      "triste", "tristeza", "luto", "chorando", "chorar", "perdi",
      "morreu", "morte", "falecimento", "dor", "sofrendo", "sofrimento",
      "partiu", "saudade",
    ],
    passagens: [
      { livro: "Sl", capitulo: 34, versiculoInicio: 18 },
      { livro: "Mt", capitulo: 5, versiculoInicio: 4 },
      { livro: "Ap", capitulo: 21, versiculoInicio: 4 },
      { livro: "Sl", capitulo: 147, versiculoInicio: 3 },
    ],
  },
  {
    id: "solidao",
    nome: "Solidão",
    palavrasChave: [
      "sozinho", "sozinha", "solidão", "abandonado", "abandonada",
      "isolado", "isolada", "ninguém", "esquecido", "esquecida",
    ],
    passagens: [
      { livro: "Dt", capitulo: 31, versiculoInicio: 6 },
      { livro: "Sl", capitulo: 68, versiculoInicio: 6 },
      { livro: "Hb", capitulo: 13, versiculoInicio: 5 },
      { livro: "Is", capitulo: 41, versiculoInicio: 10 },
    ],
  },
  {
    id: "cansaco",
    nome: "Cansaço e exaustão",
    palavrasChave: [
      "cansado", "cansada", "cansaço", "exausto", "exausta", "esgotado",
      "esgotada", "sem forças", "sobrecarregado", "sobrecarregada",
      "estressado", "estressada",
    ],
    passagens: [
      { livro: "Mt", capitulo: 11, versiculoInicio: 28, versiculoFim: 30 },
      { livro: "Is", capitulo: 40, versiculoInicio: 31 },
      { livro: "Sl", capitulo: 62, versiculoInicio: 1 },
    ],
  },
  {
    id: "desanimo",
    nome: "Desânimo e desesperança",
    palavrasChave: [
      "desanimado", "desanimada", "desânimo", "sem esperança",
      "desesperado", "desesperada", "desistir", "não aguento",
      "não aguento mais", "sem forças", "derrotado", "derrotada",
    ],
    passagens: [
      { livro: "Jr", capitulo: 29, versiculoInicio: 11 },
      { livro: "Rm", capitulo: 15, versiculoInicio: 13 },
      { livro: "Sl", capitulo: 42, versiculoInicio: 11 },
    ],
  },
  {
    id: "raiva",
    nome: "Raiva e irritação",
    palavrasChave: [
      "raiva", "irritado", "irritada", "bravo", "brava", "furioso",
      "furiosa", "revoltado", "revoltada", "ódio", "indignado", "indignada",
    ],
    passagens: [
      { livro: "Ef", capitulo: 4, versiculoInicio: 26 },
      { livro: "Pv", capitulo: 15, versiculoInicio: 1 },
      { livro: "Tg", capitulo: 1, versiculoInicio: 19, versiculoFim: 20 },
    ],
  },
  {
    id: "culpa_vergonha",
    nome: "Culpa e vergonha",
    palavrasChave: [
      "culpado", "culpada", "culpa", "vergonha", "envergonhado",
      "envergonhada", "errei", "pecado", "arrependido", "arrependida",
      "fracassei", "fracasso",
    ],
    passagens: [
      { livro: "1Jo", capitulo: 1, versiculoInicio: 9 },
      { livro: "Rm", capitulo: 8, versiculoInicio: 1 },
      { livro: "Sl", capitulo: 103, versiculoInicio: 12 },
    ],
  },
  {
    id: "duvida_fe",
    nome: "Dúvida e fé fraca",
    palavrasChave: [
      "dúvida", "duvidando", "sem fé", "descrente", "confuso", "confusa",
      "perdido", "perdida", "não sei", "incerteza",
    ],
    passagens: [
      { livro: "Mc", capitulo: 9, versiculoInicio: 24 },
      { livro: "Hb", capitulo: 11, versiculoInicio: 1 },
      { livro: "Pv", capitulo: 3, versiculoInicio: 5, versiculoFim: 6 },
    ],
  },
  {
    id: "gratidao",
    nome: "Gratidão",
    palavrasChave: [
      "grato", "grata", "gratidão", "agradecido", "agradecida",
      "obrigado", "feliz", "alegre", "alegria", "bênção", "abençoado",
      "abençoada",
    ],
    passagens: [
      { livro: "1Ts", capitulo: 5, versiculoInicio: 18 },
      { livro: "Sl", capitulo: 100, versiculoInicio: 4, versiculoFim: 5 },
      { livro: "Cl", capitulo: 3, versiculoInicio: 15 },
    ],
  },
  {
    id: "doenca",
    nome: "Doença e enfermidade",
    palavrasChave: [
      "doente", "doença", "enfermo", "enferma", "hospital", "cirurgia",
      "tratamento", "saúde", "adoeci", "sofrimento físico", "dor física",
    ],
    passagens: [
      { livro: "Sl", capitulo: 41, versiculoInicio: 3 },
      { livro: "Is", capitulo: 53, versiculoInicio: 5 },
      { livro: "Tg", capitulo: 5, versiculoInicio: 14, versiculoFim: 15 },
    ],
  },
  {
    id: "perdao",
    nome: "Perdão",
    palavrasChave: [
      "perdão", "perdoar", "magoado", "magoada", "traído", "traída",
      "ressentimento", "não consigo perdoar", "machucado", "machucada",
    ],
    passagens: [
      { livro: "Mt", capitulo: 6, versiculoInicio: 14, versiculoFim: 15 },
      { livro: "Cl", capitulo: 3, versiculoInicio: 13 },
      { livro: "Ef", capitulo: 4, versiculoInicio: 32 },
    ],
  },
  {
    id: "financas",
    nome: "Dificuldades financeiras",
    palavrasChave: [
      "dinheiro", "dívida", "dívidas", "desempregado", "desempregada",
      "sem dinheiro", "financeiro", "financeira", "conta", "contas",
      "falta de dinheiro",
    ],
    passagens: [
      { livro: "Fp", capitulo: 4, versiculoInicio: 19 },
      { livro: "Mt", capitulo: 6, versiculoInicio: 33 },
      { livro: "Sl", capitulo: 37, versiculoInicio: 25 },
    ],
  },
  {
    id: "relacionamentos",
    nome: "Conflitos e relacionamentos",
    palavrasChave: [
      "briga", "brigamos", "conflito", "discussão", "separação",
      "divórcio", "namoro", "casamento", "família", "amigo", "amiga",
      "relacionamento",
    ],
    passagens: [
      { livro: "Rm", capitulo: 12, versiculoInicio: 18 },
      { livro: "Mt", capitulo: 5, versiculoInicio: 9 },
      { livro: "Pv", capitulo: 15, versiculoInicio: 1 },
    ],
  },
  {
    id: "futuro_incerto",
    nome: "Incerteza sobre o futuro",
    palavrasChave: [
      "futuro", "não sei o que fazer", "incerto", "incerteza",
      "decisão", "escolha", "caminho", "não sei o caminho", "confuso",
    ],
    passagens: [
      { livro: "Jr", capitulo: 29, versiculoInicio: 11 },
      { livro: "Pv", capitulo: 3, versiculoInicio: 5, versiculoFim: 6 },
      { livro: "Rm", capitulo: 8, versiculoInicio: 28 },
    ],
  },
];

// Normaliza texto: minúsculas e sem acento, pra comparação mais tolerante
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Recebe o texto livre do usuário e retorna os temas mais relevantes,
// ordenados por pontuação (quantidade de palavras-chave batidas)
export function identificarTemas(textoUsuario, maximoTemas = 2) {
  const textoNormalizado = normalizar(textoUsuario);

  const pontuados = TEMAS.map((tema) => {
    const pontuacao = tema.palavrasChave.reduce((soma, palavra) => {
      return textoNormalizado.includes(normalizar(palavra)) ? soma + 1 : soma;
    }, 0);
    return { tema, pontuacao };
  }).filter((t) => t.pontuacao > 0);

  pontuados.sort((a, b) => b.pontuacao - a.pontuacao);

  return pontuados.slice(0, maximoTemas).map((t) => t.tema);
}
