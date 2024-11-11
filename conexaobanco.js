//Chamando a biblioteca mysql

var mysql = require("mysql");

//Criação de um poll de conexões

var pool = mysql.createPool({
    connectionLimit: 10, //Número máximo de conxões no pool
    host: "localhost",
    user: "root",
    password:"",
    database: "escola"
});

//Verificando a Conexão com o Banco
pool.getConnection(function(err,connection){
    if(err){
        console.error("Erro de conexão:" + err.stack);
        return;
    }
console.log("Conectado como ID " + connection.threadId);
//Após a conexão ser estabelecida, sempre liberar a conexão de volta ao pool
connection.release();
});

//exportando modulo
module.exports = pool;