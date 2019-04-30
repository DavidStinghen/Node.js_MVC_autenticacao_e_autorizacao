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

// importando as @routes
const routes = require('../app/routes/routes');
// definindo que as @routes recebem por parametro o @app
routes(app);    

// exportando o @app como um modulo
module.exports = app;
