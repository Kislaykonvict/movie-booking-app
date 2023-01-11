const Theater = require('../models/theater.model');
const Movie = require('../models/movie.model')

exports.createTheater = async (req, res) => {
    const body = req.body;

    const theaterObj = {
        name : body.name,
        description : body.description,
        city : body.city,
        movies : body.movies,
        pincode : body.pincode
    }

    try {
        const theaterInDb = await Theater.findOne({ name : req.body.name, pincode : req.body.pincode});
        if(theaterInDb) {
            res.status(409).send({
                message : `Theater with this name already exists in this pin : ${req.body.pincode} location!`
            });
            return;
        }
        
        const theater = await Theater.create(theaterObj);
        console.log(`theater added successfully!`)
        res.status(201).send(theater);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}

exports.getTheaterById = async (req, res) => {  
    const reqId = req.params.id;

    try {
        const theaterInDb = await Theater.findOne({ _id : reqId });
        console.log(`theater fetched successfully!`)
        res.status(200).send(theaterInDb);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}

exports.getTheater = async (req, res) => {
    
    const criteria = {};
    if(req.query.name) {
        criteria.name = req.query.name
    }
    if(req.query.city) {
        criteria.city = req.query.city
    }
    if(req.query.pincode) {
        criteria.pincode = req.query.pincode
    }
    try {
        const theater = await Theater.find(criteria);
        res.status(200).send(theater)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}

exports.deleteTheater = async (req, res) => {
    const delReq = req.params.id
    try {
        console.log(`Theater deleted successfully!`)
        const theater = await Theater.deleteOne({_id : delReq});
        res.status(200).send({
            message : `Theater has been deleted successfully!`
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}


exports.updateTheater = async (req, res) => {
    const reqId = req.params.id;
    const body = req.body;
    try {
        const theaterInDb = await Theater.findOne({ _id : reqId})
        if(!theaterInDb) {
            res.status(400).send({
                message : `Something wrong with the update data!`
            })
        }

        theaterInDb.name = body.name != undefined ? body.name : theaterInDb.name
        theaterInDb.description = body.description != undefined ? body.description : theaterInDb.description
        theaterInDb.city = body.casts != undefined ? body.city : theaterInDb.city
        theaterInDb.movies = body.movies != undefined ? body.movies : theaterInDb.movies
        theaterInDb.pincode = body.pincode != undefined ? body.pincode : theaterInDb.pincode

        const updatedTheater = await theaterInDb.save();
        res.status(200).send(updatedTheater);  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}

exports.addOrDelMoviesToTheater = async (req, res) => {
    const reqId = req.params.id;
    const movieIds = req.body.movieIds;
    try {
        const theaterInDb = await Theater.findOne({ _id : reqId });
        
        for(let i = 0; i < movieIds.length; i++) {
            if(req.body.insert) {
                //Adding movieIds to the theaters
                theaterInDb.movies.push(movieIds[i])
            }
            else {
                //removing movieIds from the theaters
                theaterInDb.movies = theaterInDb.movies.filter(movId => movId != movieIds[i]);
            }
        }
        await theaterInDb.save();
        console.log(`requested movie or movies added to the theater`)
        res.status(200).send(theaterInDb);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`
        });
    }
}


exports.checkMoviesInTheater = async (req, res) => {
    const theaterId = req.params.theaterId;
    const movieId = req.params.movieId;

    try {
        const theaterInDb = await Theater.findOne({ _id : theaterId });
        const movieInDb = await Movie.findOne({ _id : movieId });

        const responseObj = {
            message : theaterInDb.movies.includes(movieInDb._id) ? `Yes, The movie - ${movieInDb.name} is running on this Theater - ${theaterInDb.name}` : `No, The movie : ${movieInDb.name} is not running on this Theater : ${theaterInDb.name}.`
        }
        console.log(`your request has been processed!`)
        res.status(200).send(responseObj);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`
        });
    }
}