const net = require("net");
var fs = require("fs");
var path = require('path');
var process= require('process');
const res = require("express/lib/response");

module.exports.send= function(req, res){
    //add a delay- settimeout 
  
    var moveFrom = "./public/uploads";
    var moveTo = "./public/sent";
    
    fs.readdir(moveFrom, function (err, files) {
        if (err) {
          console.error("Could not list the directory.", err);
          process.exit(1);
        }
        files.forEach(function (file, index) {
            // Make one pass and make the file complete
            var fromPath = path.join(moveFrom, file);
            var server;
            var istream = fs.createReadStream(fromPath);
            var toPath = path.join(moveTo, file);
    
            server = net.createServer(function(socket){  
              //pipe reads data from a readable stream and write it to a writeable stream              
                socket.pipe(process.stdout);
                istream.on("readable", function () {
                  //this also wruting data?
                  // why both pipe and write function
                    let data;
                    while (data = this.read()) {
                        socket.write(data);
                    }
                    //write ho gaya toh shift the file to sent folder
                    fs.rename(fromPath, toPath, function (error) {
                        if (error) {
                          console.error("File moving error.", error);
                        } else {
                          console.log("Moved file '%s' to '%s'.", fromPath, toPath);
                        }
                      });
                })
                // istream.on("end", function(){
                //   intervalFunc=function(){
                //     console.log("connection ended");
                //     socket.end();}
                //     setInterval(intervalFunc, 2000);
                // })
                socket.on("end", () => {
                    server.close(() => { console.log("\nTransfer is done!") });
                })
                server.on("err", function(){
                    console.log(`Error: ${err}`);
                })
                
                
            });
            server.on('listening',function(err){
              if(err){
                console.log(`Error in Listening to Data : ${err}`);
              }
              console.log('ok, server is running');
            });
            server.on('error', (e) => { 
              console.log("Errorrrrrr");
              if (e.code === 'EADDRINUSE') { 
                console.log('Address in use, retrying...'); 
                setTimeout(() => { 
                  server.close(); 
                  server.listen(8000, "localhost"); 
                }, 1000); 
              } 
              else { 
                console.log("Server failed.") 
              } 
            });

            server.on('error', (e) => { 
              console.log("Errorrrrrr");
              if (e.code === 'ECONNRESET') { 
                console.log('Connection closed but still trying to send info'); 
                setTimeout(() => { 
                  server.close(); 
                  server.listen(8000, "localhost"); 
                }, 1000); 
              } 
              else { 
                console.log("Can't send or recieve info right now.") 
              } 
            });
            server.listen(8000, '0.0.0.0');
          res.redirect('/');
          // show a msg?? 
          // data is synced add new file?? 
          // or that the system is offline re try later
          // or that the system is offline but data queued ti be synced when system is online
          //show a progress bar with % synced??
     });
     
})
}