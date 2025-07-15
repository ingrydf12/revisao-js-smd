import fs from "fs";

export function lerUsuarios(usuarios) {
  try {
    const dados = fs.readFileSync("usuarios.json", "utf-8");
    usuarios = JSON.parse(dados);
  } catch (erro) {
    console.error("Erro ao ler o arquivo usuarios.json:", erro);
    usuarios = [];
  }

  return usuarios;
}

export default lerUsuarios;