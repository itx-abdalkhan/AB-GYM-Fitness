const { exec } = require("child_process");
const express = require("express");
const path = require("path")
const bodyparser = require("body-parser");
var mongoose= require("mongoose")

const app = express();
const fs = require("fs")

const port = 80;

// getting-started.js
var mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactSchema');
}

const contactSchema = new mongoose.Schema({
    name: String,
   //  weight:String,
   //  height:String,
    Phone: String,
    address:String,
    email: String,
    message:String
});
const registerSchema=new mongoose.Schema({
   name: String,
    weight:String,
    height:String,
    Phone: String,
    address:String,
    email: String,
   //  message:String
})
// const registerSchema = new mongoose.Schema({
//     name: String,
//     weight:String,
//     height:String,
//     Phone: String,
//     address:String,
//     email: String,
// });

const Contact = mongoose.model('contact', contactSchema );
const register = mongoose.model('register', registerSchema );

// Express Specific stuff 
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG Specific stuff

app.set('view engine', 'pug') //To set the template engine as a pug 
app.set('views', path.join(__dirname, 'views')) //To set the veiwer directory 


// To set the ends point of pug 
app.get("/", (req, res) => {
   let params = {};
   res.status(200).render("home.pug", params);
})
app.get("/signup", (req, res) => {
   let params = {};
   res.status(200).render("login.pug", params);
})
app.get("/health", (req, res) => {
   let params = {};
   res.status(200).render("health.pug", params);
})
app.post("/", (req, res) => {
   var myData = new Contact(req.body);
   myData.save().then(()=>{
   res.send("Your form have been successfully submitted thank you to contact with us")
   }).catch(()=>{
   res.status(400).send("Your form is not submitted")
})

})
app.post("/register", (req, res) => {
   var myData = new register(req.body);
   myData.save().then(()=>{
   res.send("You have been applied to our gym. We will contact you soon")
   }).catch(()=>{
   res.status(400).send("Your form is not submitted")
})

})
// app.post("/register", (req, res) => {
//    var myData = new register(req.body);
//    myData.save().then(()=>{
//    res.send("This item has been saved to the database")
//    }).catch(()=>{
//    res.status(400).send("item was not saved to the databse")
// })

// })

// app.post("/",(req,res)=>{
//    user= req.body.username
//    pass= req.body.password

//    let signup=`The customer username is ${user} and the password is ${pass}`
//    fs.writeFileSync("signup.txt",signup)

//    let params = { message: "You have successfully login to AB GYM FITNESS" }
//    res.status(200).render("login.pug", params)

// })


// Port listen 
app.listen(port, () => {
   console.log(`The server is running successfully on port ${port}`);
});