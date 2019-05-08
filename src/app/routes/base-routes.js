const BaseController = require('../controller/base-controller');
const baseController = new BaseController();

// exportando a função @app como um modulo
module.exports = (app) => {

    const baseRoutes = BaseController.routes();
    // rota para a página inicial
    app.get(baseRoutes.home, baseController.home());

}
