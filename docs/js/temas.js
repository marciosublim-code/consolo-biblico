// Dicionário de temas emocionais → palavras-chave + referências bíblicas.
// As referências (livro/capítulo/versículo) são estrutura, não texto —
// o texto em si vem do banco em domínio público (data/biblia.json).

export const TEMAS = [
  {
    id: "ansiedade",
    rotulo: "Ansiedade",
    palavras: ["ansioso", "ansiosa", "ansiedade", "aflito", "aflita", "aflicao", "nervoso", "nervosa", "preocupado", "preocupada", "sufoco", "apavorado", "aperto no peito", "crise de ansiedade"],
    introducao: "Respira. O que você sente agora não te define — e não precisa carregar sozinho.",
    referencias: [
      { l: "Mt", c: 6, v1: 25, v2: 27 },
      { l: "Fp", c: 4, v1: 6, v2: 7 },
      { l: "1Pe", c: 5, v1: 7, v2: 7 },
      { l: "Sl", c: 94, v1: 19, v2: 19 },
      { l: "Is", c: 41, v1: 10, v2: 10 },
    ],
  },
  {
    id: "medo",
    rotulo: "Medo",
    palavras: ["medo", "com medo", "assustado", "assustada", "temor", "panico", "com receio", "amedrontado"],
    introducao: "O medo parece grande quando a gente está sozinho com ele. Você não está.",
    referencias: [
      { l: "Is", c: 41, v1: 10, v2: 10 },
      { l: "Sl", c: 27, v1: 1, v2: 1 },
      { l: "2Tm", c: 1, v1: 7, v2: 7 },
      { l: "Js", c: 1, v1: 9, v2: 9 },
      { l: "Sl", c: 56, v1: 3, v2: 3 },
    ],
  },
  {
    id: "tristeza",
    rotulo: "Tristeza e luto",
    palavras: ["triste", "tristeza", "luto", "perdi", "morreu", "falecimento", "morte", "chorando", "choro", "dor", "saudade", "perda"],
    introducao: "Chorar por quem se ama não é fraqueza. Fica aqui um pouco.",
    referencias: [
      { l: "Sl", c: 34, v1: 18, v2: 18 },
      { l: "Mt", c: 5, v1: 4, v2: 4 },
      { l: "Sl", c: 147, v1: 3, v2: 3 },
      { l: "Ap", c: 21, v1: 4, v2: 4 },
      { l: "Jo", c: 11, v1: 35, v2: 35 },
    ],
  },
  {
    id: "solidao",
    rotulo: "Solidão",
    palavras: ["sozinho", "sozinha", "solidao", "abandonado", "abandonada", "ninguem", "isolado", "isolada", "me sinto so"],
    introducao: "Sentir-se invisível dói de um jeito difícil de explicar. Ainda assim, você é visto.",
    referencias: [
      { l: "Dt", c: 31, v1: 6, v2: 6 },
      { l: "Sl", c: 68, v1: 6, v2: 6 },
      { l: "Hb", c: 13, v1: 5, v2: 5 },
      { l: "Jo", c: 14, v1: 18, v2: 18 },
      { l: "Is", c: 41, v1: 10, v2: 10 },
    ],
  },
  {
    id: "cansaco",
    rotulo: "Cansaço",
    palavras: ["cansado", "cansada", "exausto", "exausta", "esgotado", "esgotada", "sem forcas", "fadiga", "sem energia", "sobrecarregado", "sobrecarregada"],
    introducao: "Descansar não é preguiça. Às vezes é a coisa mais corajosa a fazer.",
    referencias: [
      { l: "Mt", c: 11, v1: 28, v2: 30 },
      { l: "Is", c: 40, v1: 29, v2: 31 },
      { l: "Sl", c: 62, v1: 1, v2: 1 },
      { l: "Gl", c: 6, v1: 9, v2: 9 },
    ],
  },
  {
    id: "desanimo",
    rotulo: "Desânimo e desespero",
    palavras: ["desanimado", "desanimada", "desesperado", "desesperada", "sem esperanca", "desistir", "cansei de tudo", "nao aguento mais", "desanimo"],
    introducao: "Dias assim existem. Eles não são o fim da história.",
    referencias: [
      { l: "Sl", c: 42, v1: 11, v2: 11 },
      { l: "Rm", c: 15, v1: 13, v2: 13 },
      { l: "Lm", c: 3, v1: 22, v2: 23 },
      { l: "Sl", c: 43, v1: 5, v2: 5 },
      { l: "Jr", c: 29, v1: 11, v2: 11 },
    ],
  },
  {
    id: "raiva",
    rotulo: "Raiva",
    palavras: ["raiva", "irritado", "irritada", "bravo", "brava", "furioso", "furiosa", "odio", "revoltado", "revoltada"],
    introducao: "A raiva costuma vir de um lugar de dor. Ela pode ser ouvida sem te controlar.",
    referencias: [
      { l: "Ef", c: 4, v1: 26, v2: 27 },
      { l: "Tg", c: 1, v1: 19, v2: 20 },
      { l: "Pv", c: 15, v1: 1, v2: 1 },
      { l: "Sl", c: 37, v1: 8, v2: 8 },
    ],
  },
  {
    id: "culpa",
    rotulo: "Culpa e vergonha",
    palavras: ["culpa", "culpado", "culpada", "vergonha", "arrependido", "arrependida", "errei", "pecado", "me sinto mal pelo que fiz"],
    introducao: "Reconhecer o erro é diferente de ser definido por ele.",
    referencias: [
      { l: "1Jo", c: 1, v1: 9, v2: 9 },
      { l: "Sl", c: 103, v1: 12, v2: 12 },
      { l: "Rm", c: 8, v1: 1, v2: 1 },
      { l: "Is", c: 1, v1: 18, v2: 18 },
    ],
  },
  {
    id: "duvida",
    rotulo: "Dúvida",
    palavras: ["duvida", "duvidando", "sem fe", "descrente", "incerteza", "nao sei se acredito", "fe fraca"],
    introducao: "Duvidar não te afasta — às vezes é parte do caminho.",
    referencias: [
      { l: "Mc", c: 9, v1: 24, v2: 24 },
      { l: "Hb", c: 11, v1: 1, v2: 1 },
      { l: "Tg", c: 1, v1: 6, v2: 6 },
      { l: "2Co", c: 5, v1: 7, v2: 7 },
    ],
  },
  {
    id: "gratidao",
    rotulo: "Gratidão",
    palavras: ["grato", "grata", "gratidao", "obrigado deus", "obrigada deus", "feliz", "agradecido", "agradecida", "alegre", "alegria"],
    introducao: "Que bom guardar esse momento. Ele também merece ser celebrado.",
    referencias: [
      { l: "Sl", c: 100, v1: 4, v2: 5 },
      { l: "1Ts", c: 5, v1: 18, v2: 18 },
      { l: "Sl", c: 136, v1: 1, v2: 1 },
      { l: "Fp", c: 4, v1: 4, v2: 4 },
    ],
  },
  {
    id: "doenca",
    rotulo: "Doença e saúde",
    palavras: ["doente", "doenca", "hospital", "cirurgia", "saude", "dor no corpo", "exame", "diagnostico", "tratamento"],
    introducao: "Cuidar do corpo também é um ato de fé em dias difíceis.",
    referencias: [
      { l: "Sl", c: 41, v1: 3, v2: 3 },
      { l: "Tg", c: 5, v1: 14, v2: 15 },
      { l: "Is", c: 53, v1: 5, v2: 5 },
      { l: "Sl", c: 103, v1: 2, v2: 3 },
      { l: "3Jo", c: 1, v1: 2, v2: 2 },
    ],
  },
  {
    id: "perdao",
    rotulo: "Perdão",
    palavras: ["perdoar", "perdao", "magoado", "magoada", "ressentimento", "magoa", "nao consigo perdoar"],
    introducao: "Perdoar é processo, não interruptor. Vá no seu tempo.",
    referencias: [
      { l: "Mt", c: 6, v1: 14, v2: 15 },
      { l: "Cl", c: 3, v1: 13, v2: 13 },
      { l: "Ef", c: 4, v1: 32, v2: 32 },
      { l: "Lc", c: 6, v1: 37, v2: 37 },
    ],
  },
  {
    id: "financeiro",
    rotulo: "Dificuldades financeiras",
    palavras: ["dinheiro", "financeiro", "financeira", "divida", "dividas", "desemprego", "sem dinheiro", "contas", "desempregado", "desempregada"],
    introducao: "A preocupação com o básico pesa de verdade. Ela é válida.",
    referencias: [
      { l: "Fp", c: 4, v1: 19, v2: 19 },
      { l: "Sl", c: 37, v1: 25, v2: 25 },
      { l: "Mt", c: 6, v1: 31, v2: 33 },
      { l: "Hb", c: 13, v1: 5, v2: 5 },
    ],
  },
  {
    id: "relacionamentos",
    rotulo: "Conflitos e relacionamentos",
    palavras: ["briga", "conflito", "relacionamento", "casamento", "separacao", "discussao", "namoro", "divorcio", "brigando"],
    introducao: "Relações machucam justamente porque importam.",
    referencias: [
      { l: "Rm", c: 12, v1: 18, v2: 18 },
      { l: "Cl", c: 3, v1: 13, v2: 14 },
      { l: "Ef", c: 4, v1: 2, v2: 3 },
      { l: "1Co", c: 13, v1: 4, v2: 7 },
    ],
  },
  {
    id: "futuro",
    rotulo: "Incerteza sobre o futuro",
    palavras: ["futuro", "incerto", "incerta", "nao sei o que fazer", "decisao", "medo do futuro", "nao sei pra onde ir", "insegurança sobre o futuro"],
    introducao: "Não saber o próximo passo não significa estar perdido.",
    referencias: [
      { l: "Jr", c: 29, v1: 11, v2: 11 },
      { l: "Pv", c: 3, v1: 5, v2: 6 },
      { l: "Sl", c: 32, v1: 8, v2: 8 },
      { l: "Is", c: 43, v1: 18, v2: 19 },
    ],
  },
];

