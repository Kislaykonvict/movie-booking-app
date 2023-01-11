const express = require('express');
const { createMovie, deleteMovie, getMovieById, updateMovie, getAllMovie } = require('../controllers/movieController');
const { movieReqVal } = require('../middleware/movieValidator');



const router = express.Router();

router.post('/create', [movieReqVal], createMovie);
router.delete('/delete/:id', deleteMovie);
router.get('/:id', getMovieById);
router.put('/update/:id', updateMovie);
router.get('/', getAllMovie);

module.exports = router;  