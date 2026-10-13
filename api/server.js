/* Importa a biblioteca Express resposavel por criar o servidor e as rotas da API*/
import express from "express";

/* Importa a biblioteca CORS que permite a comunicação entre aplicações executadas
em portas diferentes (REACT e API)*/
import cors from "cors";

/* Cria uma instancia da aplicação */
const app = express();

/* Habilita o Cors para permitir requisiçoes vindas do REACT */
app.use(cors());

/* Permite que a API receba e interprete dados no formato JSON */
app.use(express.json());

/* Vetor responsavel por armazenar temporariamente todas as consultas
realizadas pelo usuario */
let historico = [];

/** METODO GET
 * Utilizado para consultar informaçoes ja armazenadas na API
 * Rota responsavel por retornar todo o historico
 */
app.get("/historico", (req, res) => {

    //Envia a lista completa de consultas em formato JSON
    res.json(historico);

});

/** METODO POST
 * utilizado para enviar infromaçoes para a API
*/
app.post("/historico", (req, res) => {

    // Adiciona os dados recebidos para o REACT ao vetor de historico    
    historico.push(req.body);

    res.json({
        mensagem: "Consulta Salva"
    });

});

/** Inicia a API na porta 3000 */
app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});