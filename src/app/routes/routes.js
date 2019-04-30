const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

// exportando a função @app como um modulo
module.exports = (app) => {

// rota para a página inicial
    app.get('/', function(req, resp) {
// declarando qua a resposta da rota vai ser um arquivo .marko
        resp.marko(
//importando o arquivo
            require('../views/base/home/home.marko')
        );
    });

// Rota para (/livros)
    app.get('/livros', function(req, resp) {  
// Iniciado uma instância do objeto @LivroDao com parametro do banco de dados @db
        const livroDao = new LivroDao(db);
// Chamado uma função de listagem @lista do objeto @LivroDao como resposta a Promise declarada em @LivroDao
        livroDao.lista()
// Declarando que a resposta da promise vai usar como resposta um arquivo .marko
                .then(livros => resp.marko(
// Importando o arquivo .marko que contem o HTML da página
                    require('../views/livros/lista/lista.marko'),
// Informando qual é o tipo da lista
                    { livros:livros }
                ))
// bloco catch para caso haja algum erro esse erro seja declarado no console
                .catch(error => console.log(error))
    });

// rota para o formulario de adicionar livros
    app.get('/livros/form', function(req, resp) {
// declarando qua a resposta da rota vai ser um arquivo .marko
        resp.marko(
// importando o arquivo .marko
// segundo parametro, arquivo json 
            require('../views/livros/form/form.marko'), { livro: {}});
    });

// rota para adicionar novos livros
    app.post('/livros', function(req, resp) {
// Iniciado uma instância do objeto @LivroDao com parametro do banco de dados @db
        const livroDao = new LivroDao(db);
// Chamado uma função de adição @adiciona do objeto @LivroDao como resposta a Promise declarada em @LivroDao
// a função @adiciona recebe como parametro o corpo (@body) do formulario de adição
        livroDao.adiciona(req.body)
// caso tudo ocorra corretamente a resposta vai ser um redirecionamento para (/livros) atualizada
// o @redirect redireciona de uma página para outra
                .then(resp.redirect('/livros'))
// bloco catch para caso haja algum erro esse erro seja declarado no console
                .catch(error => console.log(error));
    });

// rota para deletar o livro
// usado o verbo delete para apagar
// criado a variavel id para que qualquer coisa depois de (/livros/) seja salvo na variavel criada, ou seja, passar o id do livro para ser deletado
    app.delete('/livros/:id', function(req, resp) {
// constante id onde vai ficar salvo por parametro o id do livro a ser deletado, é feita uma requisição para pegar o parametro id
        const id = req.params.id;
// Iniciado uma instância do objeto @LivroDao com parametro do banco de dados @db
        const livroDao = new LivroDao(db);
// Chamado uma função de remoção @remove do objeto @LivroDao como resposta a Promise declarada em @LivroDao com o parametro id do livro
        livroDao.remove(id)
// caso tudo ocorra corretamente a resposta vai ser o status 200 (ok) do http e termirnar a promise
                .then(() => resp.status(200).end())
// bloco catch para caso haja algum erro esse erro seja declarado no console
                .catch(error => console.log(error));
    });

// rota para o formulario de alterar o livro
    app.get('/livros/form/:id', function(req, resp) {
// constante id onde vai ser salvo o id pego via parametro
        const id = req.params.id;
// Iniciado uma instância do objeto @LivroDao com parametro do banco de dados @db
        const livroDao = new LivroDao(db);
// chamada da função @buscaPorId do @LivroDao para pegar o livro pelo id do livro
        livroDao.buscaPorId(id)
// declarando que como resposta da promise deve ser devolvido um arquivo .marki
                .then(livro => 
                    resp.marko(
// importação do arquivo .marko
                        require('../views/livros/form/form.marko'),
                        { livro:livro }
                    )
                )
// bloco catch para caso haja algum erro esse erro seja declarado no console
                .catch(error => console.log(error));
    });

// rota para alterar os livros
app.put('/livros', function(req, resp) {
// Iniciado uma instância do objeto @LivroDao com parametro do banco de dados @db
            const livroDao = new LivroDao(db);
// Chamado uma função de atualizar @atualiza do objeto @LivroDao como resposta a Promise declarada em @LivroDao
// a função @atualiza recebe como parametro o corpo (@body) do formulario de adição
            livroDao.atualiza(req.body)
// caso tudo ocorra corretamente a resposta vai ser um redirecionamento para (/livros) atualizada
// o @redirect redireciona de uma página para outra
                    .then(resp.redirect('/livros'))
// bloco catch para caso haja algum erro esse erro seja declarado no console
                    .catch(error => console.log(error));
        });
    

}
