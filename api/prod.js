const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

//Configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Definindo as rotas para a tbl_produto
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Positivo!' }));
app.use('/', router);

//Iniciando o servidor
app.listen(port);
console.log('Servidor produtos funcionando na porta 3000!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'usuarioZ',
        database: 'db_olympicus'
    });

    connection.query(sqlQry, function(error, results, fields) {
        if (error) {
            res.json(error);
        } else {
            res.json(results);
            connection.end();
            console.log('Executou!');
        }
    });
}

//##########################################################[CRUD tbl_produtos]###############################################
// Leitura
router.get('/tbl_produto', (req, res) => {
    execSQLQuery('SELECT * FROM tbl_produto', res);
});


router.get('/tbl_produto/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE id_produto=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM tbl_produto' + filter, res);
});


// DELETA
router.delete('/tbl_produto/:id', (req, res) => {
    execSQLQuery('DELETE FROM tbl_produto WHERE id_produto=' + parseInt(req.params.id), res);
});


// INSERE
router.post('/tbl_produto', (req, res) => {
    const id_produto = req.body.id_produto.substring(0, 150);
    const nome_produto = req.body.nome_produto.substring(0, 150);
    const tipo_produto = req.body.tipo_produto.substring(0, 150);
    const img_produto = req.body.img_produto.substring(0, 11);
    const gif_produto = req.body.gif_produto.substring(0, 11);
    const preco_produto = req.body.preco_produto.substring(0, 11);
    const id_categoria = req.body.id_categoria.substring(0, 150);
    execSQLQuery(`INSERT INTO tbl_produto(id_produto,nome_produto,tipo_produto,img_produto,gif_produto,
        preco_produto, id_categoria) 
        VALUES('${id_produto}','${nome_produto}','${tipo_produto}','${img_produto}','${gif_produto}','${preco_produto}','${id_categoria}')`, res);
});

// ALTERA
router.patch('/tbl_produto/:id', (req, res) => {
    const id_produto = parseInt(req.params.id);
    // const id_produto = req.body.id_produto.substring(0, 150);
    const nome_produto = req.body.nome_produto.substring(0, 150);
    const tipo_produto = req.body.tipo_produto.substring(0, 150);
    const img_produto = req.body.img_produto.substring(0, 11);
    const gif_produto = req.body.gif_produto.substring(0, 11);
    const preco_produto = req.body.preco_produto.substring(0, 11);
    const id_categoria = req.body.id_categoria.substring(0, 150);
    execSQLQuery(`UPDATE tbl_produto SET nome_produto='${nome_produto}', tipo_produto='${tipo_produto}', 
    img_produto='${img_produto}', gif_produto='${gif_produto}', preco_produto='${preco_produto}', id_categoria='${id_categoria}' WHERE id_produto=${id_produto}`, res)
});

//##############################################################~~###############################################