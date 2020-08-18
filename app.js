const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/<databaseName>",{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home");
});

app.post("/",function(req,res){
  console.log(req.body.ctc);
  console.log(req.body.deduction);
  console.log("calculating the taxes according to old scheme.");
  let taxable = req.body.ctc-req.body.deduction;
  let taxamt = 0;
  if(taxable <= 250000){

  }
  else if(taxable <= 500000){
    taxamt = (0.05*taxable);
  }
  else if(taxable <= 1000000){
    taxamt = 12500 + (0.2*(taxable-500000));
  }
  else{
    taxamt = 112500 + (0.3*(taxable-1000000));
  }
  console.log(taxamt);
  console.log("calculating for the new scheme.");
  taxable = req.body.ctc;
  let taxamtOld = taxamt;
  taxamt = 0;
  if(taxable <= 250000){

  }
  else if(taxable <= 500000){

  }
  else if(taxable <= 750000){
    taxamt = 12500+(0.1*(taxable-500000));
  }
  else if(taxable <= 1000000){
    taxamt = 37500+(0.15*(taxable-750000));
  }
  else if(taxable <= 1250000){
    taxamt = 75000+(0.2*(taxable-1000000));
  }
  else if(taxable <= 1500000){
    taxamt = 125000+(0.25*(taxable-1250000));
  }
  else{
    taxamt = 187500+(0.3*(taxable-1500000));
  }
  console.log(taxamt);
  let taxamtNew = taxamt;
  if(taxamtOld < taxamtNew){
    res.render('results',{heading: "Old Taxation System is better for you!",oldtax: taxamtOld,newtax: taxamtNew});
  }
  else{
    res.render('results',{heading: "New Taxation System is better for you!",oldtax: taxamtOld,newtax: taxamtNew});
  }
});




app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
