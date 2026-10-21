import express from "express";

import cors from "cors";

// importa o modulo FS (File System) este modulo permite ler e escrever arquivos utilizando JavaScript
import fs from "fs";

// Importa a conexão criada com o firebase
import db from "./firebase.js";


import {
    ref,
    push,
    set
} from "firebase/database";

const app = express();

app.use(cors());

// Permite que a API receba e interprete dados no formato JSON
app.use(express.json());

let historico = [];

// verifica se o arquivo historico.json existe, caso exista, os dados serão carregados para dentro do historico
if (fs.existsSync("./api/historico.json")) {

    //lê o conteúdo do arquivo historico.json
    const dadosArquivo = fs.readFileSync(
        "./api/historico.json",
        "utf8"
    );

    try {

        if (dadosArquivo.trim() !== "") {

            // converte o JSON do conteudo para um array JavaScript
            historico = JSON.parse(dadosArquivo);

        } else {

            historico = [];

        }
    } catch {

        historico = [];

    }
}


app.get("/historico", (req, res) => {
    res.json(historico);
});

app.post("/historico", async (req, res) => {
    historico.push(req.body);

    // Cria uma referencia chamada "historico" dentro do Firebase. Caso ela não exista o Firebase ira criar automaticamente
    const referenciaFirebase = ref(
        db,
        "historico"
    );

    // Salva uma copia dos dados tambem no Firebase, Realtime Database
    await push(
        referenciaFirebase,
        req.body
    );

    // Converte o array JavaScript para o formato JSON, O numero 2 deixa o arquivo organizado e legivel
    const historicoJSON = JSON.stringify(
        historico,
        null,
        2
    );

    /* Salva os dados atualizados no arquivo historico.json, Assim os registros permanecem armazenados
    mesmo apos desligar o servidor*/
    fs.writeFileSync(
        "./api/historico.json",
        historicoJSON
    );

    // Retorna uma mensagem informando que o registro foi salvo com sucesso
    res.json({
        mensagem: "Consulta salva"
    });
});

// Inicializador do servidor
app.listen(3000, () => {
    console.log ("Servidor rodando na porta 3000")
});