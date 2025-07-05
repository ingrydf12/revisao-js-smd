//MARK: - Questão 1
let numbers = [
  12, 3, 19, 7, 5, 1, 14, 17, 8, 15, 2, 18, 11, 20, 6, 9, 16, 10, 4, 13,
];

let returnOriginal = document.getElementById("text");
let returnOrdered = document.getElementById("text-result-ordered");

function bubbleSortDecreasing() {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1 - i; j++) {
      if (numbers[j] < numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
      }
    }
  }
  returnOrdered.textContent = numbers.join(", ");
}

returnOriginal.textContent = "Array original: " + numbers.join(", ");
returnOrdered.innerHTML =
  "Array ordenado: " + (bubbleSortDecreasing() || numbers).join(", ");

//MARK: - Questão 2
let numbersArray = [
  12, 3, 19, 7, 5, 12, 14, 17, 8, 15, 2, 18, 12, 20, 6, 12, 16, 10, 4, 12,
];
let valueToFind = document.getElementById("text-busca");

function buscaLinearTodasOcorrencias(arr, valor) {
  let indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === valor) {
      indices.push(i);
    }
  }
  return indices.length > 0
    ? indices.join(", ")
    : "Nenhuma ocorrência encontrada";
}

valueToFind.innerHTML =
  "<b> Array: </b> " +
  numbersArray.join(", ") +
  ". <b>Valor procurado: </b> 12. Índices encontrados: " +
  buscaLinearTodasOcorrencias(numbersArray, 12);

//MARK: - Questão 3
let pessoas = [
  { nome: "Carlos", idade: 30 },
  { nome: "Ana", idade: 25 },
  { nome: "Bruno", idade: 28 },
  { nome: "Ana", idade: 22 },
  { nome: "João", idade: 18 },
];
let textOrdenacaoObj = document.getElementById("text-ordenacao-obj");
let textOrdenacaoOrigin = document.getElementById("text-ordenacao-origin");

pessoas.forEach((p) => {
  textOrdenacaoOrigin.innerHTML += `Nome: ${p.nome}, Idade: ${p.idade}<br>`;
});

function ordenarPessoasPorNomeEIdade(arr) {
  arr.sort((a, b) => {
    if (a.nome.localeCompare(b.nome) === 0) {
      return a.idade - b.idade;
    }
    return a.nome.localeCompare(b.nome);
  });
}

ordenarPessoasPorNomeEIdade(pessoas);
textOrdenacaoObj.innerHTML =
  "<b>Array ordenado:</b> " +
  pessoas.map((p) => `${p.nome} (${p.idade} anos)`).join(", ");
  