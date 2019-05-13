const templates = require('../views/templates');
const LivroController = require('./livro-controller');

class BaseController {

    // encapsulando rotas em uma função
    static routes() {
        return {
            home:'/',
            login:'/login'
        };
    }

    //função para chamar o template home
    home() {
        return function(req, resp) {
            resp.marko(
                templates.base.home
            );
        };
    }

    // função para chamar o template de login
    login() {
        return function(req, resp) {
            resp.marko(
                templates.base.login
            );
        };
    }

    // função de efetuar login
    efetuaLogin() {
        return function(req, resp, next) {
            // chamada do @passport por injeção direta
            const passport = req.passport;

            // chamada da função @authenticate
            // definindo que a autenticação vai ser local
            //chamada de uma função
            passport.authenticate('local', 
                (error, usuario, info) => {

                    // se houver informação correta devolver a página
                    if (info) {
                        return resp.marko(templates.base.login);
                    }

                    // caso haja erros devolver o erro
                    if (error) {
                        return next(error);
                    }
                    
                    // se tudo estiver correta com as credenciais chamar a função @login
                    req.login(usuario, (error) => {
                        // caso tenha um erro mostrar o erro
                        if (error) {
                            return next(error);
                        }
                        
                        // caso não haja erros redirecionar para a lista de livros
                        return resp.redirect(LivroController.routes().lista);
                    });

                })(req, resp, next);  

        }
    }


}

module.exports = BaseController;