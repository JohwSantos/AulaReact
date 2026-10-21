# Atmos — previsão do tempo

Aplicação web para consultar as condições meteorológicas atuais de uma cidade. O resultado mostra temperatura, descrição do clima e umidade, enquanto a atmosfera visual do frontend muda de acordo com a condição retornada pela OpenWeather. As consultas também podem ser registradas em um arquivo JSON local e no Firebase Realtime Database.

## Funcionalidades

- Pesquisa de clima atual pelo nome da cidade.
- Temperatura em Celsius e descrição em português.
- Exibição da umidade relativa do ar.
- Tema de fundo que acompanha a condição meteorológica:
  - céu limpo;
  - nublado;
  - chuva ou garoa;
  - tempestade;
  - neve;
  - neblina e outras condições de baixa visibilidade.
- Mensagens de carregamento e erro na pesquisa.
- Registro das consultas na API local, no arquivo `api/historico.json` e no Firebase Realtime Database.
- Interface responsiva, com suporte a preferência por redução de movimento.

## Tecnologias

- React 19
- Vite 8
- JavaScript (ES modules)
- OpenWeather Current Weather API
- Node.js e Express 5
- Firebase Realtime Database
- Oxlint

## Requisitos

- Node.js compatível com o Vite 8 (Node.js 20.19+ ou 22.12+).
- npm.
- Chave válida da OpenWeather para consultar o clima.
- Projeto Firebase com Realtime Database configurado para persistir consultas.

## Instalação e execução

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Inicie a API de histórico em um terminal:

```bash
node api/server.js
```

A API ficará disponível em `http://localhost:3000`.

Em outro terminal, inicie o frontend:

```bash
npm run dev
```

Abra o endereço local informado pelo Vite no terminal, normalmente `http://localhost:5173`.

O frontend consulta diretamente a OpenWeather e envia cada consulta bem-sucedida para `http://localhost:3000/historico`. Para executar frontend e API em ambientes diferentes, ajuste a URL da API no frontend e configure CORS no servidor para permitir a origem do frontend.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento Vite. |
| `npm run build` | Gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão gerada em `dist/`. |
| `npm run lint` | Executa o Oxlint no projeto. |

## API de histórico

A API Express executa na porta `3000` e disponibiliza:

| Método | Caminho | Comportamento |
| --- | --- | --- |
| `GET` | `/historico` | Retorna os registros carregados em memória. |
| `POST` | `/historico` | Adiciona a consulta ao histórico, grava no arquivo JSON e envia uma cópia ao Firebase. |

O frontend envia um objeto neste formato:

```json
{
  "cidade": "Lisboa",
  "temperatura": "18.5°C",
  "clima": "céu limpo",
  "umidade": "65%"
}
```

Os dados locais são armazenados em `api/historico.json`. O arquivo é carregado quando o servidor inicia; execute o comando da API a partir da raiz do repositório para que o caminho relativo do arquivo seja resolvido corretamente. O arquivo está vazio inicialmente.

## Configuração e segurança

- A chave da OpenWeather é utilizada pelo frontend para chamar a API meteorológica. A implementação atual mantém essa chave no código do cliente; uma chave incorporada ao frontend pode ser visualizada por quem acessa o site. Antes de publicar, restrinja a chave no provedor e considere mover as chamadas meteorológicas para um backend.
- A configuração do Firebase usada pela API está em `api/firebase.js`. Configure o projeto e as regras do Realtime Database para permitir somente os acessos necessários. A configuração de um app Firebase cliente não substitui regras de segurança do banco.
- A URL da API local está definida no frontend como `http://localhost:3000/historico`; `localhost` aponta para a máquina de cada usuário, portanto essa URL precisa ser substituída por um endereço acessível ao publicar o sistema.
- Não coloque credenciais administrativas, chaves privadas ou arquivos de service account no frontend nem no controle de versão.

## Estrutura do projeto

```text
.
├── api/
│   ├── firebase.js       # Inicialização do Firebase Realtime Database
│   ├── historico.json    # Histórico local de consultas
│   └── server.js         # API Express para leitura e gravação do histórico
├── public/               # Arquivos estáticos servidos pelo Vite
├── src/
│   ├── assets/           # Recursos estáticos do frontend
│   ├── App.jsx           # Busca, apresentação do clima e integração com APIs
│   ├── App.css           # Layout, temas meteorológicos e responsividade
│   ├── index.css         # Estilos globais
│   └── main.jsx          # Inicialização da aplicação React
├── index.html            # Documento HTML de entrada
├── package.json          # Dependências e scripts npm
└── vite.config.js        # Configuração do Vite
```
