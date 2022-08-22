const express = require('express');
const router = express.Router();
const { getSingleThought, getThoughts, createThought, deleteThought, updateThought } = require('../controller/thoughtsController');

router.route('/').get(getThoughts).post(createThought)
router.route('/:id').get(getSingleThought).delete(deleteThought).put(updateThought)

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
