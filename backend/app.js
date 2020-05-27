const express = require ('express');

const bodyParser = require("body-parser");
//node express package ( express midleware)
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");


const app = express();
// if you got error cyclic dependency is detected (bug with mongoose) remove ?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://ekreely:ekreely@cluster0-sduvz.mongodb.net/salma?retryWrites=true&w=majority"
,{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
  console.log('connected to database!');
})

.catch(()=>{
  console.log('connection failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false } ));

//cors prob
app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS ");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);






 module.exports = app;
