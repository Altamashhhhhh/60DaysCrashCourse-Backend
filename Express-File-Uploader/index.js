const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("./cloudinary");
const fs = require("fs");

const port = 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/upload", upload.single("file-upload"), (req, res) => {
    const filePath = req.file.path;
    
    cloudinary.uploader.upload(filePath, { resource_type: "auto" })
        .then(result => {
            fs.unlinkSync(filePath); 
            const homepath = "http://localhost:3001/"
           
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>File Upload Success</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                        .container {
                            background-color: #fff;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                            text-align: center;
                        }
                        h1 {
                            color: #333;
                            margin-bottom: 10px;
                        }
                        .link {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #333;
                            color: #fff;
                            border-radius: 4px;
                            text-decoration: none;
                            transition: background-color 0.3s ease;
                        }
                        .link:hover {
                            background-color: #555;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>File uploaded to Cloudinary:</h1> </br>  </br>
                        <a href="${homepath}" class="link"> UPLOAD AGAIN</a>
                    </div>
                </body>
                </html>
            `);
           
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Upload to Cloudinary failed.");
        });
});

app.listen(port, () => {
    console.log(`${port} is running in background`);
});
