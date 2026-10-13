// Importa o CSS para a pagina App.jsx
import "./App.css"

//Importa hook useSatate da biblioteca react
//Ele permite armazenar valores e atualizar a tela automaticamente
import { useState } from "react";

//Cria o componete pricipal da apliacação
function App() {

  //Estado responsavel por armazenar a cidade digitada
  const [cidade, setCidade] = useState("");

  //Estado para armazenar a temperatura da cidade
  const [temperatura, setTemperatura] = useState("");

  //Estado para armazenar o clima da cidade
  const [clima, setClima] = useState("");

  //Estado par armazenar a umidade da cidade 
  const [umidade, setUmidade] = useState("");

  //Função executada quando o usuario clicar no botão consultar
  async function ConsultarClima() {

    // Verifica se o campo esta vazio
    if (cidade === "") {
      alert("Digite uma cidade !");
      return;
    }

    try {

      // Faz a requisição para a Api
      // CORRIGIDO: usar crase (`) em vez de aspas simples ('),
      // para que ${cidade} seja interpretado como variável (template string)
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=a6568d2a6228aafdb7bcf2c1226ffa99&units=metric&lang=pt_br`
      );

      // Converte a resposta para JSON
      const dados = await resposta.json();

      // Verifica se a cidade foi encontrada
      if (dados.cod !== 200) {
        alert("Cidade não encontrado");
        return;
      }

      // Atualiza a temperatura
      setTemperatura(dados.main.temp + "°C");

      //Atualiza a condição climatica
      setClima(dados.weather[0].description);

      //Atualiza a umidade
      setUmidade(dados.main.humidity + "%");

      // ===============================
      // CONTEÚDO DA AULA DE HOJE
      // Enviando dados do React para uma API própria
      // utilizando o método POST.
      // ===============================

      // Faz uma requisição para a API de histórico criada pelos alunos
      await fetch("http://localhost:3000/historico", {

        // Define o método HTTP utilizado
        method: "POST",

        // Informa que os dados enviados estarão no formato JSON
        headers: {
          "Content-Type": "application/json"
        },

        // Converte o objeto JavaScript para JSON
        body: JSON.stringify({

          // Envia o nome da cidade consultada
          cidade: cidade,

          // Envia a temperatura retornada pela API OpenWeatherMap
          temperatura: dados.main.temp + "°C",

          // Envia a descrição do clima
          clima: dados.weather[0].description,

          // Envia a umidade do ar
          umidade: dados.main.humidity + "%"

        })

      });

      // Fim do conteúdo da aula
      // Neste momento os dados foram enviados para a API
      // e armazenados no histórico de consultas.

      /* Conteudo da aula de hoje
      // Enviando dados do React para uma API propia utilizando o metodo Post

      // Faz a requisisão para a API ter historico criada por você
      await fetch("http://localhost:3000/historico"), {


        // Define o metodo HTTP utilizado
        method: "POST",

        //informa que os dados enviados estarao em formato JSON
        headers: {
          "Content-Type": "application/json"
        },

        // Converte o objeto JavaScript para JSON
        body: JSON.stringify({

          // Envia o nome da cidade consultada
          cidade: cidade,

          // Envia a temperatura retornada pela API OpenWeatherMap
          temperatura: dados.main.temp + "°C",

          // Envia a descrição do clima
          clima: dados.weather[0].description,

          // Envia  a umidade do ar
          umidade: dados.main.humidity + "%",

        })

      });

       Fim da primeira aula*/

    } catch (erro) {

      console.log(erro);

      alert("Erro ao consultar a API.")

    }

  }

  /*Função executada quando o usuario clicar no botão consultar
  function consultarClima() {

    // Verifica se a cidade é são paulo
    if (
      cidade.toLowerCase() === "São Paulo" ||
      cidade.toLowerCase() === "sao Paulo"
    ) {
      //Essa linha de codigo atualiza a temperatura
      setTemperatura("24°C");

      //Atualiza a condição climatica
      setClima("Ensolarado");

      //Atualiza a umidade
      setUmidade("60%");
    }

    else if (cidade.toLowerCase() === "coritiba") {

      setTemperatura("17°G");

      setClima("Chuvoso");

      setUmidade("85%");

    }

    else if (cidade.toLowerCase() === "rio de janeiro") {

      setTemperatura("32°G");

      setClima("Ensolarado");

      setUmidade("40%");

    }

    else if (cidade.toLowerCase() === "rio grande do sul") {

      setTemperatura("10°G");

      setClima("Parcialmente Nublado");

      setUmidade("90%");

    }

    else if (cidade.toLowerCase() === "foz do iguaçu") {

      setTemperatura("27°G");

      setClima("Ensolarado");

      setUmidade("70%");

    }

    else if (cidade.toLowerCase() === "bahia") {

      setTemperatura("33°G");

      setClima("Ensolarado");

      setUmidade("30%");

    }

    //Executa caso a cidade não esteja cadastrada
    else {

      setTemperatura("--");

      setClima("Cidade não cadastrada");

      setUmidade("--");
    }
  }*/

  //Retorna a interface visual do sistema
  return (
    // conteiner principal da aplicação
    <div
      style={{
        padding: "20px", // CORRIGIDO: "pedding" -> "padding"
        fontFamily: "Arial"
      }}
    >
      {/* Titulo Principal */}
      <h1>☀️Sistema de Previsão do Tempo</h1>

      {/*Campo para digitação */}
      <input

        //Tipo de campo
        type="text"

        //Texto exibido dentro da caixa
        placeholder="Digite uma cidade"

        //Valor vinculado ao estado cidade
        value={cidade}

        //Atualiza o estado quando o usuario digita
        onChange={(e) => setCidade(e.target.value)}
      />
      {/*Botão de consulta */}
      <button

        //Execulta a função ConsultarClima
        //CORRIGIDO: "consultarClima" (c minúsculo) -> "ConsultarClima" (C maiúsculo),
        //igual ao nome da função declarada acima
        onClick={ConsultarClima}

        // Define a margem a esquerda
        style={{
          marginLeft: "10px"
        }}
      >
        {/*Texto exibido no botão */}
        Consultar
      </button>

      {/*Linha horizontal para separar seçoes */}
      <hr />

      {/*Exibe a cidade */}
      <h2>🏙️Cidade: {cidade}</h2>

      {/*Exibe a temperatura */}
      <h2>🌡️Temperatura: {temperatura}</h2>

      {/*Exibe o clima */}
      <h2>⛅Clima: {clima}</h2>

      {/*Exibe a umidade */}
      <h2>🌬️Umidade: {umidade}</h2>

    </div>

  );
}

//Exporta o componente App para ser utilizado no React
export default App;