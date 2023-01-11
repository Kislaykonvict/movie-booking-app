
const Movie = require('../models/movie.model')


exports.createMovie = async (req, res) => {
    const body = req.body;

    const movieObj = {
        name : body.name,
        description : body.description,
        casts : body.casts,
        director : body.director,
        releaseDate : body.releaseDate,
        releaseStatus : body.releaseStatus,
        language : body.language,
        posterUrl : body.posterUrl,
        trailerUrl : body.trailerUrl
    }
    try {
        const movie = await Movie.create(movieObj);
        console.log(`Movie added successfully!`);
        res.status(201).send(movie);
    } catch (error) {
        console.log(error.message);  
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`
        });
    }
}

   
exports.deleteMovie = async (req, res) => {
    const reqId = req.params.id;
    
    try {
        const movie = await  Movie.findOneAndDelete({ _id : reqId })
        console.log('movie deleted successfully')
        res.status(200).send({
            message : `movie - ${movie.name} has been deleted successfully!`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`
        });
    }
}


exports.getAllMovie = async (req, res) => {

    const criteria = {};
    if(req.query.name) {
        criteria.name = req.query.name
    }
    try {
        const movie = await Movie.find(criteria);
        console.log('all movies fetched successfully!');
        res.status(200).send(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}



exports.getMovieById = async (req, res) => {
    
    const reqId = req.params.id
    try {
        const movie = await Movie.findOne({_id : reqId});
        if(!movie) {
            return res.status(404).send({
                message : `Movie not found!`
            })
        }
        console.log('movie fetched successfully!');
        res.status(200).send(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}

exports.updateMovie = async (req, res) => {
    const reqId = req.params.id
    const body = req.body;

    try {
        const movieInDb = await Movie.findOne({ _id : reqId})
        if(!movieInDb) {
            res.status(400).send({
                message : `Something wrong with the update data!`
            })
            return;
        }
        movieInDb.name = body.name ?? movieInDb.name
        movieInDb.description = body.description ?? movieInDb.description
        movieInDb.casts = body.casts ?? movieInDb.casts
        movieInDb.releaseDate = body.releaseDate ?? movieInDb.releaseDate
        movieInDb.releaseStatus = body.releaseStatus ?? movieInDb.releaseStatus
        movieInDb.director = body.director ?? movieInDb.director
        movieInDb.language = body.language ?? movieInDb.language
        movieInDb.posterUrl = body.posterUrl ?? movieInDb.posterUrl
        movieInDb.trailerUrl = body.trailerUrl ?? movieInDb.trailerUrl

        const updatedMovie = await movieInDb.save();
        console.log(`movie updated successfully!`);
        res.status(200).send(updatedMovie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}