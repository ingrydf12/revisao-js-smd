let pessoas = [
  { nome: "Carlos", idade: 30 },
  { nome: "Ana", idade: 25 },
  { nome: "Bruno", idade: 28 },
  { nome: "Ricardo", idade: 22 },
  { nome: "João", idade: 18 },
  { nome: "Ana", idade: 27 },
  { nome: "Joãozinho", idade: 15 },
];
let limit = 5;
let bodyTable = document.getElementById("tablebody");

function criarTabela(dados) {
  const bodyTable = document.getElementById("tablebody");

  dados.forEach((item) => {
    const linha = document.createElement("tr");
    Object.values(item).forEach((valor) => {
      const td = document.createElement("td");
      td.textContent = valor;
      linha.appendChild(td);
    });
    bodyTable.appendChild(linha);
  });
}

criarTabela(pessoas);

function ordenarPorNome() {
  Array.from(bodyTable.rows)
    .sort((a, b) =>
      a.cells[0].textContent.localeCompare(b.cells[0].textContent)
    )
    .forEach((tr) => bodyTable.appendChild(tr));
}

function ordenarPorIdade() {
  Array.from(bodyTable.rows)
    .sort((a, b) =>
      a.cells[1].textContent.localeCompare(b.cells[1].textContent)
    )
    .forEach((tr) => bodyTable.appendChild(tr));
}

function buscarTabela() {
  let filtro = document.getElementById("busca").value.toUpperCase(); //Pega o valor maiúsculo aqui também pra funcionar a busca independente do input
  let tabela = document.getElementById("tablebody");

  //Aqui to transformando as linhas da tabela em array e iterando elas
  Array.from(tabela.rows).forEach((row) => {
    row.style.display = row.cells[0].textContent
      .toUpperCase() // Isso aqui é pra deixar insensível, já que funciona a busca pra todas as palavras como maiúsculas
      .includes(filtro)
      ? ""
      : "none";
  });
}
