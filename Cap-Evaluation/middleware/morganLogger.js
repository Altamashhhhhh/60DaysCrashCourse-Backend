const morgan = require("morgan") ;
const express = require("express") ; 
const fs = require("fs")  ; 
const path = require("path") ; 


const accessMorgan = fs.createWriteStream(path.join(__dirname , "morganLog.txt") , {flags : "a"}) ;

const morganLogger = morgan("combined" , {stream : accessMorgan} )


module.exports = morganLogger ; 
