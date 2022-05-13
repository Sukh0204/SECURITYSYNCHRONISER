const net = require("net"), fs = require("fs"), remote_server = "169.254.162.229"; //change ip
var path = require('path');
var process= require('process');
let socket;
var csvtojson= require('csvtojson');  
var bodyParser  = require('body-parser'); 
var model = require("./models/shivmandir");
const db=require('./config/mongoose');
var dirname = "./public/recieved/";


module.exports.got=function(req, res){
  socket = remote_server ? net.connect(4999, remote_server) : net.connect(4999);

  let ostream = fs.createWriteStream("./public/recieved/file.csv");
  let date = new Date(), size = 0, elapsed;
  socket.on('data', chunk => {
    size += chunk.length;
    elapsed = new Date() - date;
    socket.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB of data was sent. Total elapsed time is ${elapsed / 1000} s`)
    process.stdout.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB of data was sent. Total elapsed time is ${elapsed / 1000} s`);
    ostream.write(chunk);
  });
  socket.on('error', function(err) {
      console.log(`Error: ${err}`);
  });
  socket.on("end", () => {
  console.log(`\nFinished getting file. speed was: ${((size / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} MB/s`);
  //adding data to mongodb
fs.readdir(dirname, function(err, files) {
  if (err) {
  // some sort of error
  console.log(`Error: ${err}`);
  } else {
  if (files.length!=0) {
     // directory not empty
     // CSV file name
     const fileName = "./public/recieved/file.csv";
     var arrayToInsert = [];
     csvtojson().fromFile(fileName).then(source => {
     // Fetching the all data from each row
     for (var i = 0; i < source.length; i++) {
     var oneRow = {
         DateTime: source[i]["DateTime"],
         AT: source[i]["AT"],
         ATmax: source[i]["ATmax"],
         ATmin: source[i]["ATmin"],
         Battery: source[i]["Battery"],
         Pressure: source[i]["Pressure"],
         RH: source[i]["RH"],
         SnowTemp1: source[i]["SnowTemp1"],
         WindDir: source[i]["WindDir"],
         WindSp: source[i]["WindSp"],
         Albedo_IN: source[i]["Albedo_IN"],
         Albedo_Out: source[i]["Albedo_Out"],
         NetRad: source[i]["NetRad"],
         SD_Avg: source[i]["SD_Avg"],
         SD_Ins: source[i]["SD_Ins"],
         SnowPreci: source[i]["SnowPreci"],
         SnowTemp2: source[i]["SnowTemp2"],
         SunD: source[i]["SunD"],
         GPSstatus1: source[i]["GPSstatus1"],
         GPSstatus2: source[i]["GPSstatus2"],
         Status1: source[i]["Status1"],
         Status2: source[i]["Status2"],
         ReportingTime1: source[i]["ReportingTime1"],
         ReportingTime2: source[i]["ReportingTime2"],
         TotalBurst1: source[i]["TotalBurst1"],
         TotalBurst2: source[i]["TotalBurst2"],
     };
     arrayToInsert.push(oneRow);
 }
 
 model.insertMany(arrayToInsert, (err, result) => {
     if (err) console.log(err);
     if(result){
         console.log("Import CSV into database successfully.");
     }
 });
});
 }

}
});
  process.exit();
  });
}






