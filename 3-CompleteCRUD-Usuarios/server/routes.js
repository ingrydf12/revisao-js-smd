import express from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { lerUsuarios } from "../ler_usuarios.js";
const apiRoutes = express.Router();

let usuarios = lerUsuarios();
const ARQUIVO = "../usuarios.json";

function salvarUsuarios(usuarios) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2), "utf8");
}

apiRoutes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

apiRoutes.post("/cadastrar-usuario", (req, res) => {
  console.log(usuarios.length);

  const novoUsuario = {
    id: uuidv4(),
    nome: req.body.nome,
    idade: req.body.idade,
    endereco: req.body.endereco,
    email: req.body.email,
  };
  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.status(201).json({
    ok: true,
    message: "Usuário cadastrado com sucesso!",
    usuario: novoUsuario,
  });
});

apiRoutes.get("/list-users/:count?", (req, res) => {
  let num = parseInt(req.params.count);
  console.log(num);

  res.json(lerUsuarios(num));
});

apiRoutes.put("/update-user/:id", (req, res) => {
  const id = req.params.id;
  const novaInfo = req.body;

  const userIndex = usuarios.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  usuarios[userIndex] = { ...usuarios[userIndex], ...novaInfo };

  res.status(200).json();
});

apiRoutes.delete("/delete-user/:id", (req, res) => {
  //Aqui tÔ passando o parâmetro de id
  const id = req.params.id;

  const userIndex = usuarios.findIndex((user) => String(user.id) === id);
  //Só uma verificação
  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  //Com o splice eu removo o index encontrado em cima, que é o inicio (de onde quero remover, ou seja, o userIndex) e quantidade de elementos que quero remover
  const deletedUser = usuarios.splice(userIndex, 1);
  res
    .status(200)
    .json({ message: "Usuário deletado com sucesso", user: deletedUser[0] });
});

export default apiRoutes;