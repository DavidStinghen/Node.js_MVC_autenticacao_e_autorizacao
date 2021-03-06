require('marko/node-require').install();
require('marko/express');

// importando o @express e criando uma constante para ele
const express = require('express');
// declarado que o @app vai fazer uso do @express
const app = express();
// importando o body-parser para criar middlewares que dão a possibilidade de envio de dados
// criando a constante @bodyParser para fazer uso do @body-parser que irá controlar os middlewares
const bodyParser = require('body-parser');
// declaranto uma constante e a importação do method-override
const methodOverride = require('method-override');

// criado middleware para pegar arquivo estatico
// delegando ao app o uso do metodo @use do @express
// primeiro parametro, caminho para a rota
app.use('/estatico',
// segundo parametro, uso do metodo @static do @express que serve para pegar aquivos estaticos
        express.static('src/app/public')
    );
// criado middleware para envio de arquivos JSON
// delegando ao @app o uso do @bodyParser com a função @use do @express
// declarando que o @bodyParser deve utilizar a função @urlencoded para designar o tipo de arquivo a ser enviado
app.use(bodyParser.urlencoded({
// declarando que o @bodyParser vai receber um arquivo Json complexo
    extended: true
}));

// middleware para verificar o tipo de metodo http, para saber se é update ou insert
app.use(methodOverride(function (req, res) {
// verifica se ha um object no corpo do formulario com o @_method
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
// salva o valor do _method em uma variavel
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

// chamada a camada de controle de autenticação da api
const sessaoAutenticacao = require('./sessao-autenticacao');
// passando o objeto app para a sessão de autenticação
sessaoAutenticacao(app);

// importando as @routes
const routes = require('../app/routes/routes');
// definindo que as @routes recebem por parametro o @app
routes(app);

// middleware para quando haja um erro 404 seja redirecionado para a página de erro
app.use(function(req, resp, next) {
// resposta com o status e import da pagina resultado
    return resp.status(404).marko(
        require('../app/views/base/erros/404.marko')
    );
});

// middleware para quando haja um erro 500 seja redirecionado para a página de erro
app.use(function(error, req, resp, next) {
// resposta com o status e import da pagina resultado
    return resp.status(500).marko(
        require('../app/views/base/erros/500.marko')
    );
});

// exportando o @app como um modulo
module.exports = app;
