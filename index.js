
var conexao = require("./conexaobanco");

//chamando o módulo express
var express = require('express');

// definindo variável para express
var app = express();

//chamando o módulo body-parser para deixar o código mais organizado
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


//GET
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/cadastro.html');
});

//POST

app.post('/', function (req, res) {
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;

    conexao.connect(function (error) {
        if (error) throw error;
        /*var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES(' "+nomecompleto+" ',' "+email+" ',' "+senha+" ')";

        conexao.query(sql, function(error, result){
            if(error) throw error;
            res.send("Estudante cadastrado com sucesso! " + result.insertId);
        });*/
        //previnindo SQL Injection
        var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES(?,?,?)";

        conexao.query(sql, [nomecompleto, email, senha], function(error,result){
            if(error) throw error;
            res.send("Estudante " + nomecompleto + " cadastrado com sucesso! " + result.insertId);
        });
        
    });
});


app.listen(7000);

// //importando módulo
// var conexao = require("./conexaobanco");


// conexao.connect(function(error){
//     if(error) throw error;
//     // console.log("O banco de dados foi conectado!");

//     conexao.query("select * from estudante", function(error,result){
//         if(error) throw error;
//         console.log(result);
//         console.log(result[0].nomecompleto);
//     });

//});




