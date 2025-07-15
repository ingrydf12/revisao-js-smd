import express from "express";
import cors from "cors";
import path from "path";
import apiRoutes from "./routes.js";

const app = express();

// Define o endereço e porta em que o servidor vai escutar
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "public")));

// Inicia o servidor e exibe a URL no console
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
});