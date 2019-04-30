class LivroDao {

// construtor da classe que usa o parametro @db como caminho para o banco de dados
    constructor(db) {
// declarando que o parametro _db (deve ser utilizado apenas na classe) é = @db
        this._db = db;
    }

// criado a função @adiciona para adicionar novos livros
    adiciona(livro) {
// criado a promise que irá ser usada para adicionar os livros com os parametros @resolve e @reject
        return new Promise((resolve, reject) => {
// chamada ao banco de dados com uso da função @run do @sqlite
// a função @run é usada para usar metodos BD que não retornam resultados como o de adição
            this._db.run(
// INSERT de um novo livro na tabela livros no banco de dados
                `INSERT INTO livros ( titulo, preco, descricao ) values (?, ?, ?)`,
// delegando em qual coluna os valores vão ser adicionados na tabela por meio de um array
                [livro.titulo, livro.preco, livro.descricao],
// função callback em caso de erros
                function(error) {
// caso haja erros mostrar no console e retornar o @reject da promise com uma mensagem e terminar a transação
                    if (error) {
                        console.log(error);
                        return reject('Não foi poddível adicionar o livro!');
                    }
// caso não haja erros resolver a função com o parametro @resolve da promise
                        return resolve();
                }
            );
        });
    }

// criado a função @lista para listar os livros
    lista() {
// criado a promise que irá ser usada para listar os livros com os parametros @resolve e @reject
        return new Promise((resolve, reject) => {
// chamada ao banco de dados com dois parametros
            this._db.all(
// primeiro parametro, SELECT de todos os itens da tabela livros do banco de dados
                `SELECT * FROM livros`,
// segundo parametro, um bloco if com com dois paremetros, @error e @result para analizar os resultados
                (error, result) => {
// declarando que caso haja erros deve-se cair no bloco @error e retornar com o @reject da promise uma mensagem e parar a tansação
                    if (error) return reject ('Não foi possível listar os livros!');
// declarando que caso não haja erros deve-se cair no bloco @resolve da promise e o mesmo deve mostrar o resultado da promise com o parametro @result
                    return resolve(result);
                }      
            );
        });
    }

// função para busca de livros usando como parametro o id do livro
    buscaPorId(id) {
// criado a promise que irá ser usada para buscar o livro com os parametros @resolve e @reject
        return new Promise((resolve, reject) => {
// chamada ao banco de dados fazendo o uso do metodo @get para pegar o id do livro com três parametros
            this._db.get(
// primeiro parametro, select de um livro com determinado id na tabela livros
               `SELECT * FROM livros WHERE id = ?`,
// segundo parametro, array com o id do livro selecionado
               [id],
// terceiro parametro, um bloco if com com dois paremetros, @error e @result para analizar os resultados
               (error, result) => {
// declarando que caso haja erros deve-se cair no bloco @error e retornar com o @reject da promise uma mensagem e parar a tansação
                   if (error) return reject('Não foi possível encontrar o livro!');
// declarando que caso não haja erros deve-se cair no bloco @resolve da promise e o mesmo deve mostrar o resultado da promise com o parametro @result
                   return resolve(result);
               }
            );
        });
    }

// criado função para alterar dados do livro que usa como parametro o livro
    atualiza(livro) {
// criado a promise que irá ser usada para atualiza o livro com os parametros @resolve e @reject
        return new Promise((resolve, reject) => {
// chamada ao banco de dados com uso da função @run do @sqlite
// a função @run é usada para usar metodos BD que não retornam resultados como o de adição, atualização
            this._db.run(
// UPDATE dos dados do livro utilizando o id como ponto de referencia
                `UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`,
// array com os dados alterados no BD
                [livro.titulo, livro.preco, livro.descricao, livro.id],
// declarando que caso haja erros deve-se cair no bloco @error e retornar com o @reject da promise uma mensagem e parar a tansação
                (error) => {
                    if (error) {
                        return reject('Não foi possível atualizar o livro!');
                    }
// declarando que caso não haja erros deve-se cair no bloco @resolve da promise e o mesmo deve resolver a promise sem retornar um resultado
                    return resolve();
                }
            );
        });
    }

// função para remover um livro usando como parametro o id
    remove(id) {
// criado a promise que irá ser usada para atualiza o livro com os parametros @resolve e @reject
        return new Promise((resolve, reject) => {
// chamada ao banco de dados fazendo uso metodo @get do @sqlite para selecionar o livro pelo id
            this._db.get(
// delete do livro na tabela livros
                `DELETE * FROM livros WHERE id = ?`,
// array com o id do livro a ser deletado
                [id],
// declarando que caso haja erros deve-se cair no bloco @error e retornar com o @reject da promise uma mensagem e parar a tansação
                (error) => {
                    if (error) {
                        return reject('Não foi possível remover o livro!');
                    }
// declarando que caso não haja erros deve-se cair no bloco @resolve da promise e o mesmo deve resolver a promise sem retornar um resultado
                    return resolve();
                }
            );
        });
    }


}

//exportando como um modulo JavaScript a classe LivroDao
module.exports = LivroDao;