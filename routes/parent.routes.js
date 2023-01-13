const movieRoute = require('./movie.routes');
const theaterRoute = require('./theater.routes');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');

exports.createRoutes = (app) => {
    app.use('/movies', movieRoute);
    app.use('/theater', theaterRoute);
    app.use('/auth', authRoute);
    app.use('/user', userRoute);
}