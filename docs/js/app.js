import { TEMAS, TEMA_GERAL, ALERTA_CRISE } from "./temas.js";

const form = document.getElementById("form-busca");
const campo = document.getElementById("campo-sentimento");
const resultados = document.getElementById("resultados");
const chips = document.querySelectorAll(".chip");
const estadoVazio = document.getElementById("estado-vazio");

let BIBLIA = null;
let INDICE = null;

const PARADAS = new Set(
  `de da do das dos e a o as os que em um uma para com se na no nas nos por como mas ao aos
   foi ser seu sua seus suas eu tu ele ela nos vos eles elas me te lhe lhes meu minha teu tua
   nosso nossa isso isto aquilo tambem ja mais muito muita muitos muitas nao sim sobre entre ate
   desde quando onde porque pois entao assim tudo nada todo toda todos todas este esta estes estas
   esse essa esses essas aquele aquela aqueles aquelas apos ainda so aqui ali la
   seja sejam sao era eram sera serao tem tinha tinham havia ha estou estava sinto sentindo`
    .split(/\s+/)
    .filter(Boolean)
);

async function carregarBiblia() {
  if (BIBLIA) return BIBLIA;
  const resp = await fetch("data/biblia.json");
  BIBLIA = await resp.json();
  return BIBLIA;
}

// Carregado só quando nenhum tema bate com o texto — evita baixar
// mais dados do que o necessário na primeira visita.
async function carregarIndice() {
  if (INDICE) return INDICE;
  const resp = await fetch("data/indice.json");
  INDICE = await resp.json();
  return INDICE;
}

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function encontrarCrise(textoNormalizado) {
  return ALERTA_CRISE.palavras.some((p) => textoNormalizado.includes(normalizar(p)));
}

// Busca full-text nos 31 mil versículos: usada quando nenhum tema
// bate com o texto digitado. Pontua cada versículo pela quantidade de
// palavras da busca que aparecem nele, dando mais peso a palavras raras.
async function buscarPorTextoLivre(textoNormalizado) {
  const indice = await carregarIndice();
  const biblia = await carregarBiblia();

  const palavras = textoNormalizado
    .split(" ")
    .filter((p) => p.length >= 3 && !PARADAS.has(p));

  if (palavras.length === 0) return [];

  const pontos = new Map(); // id do versículo -> peso acumulado
  const distintas = new Map(); // id do versículo -> nº de palavras diferentes que bateram

  palavras.forEach((p) => {
    const postagens = indice.index[p];
    if (!postagens) return;
    const peso = 1 / Math.log2(2 + postagens.length);
    postagens.forEach((i) => {
      pontos.set(i, (pontos.get(i) || 0) + peso);
      distintas.set(i, (distintas.get(i) || 0) + 1);
    });
  });

  // Prioriza versículos que batem em mais palavras diferentes da busca —
  // isso evita que um único termo raro domine o resultado sozinho.
  const ranqueados = [...pontos.entries()]
    .sort((a, b) => {
      const diff = distintas.get(b[0]) - distintas.get(a[0]);
      return diff !== 0 ? diff : b[1] - a[1];
    })
    .slice(0, 6);

  return ranqueados
    .map(([i]) => {
      const [abrev, cap, vers] = indice.refs[i];
      return { l: abrev, c: cap, v1: vers, v2: vers };
    })
    .filter((ref) => {
      const livro = biblia.livros[ref.l];
      return livro && livro.capitulos[ref.c - 1] && livro.capitulos[ref.c - 1][ref.v1 - 1];
    });
}

function pontuarTemas(textoNormalizado) {
  const pontuados = TEMAS.map((tema) => {
    const acertos = tema.palavras.filter((p) => textoNormalizado.includes(normalizar(p)));
    return { tema, pontos: acertos.length };
  }).filter((t) => t.pontos > 0);

  pontuados.sort((a, b) => b.pontos - a.pontos);
  return pontuados;
}

function textoPassagem(biblia, ref) {
  const livro = biblia.livros[ref.l];
  if (!livro) return null;
  const versiculos = livro.capitulos[ref.c - 1];
  if (!versiculos) return null;

  const partes = [];
  for (let v = ref.v1; v <= ref.v2; v++) {
    const texto = versiculos[v - 1];
    if (texto) partes.push({ numero: v, texto });
  }
  if (partes.length === 0) return null;

  const referenciaLegivel =
    ref.v1 === ref.v2 ? `${livro.nome} ${ref.c}:${ref.v1}` : `${livro.nome} ${ref.c}:${ref.v1}-${ref.v2}`;

  return { referenciaLegivel, partes };
}

