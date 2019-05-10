const BaseController = require('../controller/base-controller');
const baseController = new BaseController();

// exportando a função @app como um modulo
module.exports = (app) => {

    const baseRoutes = BaseController.routes();
    // rota para a página inicial
    app.get(baseRoutes.home, baseController.home());

    // rotas agrupadas para login
    app.route(baseRoutes.login)
        // rota para o formulário de login
        .get(beseController.login())
        // rota para efetuar o logins
        .post(basecontroller.efetuaLogin());

};
