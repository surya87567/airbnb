// Core Module
const path = require('path');
const mongoose=require('mongoose');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
//const {mongoConnect} = require('./utils/databaseUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;

const MONGO_URL = "mongodb+srv://root:root@cluster0.8y68az1.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URL).then(()=>{
  console.log('Connected to mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err=>{
  console.log('Error while connecting to mongo:',err);
})