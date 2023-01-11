const constants = require("../utils/constants");


exports.movieReqVal = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            message : `Failed! Body required!`
        });
        return;
    }
    if(!req.body.name) {
        res.status(400).send({
            message : `Failed! Name required!`
        });
        return;
    }
    if(!req.body.description) {
        res.status(400).send({
            message : `Failed! Description required!`
        });
        return;
    }
    if(!req.body.casts) {
        res.status(400).send({
            message : `Failed! Casts required!`
        });
        return;
    }
    if(!req.body.releaseDate) {
        res.status(400).send({
            message : `Failed! ReleaseDate required!`
        });
        return;
    }

    if(!req.body.director) {
        res.status(400).send({
            message : `Failed! Director required!`
        });
        return;
    }
    
    if(!req.body.releaseStatus) {
        res.status(400).send({
            message : `Failed! ReleaseStatus required!`
        });
        return;
    }
    const movieStatus = req.body.releaseStatus;
    const releaseStatus = [constants.movieStatus.released, constants.movieStatus.unrealeased, constants.movieStatus.blocked ]
    if(!releaseStatus.includes(movieStatus)) {
        res.status(400).send({
            message : `Failed! Release status is invalid! possible values should be RELEASED | UNRELEASED | BLOCKED`
        });
        return;
    }
    
    if(!req.body.language) {
        res.status(400).send({
            message : `Failed! Language required!`
        });
        return;
    }

    next();
}