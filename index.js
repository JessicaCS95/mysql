
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

    //Estou fazendo a conexão via Pool
    //conexao.connect(function (error) {
        //if (error) throw error;
        /*var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES(' "+nomecompleto+" ',' "+email+" ',' "+senha+" ')";

        conexao.query(sql, function(error, result){
            if(error) throw error;
            res.send("Estudante cadastrado com sucesso! " + result.insertId);
        });*/
        //previnindo SQL Injection
        var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES(?,?,?)";

        conexao.query(sql, [nomecompleto, email, senha], function(error,result){
            if(error) throw error;
            //res.send("Estudante " + nomecompleto + " cadastrado com sucesso! " + result.insertId);
            res.redirect('/estudantes');
        });
        
    });
//});


//continuar criar READ do banco de dados
app.get('/estudantes', function(req, res){

    //Executando via Pool
//conexao.connect(function(error){
//if(error) console.log(error);

var sql = "select * from estudante";
//comando de consulta
conexao.query(sql, function(error,result){
    if(error) console.log(error);
    //console.log(result); Mostra no terminal o select

    res.render("estudantes",{estudante:result});
});
});

//});

//deletando dado do banco
app.get('/delete-estudante', function(req, res){

    //Executando via Pool
//conexao.connect(function(error){
    //if(error) console.log(error);

    var sql = "delete from estudante where id=?";

    var id = req.query.id;

    conexao.query(sql,[id], function(error,result){
        if(error) console.log(error);
        res.redirect('/estudantes');
    });
})
//});


//Update - alterando dados no banco de dados
app.get('/update-estudante', function(req,res){
var sql = "select * from estudante where id=?";
var id = req.query.id;

conexao.query(sql, [id], function(error,result){
    if(error) console.log(error);
    // Verifica se a consulta retornou resultado
    if (result && result.length > 0){
        res.render("alterarestudantes",{estudante:result[0]});
} else {
    res.status(404).send('Estudante não encontrado');
}
    
});

 });

//Update - Método Post para enviar o dado alterado para o BD
app.post('/update-estudante', function(req, res){
let nomecompleto = req.body.nomecompleto;
let email = req.body.email;
let senha = req.body.senha;
let id = req.body.id;

let sql = "UPDATE estudante set nomecompleto=?, email=?, senha=? where id=?";



conexao.query(sql, [nomecompleto, email, senha, id], function(error, result){
if(error) console.log(error);
res.redirect('/estudantes');    
});
});

app.listen(3000);