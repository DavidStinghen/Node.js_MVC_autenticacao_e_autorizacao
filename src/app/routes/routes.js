const LivroController = require('../controller/livro-controller');
const livroController = new LivroController();

const BaseController = require('../controller/base-controller');
const baseController = new BaseController();

const Livro = require('../model/livro');

// exportando a função @app como um modulo
module.exports = (app) => {

    const baseRoutes = BaseController.routes();
    const livrosRoutes = LivroController.routes();

    // rota para a página inicial
    app.get(baseRoutes.home, baseController.home());

    // Rota para (/livros)
    app.get(livrosRoutes.lista, livroController.lista());

    // rota para o formulario de adicionar livros
    app.get(livrosRoutes.cadastro, livroController.formularioCadastro());

    // rota para adicionar novos livros
    // validação dos parametros de cadastro
    app.post(livrosRoutes.lista, Livro.validacoes(), livroController.cadastra()
    );

    // rota para o formulario de alterar o livro
    app.get(livrosRoutes.edicao, livroController.formularioEdicao());

    // rota para alterar os livros
    app.put(livrosRoutes.lista, livroController.edita());

    // rota para deletar o livro
    // usado o verbo delete para apagar
    // criado a variavel id para que qualquer coisa depois de (/livros/) seja salvo na variavel criada, ou seja, passar o id do livro para ser deletado
    app.delete(livrosRoutes.delecao, livroController.remove());

    
    

}
