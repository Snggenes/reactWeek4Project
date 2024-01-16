const { carModel } = require("../db/carmodel.js");
const userModel = require("../db/usermodel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");

const getCar = async (req, res) => {
  try {
    let car = await carModel.findById(req.params.id);
    if (car == null) {
      return res.json({ message: "Could not find car" });
    }
    res.json(car);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteCarById = async (req, res) => {
  try {
    await carModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "Email not found!" });
    }

    const passwordMatch = await comparePassword(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    jwt.sign(
      {
        email: foundUser.email,
        id: foundUser._id,
        username: foundUser.username,
      },
      process.env.JWT_SECRET,
      {},
      (error, token) => {
        if (error) {
          return res.json({ message: "Something went wrong" });
        }
        res.cookie("token", token).json({ message: "Welcome!" });
      }
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getLogout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 }).json({ message: "Logged out!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getProfile = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json(null);
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, result) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        const user = await userModel.findOne({ _id: result.id });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const userCarAdd = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carId = req.params.carId;

    const user = await userModel.findById(userId);
    user.cars.push(carId);
    await user.save();

    res.status(200).json({ message: "Car added to user successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const cars = await carModel.find().skip(skip).limit(limit);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarsModel = async (req, res) => {
  try {
    let cars = await carModel.find({ brand: req.params.model.toLowerCase() });
    if (cars == null) {
      return res.json({ message: "Could not find cars" });
    }
    res.json(cars);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postCars = async (req, res) => {
  try {
    const car = new carModel({
      brand: req.body.brand,
      fuel: req.body.fuel,
      body: req.body.body,
      model: req.body.model,
      price: req.body.price,
      year: req.body.year,
      kmStand: req.body.kmStand,
      poster: req.body.poster,
      owner: req.body.userId,
    });
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addFavourite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carId = req.params.carId;

    const user = await userModel.findById(userId);
    const isCarInFavourites = user.favourites.includes(carId);

    if (isCarInFavourites) {
      user.favourites = user.favourites.filter((id) => id !== carId);
    } else {
      user.favourites.push(carId);
    }

    await user.save();

    res.status(200).json({ message: "Car updated in user's favourites", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyCars = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cars = await carModel.find({ owner: userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyFavourites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    const cars = await carModel.find({ _id: { $in: user.favourites } });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSearchResults = async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const searchTermsArray = searchTerm.split(/\s+/).filter(Boolean);
    const orQuery = searchTermsArray.map((term) => ({
      $or: [
        { brand: { $regex: term, $options: "i" } },
        { model: { $regex: term, $options: "i" } },
      ],
    }));
    const searchResults = await carModel.find({
      $and: orQuery,
    });
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCarByFuel = async (req, res) => {
  try {
    const fuel = req.params.fuel;
    const cars = await carModel.find({ fuel: fuel }).limit(6);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarByBody = async (req, res) => {
  try {
    const body = req.params.body;
    const cars = await carModel.find({ body: body }).limit(6);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMostExpensive = async (req, res) => {
  try {
    const cars = await carModel.find().sort({ price: -1 }).limit(6);
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserWithCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const owner = await userModel.findOne({ cars: { $in: [carId] } });
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }
    return res.status(200).json(owner);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCar,
  postLogin,
  getLogout,
  getProfile,
  postRegister,
  getCars,
  getCarsModel,
  postCars,
  userCarAdd,
  addFavourite,
  getMyCars,
  getMyFavourites,
  getSearchResults,
  getCarByFuel,
  getCarByBody,
  getMostExpensive,
  deleteCarById,
  getUserWithCarId,
  getUser,
};