// Tema geral usado quando nada bate com o texto digitado.
export const TEMA_GERAL = {
  id: "geral",
  rotulo: "Conforto",
  introducao: "Não encontrei uma palavra exata, mas separei algumas passagens que acolhem quase qualquer momento.",
  referencias: [
    { l: "Sl", c: 23, v1: 1, v2: 6 },
    { l: "Sl", c: 46, v1: 1, v2: 1 },
    { l: "Jo", c: 14, v1: 27, v2: 27 },
    { l: "Rm", c: 8, v1: 28, v2: 28 },
    { l: "Fp", c: 4, v1: 13, v2: 13 },
  ],
};

// Camada de segurança: se o texto sugerir risco de vida, isso aparece
// SEMPRE, antes de qualquer outro resultado, além dos versículos normais.
export const ALERTA_CRISE = {
  palavras: [
    "quero morrer", "quero me matar", "acabar com a minha vida", "acabar com tudo",
    "suicidio", "nao vejo motivo pra viver", "nao vejo motivo para viver",
    "nao aguento mais viver", "penso em morrer", "penso em me matar",
    "sem vontade de viver", "vontade de sumir", "melhor eu nao existir",
  ],
  referencias: [
    { l: "Sl", c: 34, v1: 18, v2: 18 },
    { l: "Sl", c: 147, v1: 3, v2: 3 },
    { l: "Mt", c: 11, v1: 28, v2: 28 },
  ],
};
