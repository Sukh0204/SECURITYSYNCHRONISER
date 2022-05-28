const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost/shivmandir");

const db=mongoose.connection;
db.on('error', console.error.bind( console, 'error connecting'));
db.once('open', function(){
    console.log('Successful');
});