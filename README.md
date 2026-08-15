# Consolo Bíblico

Você digita como está se sentindo, o sistema identifica o tema (ansiedade,
medo, luto, gratidão, etc.) e traz versículos reais e relevantes,
buscados no texto completo da Bíblia (66 livros, 31.100 versículos).

**Tradução usada:** Tradução Brasileira (1917) — domínio público,
sociedade responsável: SBB. Texto obtido de
https://github.com/damarals/biblias (projeto que reúne várias traduções
em formatos abertos, com licença MIT no código).

## Como usar

1. Instale as dependências:
   ```
   npm install
   npm rebuild better-sqlite3
   ```

2. Importe a Bíblia para o banco local (só precisa rodar uma vez):
   ```
   npm run importar
   ```

3. Busque conforto pelo que você está sentindo:
   ```
   npm run buscar -- "estou muito ansioso com o futuro"
   ```

## Estrutura

- `dados/TB.json` — texto bruto da Bíblia (Tradução Brasileira)
- `src/db.js` — funções de banco de dados (SQLite)
- `src/temas.js` — dicionário de temas emocionais → versículos relevantes
- `scripts/1-importar-biblia.js` — importa o texto para o SQLite (rodar 1x)
- `scripts/2-buscar-conforto.js` — CLI de busca por sentimento

## Temas cobertos atualmente

Ansiedade, medo, tristeza/luto, solidão, cansaço, desânimo, raiva,
culpa/vergonha, dúvida/fé fraca, gratidão, doença, perdão, dificuldades
financeiras, conflitos/relacionamentos, incerteza sobre o futuro.

Para adicionar novos temas ou mais versículos a um tema existente, edite
`src/temas.js` — cada tema tem uma lista de palavras-chave e uma lista
de referências bíblicas (livro, capítulo, versículo inicial/final).
