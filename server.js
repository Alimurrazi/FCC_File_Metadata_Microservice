var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (req.file) {
    const response = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };
    res.send(response);
  } else {
    res.status(500).send("no file attachted");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
