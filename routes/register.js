const express = require("express");
const bcrypt = require("bcrypt");//For password encryption

const User = require("../models/user_model");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
const { registerValidation } = require('../validation/validation');


//signup or registeration of user

route.post("/registeruser",async (req, res) => {

  //validating data
  const {error}=registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if User is already registered
  const emailExist = await User.findOne({ emailid: req.body.emailid });
  if (emailExist){
  console.log(emailExist);
return res.status(400).send('Email already exists');
} 

  // password encryption
  const salt = await bcrypt.genSalt(10);//Use Salt to make password encryption stronger 
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    emailid: req.body.emailid,
    password: hashedPassword
  });

  try{
    const result= await user.save();
    res.status(200).send("Details of user has been saved successfully");
  }
  catch(ex){
    console.log(ex.message);
    res.status(400).send("Unable to save in database");
  }

});

route.post("/update",async(req,res)=>{
    const result=await User.updateOne({"emailid":req.body.emailid},{
      $set:{
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "emailid":req.body.emailid}},(err,userd)=>{
          if(err){
            res.status(400).send("Unable to save in database");
          }
          else{res.status(200).send("Details of user has been updated successfully");
        }
          
    });
  });
 
module.exports = route;
