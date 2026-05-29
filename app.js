const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const controllerProduto = require('./controller/controller_produto.js')
const controllerUsuario = require('./controller/controller_usuario.js')
const controllerProdutoExcluido = require('./controller/controller_produto_excluido.js')

const PORT = process.env.PORT || 8080;
const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
})

app.post('/doces', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    // console.log(dadosBody)
    let contentType = request.headers['content-type']
    // console.log(contentType)
    let result = await controllerProduto.inserirProduto(dadosBody, contentType)
    console.log(result)

    response.status(result.status_code)
    response.json(result)
})

app.get('/doces', cors(), async (request, response) => {
    let result = await controllerProduto.listarProdutos()
    // console.log(result)
    response.status(result.status_code);
    response.json(result);
});

app.put('/doces/:id', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    console.log(dadosBody)
    let id = request.params.id
    console.log(id)
    let contentType = request.headers['content-type']
    console.log(contentType)
    let result = await controllerProduto.atualizarProduto(dadosBody, id, contentType)
    console.log(result)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/doces/:id', cors(), async function (request, response) {

    let id = request.params.id

    let result = await controllerProduto.deletarProduto(id)

    response.status(result.status_code)
    response.json(result)
});

app.post('/login', bodyParserJSON, async (request, response) => {
    const dadosLogin = request.body;

    const result = await controllerUsuario.loginUsuario(dadosLogin);

    response.status(result.status_code)
    response.json(result);
});

app.get('/doces/excluido', cors(), async (request, response) => {
    let result = await controllerProdutoExcluido.listarProdutosExcluidos()

    response.status(result.status_code);
    response.json(result);
});

app.listen(PORT, function () {
    console.log('Servidor ligado...');
});