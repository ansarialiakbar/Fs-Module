// . To use this module, developers can call the "require()" method, which provides access to POSIX 
// functions wrapped by Node.js to enable both synchronous and asynchronous file system operations, 
// depending on the user's requirements.

// Asynchronous read 
var fs = require("fs");
// const { buffer } = require("node:stream/consumers");
console.log("Start");
fs.readFile('\input.txt', function(err, data){
    if(err){
        return console.error(err)
    }
    console.log('Asynchronous read:', data.toString());
    console.log("Other stuff");
    return data;
})
console.log("End");

// synchronous way to read a file
var data = fs.readFileSync('\input.txt')
console.log('Synchronous Read:', data.toString());
console.log("End");
console.log("Other stuff");

// ******* To read a file at low level **************
// read -> open + read

const buf = new Buffer.alloc(1024)
fs.open('\input.txt', 'r+', function(error, fd) {
    if(error){
        return console.error(error)
    }
    console.log("file open succesfully!");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
        if(err){
            return console.error(err)
        }
        // to read exact content of file
        console.log('Data:', buf.slice(0, bytes).toString());
        // we close the file so that we can't leak memory and also for security purpose
        fs.close(fd, function(er){
            if(er){
                return console.error(er)
            }
            console.log('Sucessfully file close');
        })
    } )
})

 /* Writing in the file (over write in the file)*/
 fs.writeFile('\input.txt', 'Welcome back', function(err){
     if(err){
        return console.error(err)
     }
     console.log('Success in writing file');
 })

/* To append a file */
fs.appendFile('\input.txt', 'Ali Akbar', 'utf-8', function(err){
    if(err){
        return console.error(err)
     }
     console.log('Success in appending file');
})
const data = fs.appendFileSync('\input.txt', ' to the college', 'utf8')
console.log('Sucessfully append', data);

/* deleting a file */
fs.unlink('\input.txt', function(err){
    if(err){
        return console.error(err)
    }
    console.log("sucessfuly deleted");
})