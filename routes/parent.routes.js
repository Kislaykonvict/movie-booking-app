const movieRoute = require('./movie.routes');


exports.createRoutes = (app) => {
    app.use('/movies', movieRoute);
    
}