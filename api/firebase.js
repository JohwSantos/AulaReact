// ================================================
// Aula 20/10/2026
// Conectando nossa API ao Firebase
// Realtime Database
// =================================================

// Importa a função responsavel por iniciar o firebase
import { initializeApp } from "firebase/app";

// Importa a função responsavel por conectar o Realtime Database
import { getDatabase } from "firebase/database";

// =================================================
// Configuração do projeto Firebase.
//
// Essas configuraçõe são geradas automaticamente 
// pelo firebase quando registramos a nossa aplicação
//
// Elas funcionam como um endereço que permite
// que nossa aplicação encontre e se conecte ao banco de dados na nuvem
// =================================================

const firebaseConfig = {

    // Indentificador unico do aplicativo
    apiKey: "AIzaSyD-T7MVvbboDJonhMS93yK4zLZa68AX5kM",

    // Dominio de autenticação do projeto
    authDomain: "sistema-previsao-do-tempo.firebaseapp.com",

    // Endereço do Realtime Database
        databaseURL: "https://sistema-previsao-do-tempo-default-rtdb.firebaseio.com",

    // Indentificador do projeto firebase
    projectId: "sistema-previsao-do-tempo",

    // Serviço de armazenamento de arquivos
    storageBucket: "sistema-previsao-do-tempo.firebasestorage.app",

    // Identificador responsavel pela troca de mensagens
    messagingSenderId: "1053196730986",

    // Identificador unico da aplicação web
    appId: "1:1053196730986:web:0915b51874a5d1d6d10013",

    // Identificador utilizado pelo Google Analytics
    measurementId: "G-RTT86T0613"

}

// Inicialização do Firebase utilizando as configurações acima
const app = initializeApp(firebaseConfig);

// Cria uma conexão com o Realtime Database
//
// A partir deste objeto sera possivel:
// .Ler dados
// .Salvar dados
// .Atualizar dados
// .Excluir dados
const db = getDatabase(app);

// Exporta a conexão para que ela possa ser utilizada em outros arquivos,
// como o server.js
export default db;