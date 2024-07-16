const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.use(express.json());

function directoryManagement(dir) {
  let htmltags = `<ul style="list-style-type: none; padding: 0;">`;

  try {
    let items = fs.readdirSync(dir);
    items.forEach((item) => {
      let itempath = path.join(dir, item);
      if (fs.statSync(itempath).isDirectory()) {
        htmltags += `<li style="margin: 5px 0;"><a style="text-decoration:none;" href="/?path=${encodeURIComponent(
          itempath
        )}"> 📁 ${item} </a></li>`;
      } else {
       
        htmltags += `<li style="margin: 5px 0;"><a style="text-decoration:none;" href="/file?path=${encodeURIComponent(itempath)}" target="_blank"> 📄 ${item}</a></li>`;
      }
    });
  } catch (err) {
    htmltags += `<li>UNABLE TO FIND THE DIRECTORY YOU ARE REQUESTING</li>`;
  }

  htmltags += `</ul>`;
  return htmltags;
}

app.get("/", (req, res) => {
  let dir = req.query.path || __dirname;
  let dirmanagement = directoryManagement(dir);
  res.send(`
        <html>
            <body>
                ${dirmanagement}
            </body>
        </html>
    `);
});

app.get("/file", (req, res) => {
  let filePath = req.query.path;
  if (filePath) {
    let pathresolved = path.resolve(filePath);
    res.sendFile(pathresolved, (err) => {
      if (err) {
        console.error(err);
        res.status(404).send("File not found");
      }
    });
  } else {
    res.status(400).send("No file Available");
  }
});

app.use((req, res) => {
    res.status(404).send("404 Not Found");
  });

app.listen(3001, () => {
  console.log(
    "Server 3001 is running in background for directory management app"
  );
});
