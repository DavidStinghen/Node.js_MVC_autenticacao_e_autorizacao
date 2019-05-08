const { check} = require('express-validator/check');

class Livro {

    static validacoes() {
        [
            // verifica com a função @check do @express-validator com o metodo @isLength se o titulo tem no minimo 5 caracteres
            check('titulo').isLength({ min: 5 }).withMessage('O titulo deve ter no minimo 5 caracteres!'),
            // verifica com a função @check do @express-validator com o metodo @isCurrency se o preco tem valor monetário
            check('preco').isCurrency().withMessage('o preço precisa ter um valor monetário válido!')
        ]
    }
}

module.exports = Livro;