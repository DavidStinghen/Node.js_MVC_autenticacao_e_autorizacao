const livrosRoutes = require('./livro-routes');
const baseRoutes = require('./base-routes');

// exportando a função @app como um modulo
module.exports = (app) => {
    baseRoutes(app);
    livrosRoutes(app);
}
