// Core Module
const path = require('path');
const mongoose = require('mongoose');

// External Module
const express = require('express');
const cookieParser = require('cookie-parser');

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Body parser
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Static files (should come BEFORE protected routes)
app.use(express.static(path.join(rootDir, 'public')));

// Middleware to check login status
app.use((req, res, next) => {
  req.isLoggedIn = req.cookies.isLoggedIn === "true";
  next();
});

// Routers
app.use(authRouter);
app.use(storeRouter);

// Protect host routes
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) next();
  else res.redirect("/login");
});

app.use("/host", hostRouter);

// Error page
app.use(errorsController.pageNotFound);

const PORT = 3000;

const MONGO_URL = "mongodb+srv://root:root@cluster0.8y68az1.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to mongo');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error while connecting to mongo:', err);
  });
