
exports.theaterReqVal = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            message : `Failed! Body required`
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
    if(!req.body.city) {
        res.status(400).send({
            message : `Failed! City required!`
        });
        return;
    }
    if(!req.body.movies) {
        res.status(400).send({
            message : `Failed! Movies required!`
        });
        return;
    }
    if(!req.body.pincode) {
        res.status(400).send({
            message : `Failed Pincode required!`
        });
        return;
    }

    next();
}
