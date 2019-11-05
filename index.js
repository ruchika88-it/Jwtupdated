const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config=require("config");
const PORT =  3000;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = {
  login: require("./routes/login"),
  register: require("./routes/register"),
  profile: require("./routes/profile")
};
const DB_URL = `mongodb://localhost:27017/server`;

if(!config.get('jwtPrivateKey')){
  console.error('Fatal error:jwtPrivateKey is not defined');
  process.exit(1);
}
mongoose.connect(DB_URL, { useNewUrlParser: false }).then(() => {
  console.log("Connected to Database");
  }).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
  });
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
app.use("/register", routes.register);

//login
app.use("/login", routes.login);

//Profile
app.use("/profile",routes.profile);

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  
});
