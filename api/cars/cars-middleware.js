const db = require("./cars-model");
const dbConfig = require("../../data/db-config")
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  db.getById(req.params.id)
    .then(car => {
      if(car){
        req.car = car;
        next();
      }else{
        res.status(404).json({ message: `car with id ${req.params.id} is not found` })
      }
    })
    .catch(err => {
      next(err)
    })
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.vin){
    res.status(400).json({ message: "vin is missing" })
  }else{
    if(!req.body.make){
      res.status(400).json({ message: "make is missing" })
    }else{
      if(!req.body.model){
        res.status(400).json({ message: "model is missing" })
      }else{
        if(!req.body.mileage){
          res.status(400).json({ message: "mileage is missing" })
        }else{
          next();
        }
      }
    }
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if(isValidVin == false){
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }else{
    next();
  }
}

const checkVinNumberUnique = (req, res, next) => {
  dbConfig.select("vin")
    .from("cars")
    .where("vin", req.body.vin)
    .then(vinList => {
      if(vinList.length === 0){
        next()
      }else{
        res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      }
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}