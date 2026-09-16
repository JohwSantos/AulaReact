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
  }

  //Retorna a interface visual do sistema
  return (
    // conteiner principal da aplicação
    <div
      style={{
        pedding: "20px",
        fontFamily: "Arial"
      }}
    >
      {/* Titulo Principal */}
      <h1>Sistema de Preisão do Tempo</h1>

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

        //Execulta a função consultarclima
        onClick={consultarClima}

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
      <h2>Cidade: {cidade}</h2>

      {/*Exibe a temperatura */}
      <h2>Temperatura: {temperatura}</h2>

      {/*Exibe o clima */}
      <h2>Clima: {clima}</h2>

      {/*Exibe a umidade */}
      <h2>Umidade: {umidade}</h2>

    </div>

  );
}

//Exporta o componente App para ser utilizado no React
export default App;