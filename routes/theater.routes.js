const express = require('express');
const { createTheater, getTheater, deleteTheater, updateTheater, addOrDelMoviesToTheater, checkMoviesInTheater, getTheaterById } = require('../controllers/theaterController');

const { theaterReqVal } = require('../middleware/theaterValidator');


const router = express.Router();

router.post('/create', [theaterReqVal], createTheater);
router.get('/get', getTheater);
router.delete('/del/:id', deleteTheater);
router.put('/update/:id', [theaterReqVal], updateTheater);
router.get('/:id', getTheaterById);
router.put('/:id/movies', addOrDelMoviesToTheater);
router.get('/:theaterId/movies/:movieId', checkMoviesInTheater);

module.exports = router;