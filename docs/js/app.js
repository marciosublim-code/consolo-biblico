import { TEMAS, TEMA_GERAL, ALERTA_CRISE } from "./temas.js";

const form = document.getElementById("form-busca");
const campo = document.getElementById("campo-sentimento");
const resultados = document.getElementById("resultados");
const chips = document.querySelectorAll(".chip");
const estadoVazio = document.getElementById("estado-vazio");

let BIBLIA = null;

async function carregarBiblia() {
  if (BIBLIA) return BIBLIA;
  const resp = await fetch("data/biblia.json");
  BIBLIA = await resp.json();
  return BIBLIA;
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
    blocos.push(criarBlocoTema(biblia, TEMA_GERAL));
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
