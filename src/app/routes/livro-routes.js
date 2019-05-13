const LivroController = require('../controller/livro-controller');
const livroController = new LivroController();

const Livro = require('../model/livro');

const BaseController = require('../controller/base-controller');

// exportando a função @app como um modulo
module.exports = (app) => {

    const livrosRoutes = LivroController.routes();

    // middleware para rotas que precisam de autenticação
    app.use(livrosRoutes.autenticadas, function(req, resp, next) {
        // se foi autenticado então continua com o processo
        if (req.isAuthenticated()) {
            next();
        // caso não esteja logado redireciona para página de login
        } else {
            resp.redirect(BaseController.routes().login)
        }
    });

    // Rota para (/livros)
    app.get(livrosRoutes.lista, livroController.lista());

    //rota de agregação utilizando o metodo do @express (@route) para a rota (/livros/form)
    app.route(livrosRoutes.cadastro)
        // rota para o formulario de adicionar livros
        .get(livroController.formularioCadastro())
        // rota para adicionar novos livros validação dos parametros de cadastro
        .post(Livro.validacoes(), livroController.cadastra())
        // rota para alterar os livros
        .put( livroController.edita());

    // rota para o formulario de alterar o livro
    app.get(livrosRoutes.edicao, livroController.formularioEdicao());

    // rota para deletar o livro
    // usado o verbo delete para apagar
    // criado a variavel id para que qualquer coisa depois de (/livros/) seja salvo na variavel criada, ou seja, passar o id do livro para ser deletado
    app.get(livrosRoutes.delecao, livroController.remove());

};
