const db = require("./cars-model");
const router = require("express").Router();

router.get('/', async (req, res, next) => {
    try{
        const cars = await db.getAll();
        res.json(cars);
    }catch (err){
        next(err)
    }
})

module.exports = router;