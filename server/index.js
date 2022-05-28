const express=require('express');
const passport = require("passport");
const net = require("net");
var fs = require("fs");
var path = require('path');
var process= require('process');
//The Path module provides a way of working with directories and file paths.
const port=5000;
const sender= require('./sender');
const recieve= require('./reciever');
var viewModel = require("./models/shivmandir");
//button for recieve data??/ sync 
//maybe have submit to sync data as well i.e. sync up the currently submitted data
//while sync data can be kept to recieve??


const db=require('./config/mongoose');
const model= require('./models/avalanche.js');
var multer= require('multer');
var csv= require('csvtojson');  
var bodyParser  = require('body-parser'); 


const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");

const app= express();// create an instance /object from express

app.set('view engine', 'ejs'); //setting our view engine as ejs
app.set('views', path.join(__dirname, 'views'));//joining path to views
//static folder  
app.use(express.static(path.resolve(__dirname,'public'))); 
//app.use('/', require('./routes'));//using our routes
app.use(express.urlencoded()); //middleware for parser- preprocessing data
app.use(express.static('assets')); //middleware for static pages- read em
app.use(bodyParser.urlencoded({extended:true})); 

//
//
//login and sign in pages
//
//
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================
 
// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});
 
// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
 
// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});
 
// Handling user signup
app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
 
        passport.authenticate("local")(
            req, res, function () {
            res.render("secret");
        });
    });
});
 
//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});
 
//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {
});
 
//Handling user logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

//
//
//Uploading Data
//
//

//multer for storing the form data 
var storage = multer.diskStorage({  
    destination:function(req,file,cb){  
    cb(null,'./public/uploads');  
    },  
    //original name??? we want variable
    filename:function(req,file,cb){  
    cb(null,file.originalname);  
    }  
    });

    var count = 0 ;

var uploads = multer({storage: storage}); 

//get and post functions to render pages
//dis rendering home wid the data
app.get('/secret',(req,res)=>{  
    console.log('Line 44 works');
    res.render('home');
    // model.find((err,data)=>{  
    // if(err){  
    // console.log(err);  
    // }else{  
    // if(data!=''){  
    // res.render('home',{data:data});  
    // }else{  
    // res.render('home',{data:''});  
    // }  
    // }  
    // });  
    }); 

//this is adding the data via a json object array
var temp ;  

app.post('/secret',uploads.single('csv'), function(req,res){  
console.log(req.file.filename);
console.log(req.file.length);
count= req.file.length;
//convert csvfile to jsonArray     
csv()  
.fromFile(req.file.path)  
.then(function(jsonObj){  

console.log('there there');

//this loop seems unnessecary- check and remove
for(var x=0;x<jsonObj;x++){  
temp = parseFloat(jsonObj[x].DateTime)  
jsonObj[x].DateTime = temp;  
temp = parseFloat(jsonObj[x].AT)  
jsonObj[x].AT = temp;  
temp = parseFloat(jsonObj[x].ATmax)  
jsonObj[x].ATmax = temp;  
temp = parseFloat(jsonObj[x].ATmin) 
jsonObj[x].ATmin = temp;  
temp = parseFloat(jsonObj[x].Battery)  
jsonObj[x].Battery = temp;  
temp = parseFloat(jsonObj[x].Pressure)  
jsonObj[x].Pressure = temp;  
temp = parseFloat(jsonObj[x].RH)  
jsonObj[x].Battery = temp;  
temp = parseFloat(jsonObj[x].SnowTemp1)  
jsonObj[x].RH = SnowTemp1;  
temp = parseFloat(jsonObj[x].WindDir)  
jsonObj[x].WindDir = temp;  
temp = parseFloat(jsonObj[x].WindSp)  
jsonObj[x].WindSp = temp;  
temp = parseFloat(jsonObj[x].Albedo_IN)  
jsonObj[x].Albedo_IN = temp;  
temp = parseFloat(jsonObj[x].Albedo_Out)  
jsonObj[x].Albedo_Out = temp;  
temp = parseFloat(jsonObj[x].NetRad)  
jsonObj[x].NetRad = temp;  
temp = parseFloat(jsonObj[x].SD_Avg)  
jsonObj[x].SD_Avg = temp;  
temp = parseFloat(jsonObj[x].SD_Ins) 
jsonObj[x].SD_Ins = temp;  
temp = parseFloat(jsonObj[x].SnowPreci)  
jsonObj[x].SnowPreci = temp;  
temp = parseFloat(jsonObj[x].SnowTemp2)  
jsonObj[x].SnowTemp2 = temp;  
temp = parseFloat(jsonObj[x].SunD)  
jsonObj[x].SunD = temp;  
temp = parseFloat(jsonObj[x].GPSstatus1)  
jsonObj[x].GPSstatus1 = temp;  
temp = parseFloat(jsonObj[x].GPSstatus2)  
jsonObj[x].GPSstatus2 = temp;  
temp = parseFloat(jsonObj[x].Status1)  
jsonObj[x].Status1 = temp;  
temp = parseFloat(jsonObj[x].Status2)  
jsonObj[x].Status2 = temp;  
temp = parseFloat(jsonObj[x].ReportingTime1)  
jsonObj[x].ReportingTime1 = temp;  
temp = parseFloat(jsonObj[x].ReportingTime2)  
jsonObj[x].ReportingTime2 = temp;  
temp = parseFloat(jsonObj[x].TotalBurst1)  
jsonObj[x].TotalBurst1= temp;  
temp = parseFloat(jsonObj[x].TotalBurst2)  
jsonObj[x].TotalBurst2 = temp;  
count++;
console.log(count);
} 

//insertmany is used to save bulk data in database.
//saving the data in collection(table)
viewModel.insertMany(jsonObj,function(err,data){ 
    count=jsonObj.length;
    console.log(jsonObj.length);
if(err){  
console.log(err);  
}else{  
res.redirect('/secret');  
}  
});  
});  
}); 

app.get('/sync-data', sender.send);
app.get('/accept-data', recieve.got);
app.get('/view', function(req, res){
    console.log('Line 105 works');
    console.log(count);
    viewModel.find(function(err, data){
        if(err){console.log(err);}
        else{
           // console.log(data);
            if(data!=''){
                res.render('view_data', {
                    data:data,
                    'indexes':count});  
            }else{  
            res.render('view_data',{data:''});  
            }  
        }
    })
});

//if recieved directory is not empty file lo and usko bhedo database mein
//but this process should happen instantaneously coz if another file is added before data sync up 
//data recieved pehle will be permanently lost

//
//view published data 
//

app.get('/publish-data', function(req, res){
    console.log('publish data route');
    console.log(count);
    model.find(function(err, data){
        if(err){console.log(err);}
        else{
           // console.log(data);
            if(data!=''){
                res.render('publish_data', {
                    data:data,
                    'indexes':count});  
            }else{  
            res.render('publish_data',{data:''});  
            }  
        }
    })
});

app.listen(port, function(err){
    if(err){
        console.log("errorrrr ", err);
    }
    console.log('Server running on port: ', port);
})
