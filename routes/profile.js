const express = require("express");
const auth= require('../middleware/verifytoken');//For validation

const Profile = require("../models/profile_model");
const { profileValidation } = require('../validation/validation');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//creating user profile
route.post("/addprofile",auth,async(req, res) => {
  
  //validating data  
  const {error}=profileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profile = new Profile({
    id:req.body.id,
    phoneno: req.body.phoneno,
    address: {
        line1: req.body.line1,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
      },
    fathername:req.body.fathername,
    heighestqual:req.body.heighestqual
  });
  try{
    const result= await profile.save();
    res.status(200).send("Details of user profile has been saved successfully");
  }
  catch(ex){
    console.log(ex.message);
    res.status(400).send("Unable to save in database");
  }
});

module.exports = route;
