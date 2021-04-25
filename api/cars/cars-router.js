const db = require("./cars-model");
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")
const router = require("express").Router();

router.get('/cars', async (req, res, next) => {
    try{
        const cars = await db.getAll();
        res.json(cars);
    }catch (err){
        next(err)
    }
});

router.get('/cars/:id', checkCarId, async (req, res, next) => {
    try{
        res.json(req.car);
    }catch (err){
        next(err);
    }
});

router.post('/cars', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try{
        const car = await db.create(req.body);
        res.status(201).json(car);
    }catch (err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

module.exports = router;