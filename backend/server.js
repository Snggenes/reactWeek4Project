const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const carsRouter = require("./routes/cars.js");
const registerRouter = require('./routes/registerRouter.js')
const loginRouter = require('./routes/loginRouter.js')
const profileRouter = require('./routes/profileRouter.js')
const logoutRouter = require('./routes/logoutRouter.js')
const carRouter = require('./routes/carRouter.js')
const trialRouter = require('./routes/trialRouter.js')
const favouritesRouter = require('./routes/favouritesRouter.js')
const mycarsRouter = require('./routes/mycarsRouter.js')
const myFavouritesRouter = require('./routes/myFavouritesRouter.js')
const searchRouter = require('./routes/searchRouter.js')
const getByFuel = require('./routes/getByFuel.js')
const getByBody = require('./routes/getByBody.js')
const getMostExpensive = require('./routes/getMostExpensive.js')
const chatRouter = require('./routes/chatRouter.js')

const app = express();
const cors = require("cors");

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("open", () => {
  console.log("connected to database");
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/cars", carsRouter);
app.use('/profile', profileRouter)
app.use('/logout', logoutRouter)
app.use('/car', carRouter)
app.use('/trial', trialRouter)
app.use('/favourites', favouritesRouter)
app.use('/mycars', mycarsRouter)
app.use('/myfavourites', myFavouritesRouter)
app.use('/search', searchRouter)
app.use('/fuel', getByFuel)
app.use('/body', getByBody)
app.use('/most-expensive', getMostExpensive)
app.use('/chat', chatRouter)



app.listen(8080, () => {
  console.log("server started running");
});
