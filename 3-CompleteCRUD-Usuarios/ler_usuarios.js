let usuarios;
const fs = require("fs");
const path = require("path");

function lerUsuarios() {
  try {
    const dados = fs.readFileSync("usuarios.json", "utf-8"); // Lê o conteúdo do arquivo
    const usuarios = JSON.parse(dados); // Converte a string JSON em array de objetos

    return usuarios;
  } catch (erro) {
    // Em caso de erro (arquivo ausente ou malformado), exibe no console e retorna array vazio
    console.error("Erro ao ler o arquivo usuarios.json:", erro);
    return [];
  }
}

usuarios = lerUsuarios();

console.log(usuarios.length);
