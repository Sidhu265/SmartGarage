const express = require('express');
const CarModel = require('../models/car');
const carRouter = express.Router();
const authenticateToken = require('../middleware/auth');


carRouter.get('/',authenticateToken, async (req, res) => {
    try {
        const cars = await CarModel.find({ userId: req.userId });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

carRouter.get('/:id',authenticateToken, async (req, res) => {
    try {
        const car = await CarModel.findOne( { _id: req.params.id, userId: req.userId });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

carRouter.post('/newcar',authenticateToken, async (req, res) => {
    try {
        const newCar = await CarModel.create({ ...req.body, userId: req.userId });
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
});

carRouter.put('/:id',authenticateToken, async (req, res) => {
    try {
        const updatedCar = await CarModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { name: req.body,
              description: req.description
             }
        );
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
})


carRouter.delete('/:id',authenticateToken, async (req, res) => {
    try {
        const deletedCar = await CarModel.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = carRouter;
