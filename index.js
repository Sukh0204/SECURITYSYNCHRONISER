const express=require('express');
const net = require("net");
var fs = require("fs");
var path = require('path');
var process= require('process');
//The Path module provides a way of working with directories and file paths.
const port=5000;
const sender= require('./sender');
const recieve= require('./reciever');
//button for recieve data??/ sync 
//maybe have submit to sync data as well i.e. sync up the currently submitted data
//while sync data can be kept to recieve??


const db=require('./config/mongoose');
const model= require('./models/avalanche.js');
var multer= require('multer');
var csv= require('csvtojson');  
var bodyParser  = require('body-parser'); 

const app= express();// create an instance /object from express

app.set('view engine', 'ejs'); //setting our view engine as ejs
app.set('views', path.join(__dirname, 'views'));//joining path to views
//static folder  
app.use(express.static(path.resolve(__dirname,'public'))); 
//app.use('/', require('./routes'));//using our routes
app.use(express.urlencoded()); //middleware for parser- preprocessing data
app.use(express.static('assets')); //middleware for static pages- read em
app.use(bodyParser.urlencoded({extended:false})); 


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
temp = parseFloat(jsonObj[x].sector_id)  
jsonObj[x].sector_id = temp;  
temp = parseFloat(jsonObj[x].avalanche_axis)  
jsonObj[x].avalanche_axis = temp;  
temp = parseFloat(jsonObj[x].forecast1)  
jsonObj[x].forecast1 = temp;  
temp = parseFloat(jsonObj[x].forecast2) 
jsonObj[x].forecast2 = temp;  
temp = parseFloat(jsonObj[x].forecast3)  
jsonObj[x].forecast3 = temp;  
count++;
console.log(count);
} 

//insertmany is used to save bulk data in database.
//saving the data in collection(table)
model.insertMany(jsonObj,function(err,data){ 
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
    model.find(function(err, data){
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

app.listen(port, function(err){
    if(err){
        console.log("errorrrr ", err);
    }
    console.log('Server running on port: ', port);
})