function criarCartaoVersiculo(biblia, ref) {
  const passagem = textoPassagem(biblia, ref);
  if (!passagem) return null;

  const art = document.createElement("article");
  art.className = "cartao-versiculo";

  const ref_el = document.createElement("p");
  ref_el.className = "cartao-referencia";
  ref_el.textContent = passagem.referenciaLegivel;

  const texto_el = document.createElement("p");
  texto_el.className = "cartao-texto";
  texto_el.textContent = passagem.partes.map((p) => p.texto).join(" ");

  art.append(ref_el, texto_el);
  return art;
}

function criarBlocoTema(biblia, tema, variante) {
  const bloco = document.createElement("section");
  bloco.className = variante ? `bloco-tema bloco-tema--${variante}` : "bloco-tema";

  const eyebrow = document.createElement("p");
  eyebrow.className = "bloco-eyebrow";
  eyebrow.textContent = variante === "crise" ? "Antes de tudo" : tema.rotulo;

  const intro = document.createElement("p");
  intro.className = "bloco-intro";
  intro.textContent = tema.introducao;

  bloco.append(eyebrow, intro);

  if (variante === "crise") {
    const aviso = document.createElement("div");
    aviso.className = "aviso-crise";
    aviso.innerHTML = `
      <p>Se agora dói tanto que pensar em desistir da vida cruzou sua mente, por favor fale com alguém agora — você não precisa passar por isso sozinho.</p>
      <p><strong>CVV — Centro de Valorização da Vida:</strong> ligue <strong>188</strong> (24h, gratuito) ou converse pelo chat em
        <a href="https://www.cvv.org.br" target="_blank" rel="noopener">cvv.org.br</a>.</p>
    `;
    bloco.appendChild(aviso);
  }

  const lista = document.createElement("div");
  lista.className = "lista-versiculos";
  tema.referencias.forEach((ref) => {
    const cartao = criarCartaoVersiculo(biblia, ref);
    if (cartao) lista.appendChild(cartao);
  });
  bloco.appendChild(lista);

  return bloco;
}

async function buscar(textoOriginal) {
  const texto = textoOriginal.trim();
  if (!texto) return;

  resultados.innerHTML = "";
  resultados.setAttribute("aria-busy", "true");
  estadoVazio.hidden = true;

  const biblia = await carregarBiblia();
  const textoNormalizado = normalizar(texto);

  const blocos = [];

  if (encontrarCrise(textoNormalizado)) {
    blocos.push(
      criarBlocoTema(
        biblia,
        { rotulo: "", introducao: "", referencias: ALERTA_CRISE.referencias },
        "crise"
      )
    );
  }

  const pontuados = pontuarTemas(textoNormalizado);
  if (pontuados.length > 0) {
    const melhorPontuacao = pontuados[0].pontos;
    const escolhidos = pontuados.filter((p) => p.pontos >= melhorPontuacao).slice(0, 2);
    escolhidos.forEach(({ tema }) => blocos.push(criarBlocoTema(biblia, tema)));
  } else {
    // Nenhum tema bateu: tenta achar versículos relevantes buscando
    // as palavras digitadas no texto completo da Bíblia antes de
    // cair no conjunto genérico de conforto.
    const referenciasEncontradas = await buscarPorTextoLivre(textoNormalizado);
    if (referenciasEncontradas.length > 0) {
      blocos.push(
        criarBlocoTema(biblia, {
          rotulo: "Encontrado no texto",
          introducao: "Não achei um tema exato, mas essas passagens usam palavras parecidas com o que você escreveu.",
          referencias: referenciasEncontradas,
        })
      );
    } else {
      blocos.push(criarBlocoTema(biblia, TEMA_GERAL));
    }
  }

  resultados.setAttribute("aria-busy", "false");
  blocos.forEach((bloco, i) => {
    bloco.style.animationDelay = `${i * 90}ms`;
    resultados.appendChild(bloco);
  });

  resultados.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  buscar(campo.value);
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    campo.value = chip.dataset.texto || chip.textContent;
    buscar(campo.value);
    campo.focus();
  });
});

// Aquece o carregamento do banco em segundo plano assim que a página abre.
carregarBiblia();
