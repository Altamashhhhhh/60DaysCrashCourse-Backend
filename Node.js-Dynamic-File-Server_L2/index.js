// const fs = require("fs");
// const path = require("path");
// const express = require("express");

// const server = express();
// server.use(express.json());

// let pathname = __dirname ;

// console.log(__dirname)
// console.log(path.dirname(__filename))

// console.log(__filename)
// console.log(__dirname)

// console.log(process.cwd())

// let final =  fs.readdirSync(process.cwd())

// final.forEach((item)=>{
//     console.log(item)
// })
// console.log(final)

// server.get("/home" , (req,res)=>{

//     let currentPath = fs.readdirSync(process.cwd()) ;

//     currentPath.forEach((item)=>{
//         res.send(item)
//     })
// })

// let result = fs.statSync(__dirname)   ;
// console.log(result.isDirectory())

// let pathname = path.join(__dirname  ) ;

// // fs.mkdirSync(pathname)

// let final = fs.readdirSync(pathname)  ;
//  console.log(final)

// let check = fs.existsSync(pathname) ;

// console.log(check)

// fs.rmdirSync(pathname)




// const fs = require("fs");
// const path = require("path");
// const express = require("express");

// const app = express();
// const port = 3001;

// function generateDirectoryHtml(dir) {
//   let listHtml = `<ul style="list-style-type: none; padding: 0;">`;
//   try {
//     let items = fs.readdirSync(dir);
//     items.forEach((item) => {
//       let itemPath = path.join(dir, item);
//       if (fs.statSync(itemPath).isDirectory()) {
//         listHtml += `<li style="margin: 5px 0;"><a href="/?path=${encodeURIComponent(itemPath)}" style="text-decoration: none; color: blue;">📁 ${item}/</a></li>`;
//       } else {
//         listHtml += `<li style="margin: 5px 0;">📄 ${item}</li>`;
//       }
//     });
//   } catch (error) {
//     console.error(`Error reading directory: ${dir}`, error);
//     listHtml += `<li style="margin: 5px 0;">Error reading directory: ${dir}</li>`;
//   }

//   listHtml += `</ul>`;
//   return listHtml;
// }

// app.get("/", (req, res) => {
//   let dir = req.query.path || __dirname;
//   let directoryListing = generateDirectoryHtml(dir);

//   res.send(` ${directoryListing} `);
// });



// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}/`);
// });
