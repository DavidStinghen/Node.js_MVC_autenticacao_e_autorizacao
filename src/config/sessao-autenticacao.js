const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/usuario-dao');
const db = require('./database')

module.exports = (app) => {

    // usando o @Strategy do @passport-local para definir os campos que vão ser autenticados
    // @Strategy usa dois parametros para autenticação
    passport.use(new LocalStrategy(
        // primeiro parametro: campos a serem validados
        {
            usernameField: 'email',
            passwordField: 'senha' 
        },
        // segundo parametro: uma função que leva como parametros os campos a serem autenticados e o done
        (email, senha, done) => {
            // criando uma instancia da classe @UsuarioDao
            const usuarioDao = new UsuarioDao(db);
            // chamada da função @buscaPorEmail como resposta a promise de @UsuarioDao
            usuarioDao.buscaPorEmail(email)
                        // bloco then para quando as informações não sejam compatíveis com o db
                        .then(usuario => {
                            if (!usuario || senha != usuario.senha) {
                                // retorno com o parametro done quando as informações são incompatíveis
                                return done(null, false, {
                                    message: 'login e senha incorretos!'
                                });
                            }
                            
                            // retorno de none caso tudo tenha ocorrido bem
                            return done(null, usuario);
                        })
                        // bloco catch para quando ocorra um erro
                        .catch(error => done(error, false));

        }
    ));
    
    // chamada do metodo @serializeUser para criar uma serialização para a sessão do usuario
    passport.serializeUser((usuario, done) => {
        // objeto que salva as informações do usuario
        const userSession = {
            nome: usuario.nome_completo,
            email: usuario.email
        };

        // passando o objeto a ser serializado
        done(null, userSession);
    });

    // chamada do metodo @deserializeUser para desfazer uma serialização para a sessão do usuario
    passport.deserializeUser((userSession, done) => {
        // passando para done o objeto que deve ser desfeita a serialização
        done(null, userSession);
    });

    // configuração da sessão com o @express-session
    // utilizando app pois o @express-session retorna um middleware
    app.use(session({
        // identificador da sessão
        secret: 'node alura',
        // retornar um identificador para cada sessão
        genid: function(req) {
            // retorno para @uuid para gerar o id da sessão
            return uuid();
        },
        // configuração para não resalvar a sessão
        resave: false,
        // configurando para não criar uma sessão quando não esstá logado
        saveUninitialized: false
    }));

    // inicializando o @passport
    app.use(passport.initialize());
    // inicializando a  sessão
    app.use(passport.session());

    
};