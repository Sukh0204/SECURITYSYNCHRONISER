const net = require("net"), fs = require("fs"), remote_server = "169.254.162.229"; //change ip
let socket;


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
  process.exit();
  });
}

