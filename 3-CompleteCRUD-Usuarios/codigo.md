# Código HTML (Frontend)

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Tabela de Usuários com Paginação</title>
  <style>
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; border: 1px solid #ccc; }
    th { background: #f0f0f0; cursor: pointer; }
    .paginacao {
      margin-top: 10px;
      text-align: center;
    }
    .paginacao button {
      margin: 0 5px;
      padding: 5px 10px;
    }
  </style>
</head>
<body>
  <h1>👥 Lista de Usuários com Paginação</h1>
  <table id="tabelaUsuarios">
    <thead>
      <tr>
        <th onclick="ordenarTabela('nome')">Nome ⬍</th>
        <th onclick="ordenarTabela('idade')">Idade ⬍</th>
        <th>Endereço</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div class="paginacao">
    <button onclick="paginaAnterior()">⬅ Anterior</button>
    Página <span id="paginaAtual">1</span> de <span id="totalPaginas">1</span>
    <button onclick="proximaPagina()">Próxima ➡</button>
  </div>

  <script>
    let usuarios = [];
    let paginaAtual = 1;
    const usuariosPorPagina = 20;
    let ordemAtual = { campo: 'nome', crescente: true };

    async function carregarUsuarios() {
      const resposta = await fetch('http://localhost:3000/list-users/200');
      usuarios = await resposta.json();
      atualizarPaginacao();
    }

    function comparaStrings(a, b, fullCompare = true) {
      const sa = a.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
      const sb = b.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
      const len = fullCompare ? Math.max(sa.length, sb.length) : 3;
      for (let i = 0; i < len; i++) {
        const c1 = sa.charCodeAt(i) || 0;
        const c2 = sb.charCodeAt(i) || 0;
        if (c1 < c2) return -1;
        if (c1 > c2) return 1;
      }
      return 0;
    }

    function bubbleSort(arr, key, crescente = true) {
      const tipo = typeof arr[0][key];
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
          let a = arr[j][key];
          let b = arr[j + 1][key];
          let comp = tipo === "string" ? comparaStrings(a, b) : a - b;
          if ((crescente && comp > 0) || (!crescente && comp < 0)) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
    }

    function ordenarTabela(campo) {
      ordemAtual = (ordemAtual.campo === campo) ?
        { campo, crescente: !ordemAtual.crescente } :
        { campo, crescente: true };
      bubbleSort(usuarios, ordemAtual.campo, ordemAtual.crescente);
      atualizarPaginacao();
    }

    function atualizarPaginacao() {
      const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
      paginaAtual = Math.max(1, Math.min(paginaAtual, totalPaginas));
      document.getElementById('paginaAtual').innerText = paginaAtual;
      document.getElementById('totalPaginas').innerText = totalPaginas;
      const inicio = (paginaAtual - 1) * usuariosPorPagina;
      const fim = inicio + usuariosPorPagina;
      renderizarTabela(usuarios.slice(inicio, fim));
    }

    function paginaAnterior() { paginaAtual--; atualizarPaginacao(); }
    function proximaPagina() { paginaAtual++; atualizarPaginacao(); }

    function renderizarTabela(data) {
      const tbody = document.querySelector("#tabelaUsuarios tbody");
      tbody.innerHTML = "";
      data.forEach(u => {
        tbody.innerHTML += `<tr><td>${u.nome}</td><td>${u.idade}</td><td>${u.endereco}</td><td>${u.email}</td></tr>`;
      });
    }

    window.onload = carregarUsuarios;
  </script>
</body>
</html>
```

# Código Node.js (Backend)

```js
const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

const app = express();
const PORT = 3000;

app.use(cors());

function gerarUsuarios(qtd) {
  const usuarios = [];
  for (let i = 0; i < qtd; i++) {
    usuarios.push({
      nome: faker.person.fullName(),
      idade: faker.number.int({ min: 18, max: 90 }),
      endereco: faker.location.streetAddress(),
      email: faker.internet.email()
    });
  }
  return usuarios;
}

app.get('/list-users/:count?', (req, res) => {
  let num = parseInt(req.params.count);
  if (isNaN(num)) num = 100;
  if (num < 100) num = 100;
  if (num > 1_000_000) num = 1_000_000;
  res.json(gerarUsuarios(num));
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
```