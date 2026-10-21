import { useState } from "react";
import "./App.css";

function App() {
  const [cidade, setCidade] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [clima, setClima] = useState("");
  const [umidade, setUmidade] = useState("");
  const [weatherType, setWeatherType] = useState("default");
  const [cidadeConsultada, setCidadeConsultada] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function ConsultarClima(event) {
    event.preventDefault();

    const busca = cidade.trim();
    if (!busca) {
      setErro("Digite o nome de uma cidade para continuar.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(busca)}&appid=a6568d2a6228aafdb7bcf2c1226ffa99&units=metric&lang=pt_br`
      );
      const dados = await resposta.json();

      if (!resposta.ok || dados.cod !== 200) {
        setErro("Não encontramos essa cidade. Confira o nome e tente novamente.");
        return;
      }

      const temperaturaAtual = `${Math.round(dados.main.temp)}°`;
      const descricao = dados.weather[0].description;
      const umidadeAtual = `${dados.main.humidity}%`;
      const codigoClima = Number(dados.weather[0].id);
      let tipoClima = "default";

      if (codigoClima >= 200 && codigoClima < 300) tipoClima = "storm";
      else if (codigoClima >= 300 && codigoClima < 600) tipoClima = "rain";
      else if (codigoClima >= 600 && codigoClima < 700) tipoClima = "snow";
      else if (codigoClima >= 700 && codigoClima < 800) tipoClima = "mist";
      else if (codigoClima === 800) tipoClima = "clear";
      else if (codigoClima > 800 && codigoClima < 900) tipoClima = "clouds";

      setTemperatura(temperaturaAtual);
      setClima(descricao);
      setUmidade(umidadeAtual);
      setCidadeConsultada(dados.name);
      setWeatherType(tipoClima);

      await fetch("http://localhost:3000/historico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cidade: dados.name,
          temperatura: `${dados.main.temp}°C`,
          clima: descricao,
          umidade: umidadeAtual
        })
      });
    } catch (error) {
      console.error(error);
      setErro("Não foi possível consultar o clima agora. Tente novamente em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className={`app-shell weather-${weatherType}`} data-weather={weatherType}>
      <div className="atmosphere" aria-hidden="true">
        <span className="celestial" />
        <span className="horizon" />
      </div>

      <header className="topbar">
        <a className="wordmark" href="/" aria-label="Atmos — início">
          <span className="wordmark-icon" aria-hidden="true">A</span>
          <span>ATMOS</span>
        </a>
        <span className="topbar-note">CLIMA, EM TEMPO REAL</span>
      </header>

      <section className="weather-layout">
        <div className="intro">
          <p className="eyebrow">SEU TEMPO, EM OUTRO RITMO</p>
          <h1>O céu de cada lugar.</h1>
          <p className="intro-copy">
            Uma nova perspectiva sobre o clima, onde quer que você esteja.
          </p>

          <form className="search-form" onSubmit={ConsultarClima}>
            <label className="search-label" htmlFor="cidade">Descubra uma cidade</label>
            <div className="search-control">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16 16 4.2 4.2" />
                </svg>
              </span>
              <input
                id="cidade"
                type="text"
                placeholder="Ex.: Lisboa, Portugal"
                value={cidade}
                onChange={(event) => setCidade(event.target.value)}
                autoComplete="off"
              />
              <button type="submit" disabled={carregando}>
                {carregando ? "Buscando" : "Explorar"}
                {!carregando && <span aria-hidden="true">↗</span>}
              </button>
            </div>
            {erro && <p className="error-message" role="alert">{erro}</p>}
          </form>
        </div>

        {cidadeConsultada ? (
          <article className="weather-card" aria-live="polite">
            <div className="card-topline">
              <span className="live-indicator"><span /> AGORA</span>
              <span className="card-location">{cidadeConsultada}</span>
            </div>
            <div className="current-weather">
              <div>
                <p className="weather-caption">CONDIÇÃO ATUAL</p>
                <p className="condition">{clima}</p>
              </div>
              <p className="temperature">{temperatura}<span>°C</span></p>
            </div>
            <div className="card-divider" />
            <div className="weather-detail">
              <span className="detail-mark" aria-hidden="true">◌</span>
              <span>Umidade</span>
              <strong>{umidade}</strong>
            </div>
            <p className="card-footnote">Uma pequena pausa para sentir o momento.</p>
          </article>
        ) : (
          <div className="empty-note">
            <span className="empty-line" />
            <p>Comece por uma cidade.<br />O cenário acompanha o céu.</p>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>FEITO PARA OLHAR COM CALMA</span>
        <span>ATMOS <span className="footer-dot">·</span> CLIMA AO SEU REDOR</span>
      </footer>
    </main>
  );
}

export default App;
