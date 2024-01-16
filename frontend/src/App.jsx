import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import { UserContextProvider } from "../context/userContext.jsx";
import CarsWithBrand from "./pages/CarsWithBrand.jsx";
import CarWithId from "./pages/CarWithId.jsx";
import CarAdding from './pages/CarAdding.jsx'
import GetAllCars from "./pages/GetAllCars.jsx";
import Search from "./pages/Search.jsx";
import MyCars from "./pages/MyCars.jsx";
import MyFavourites from "./pages/MyFavourites.jsx";
import Chat from "./pages/Chat.jsx";
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <UserContextProvider>
      <ToastContainer autoClose={2500} position="top-center" theme="light"/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<GetAllCars />} />
        <Route path="/cars/:brand" element={<CarsWithBrand />} />
        <Route path="/car/:id" element={<CarWithId />} />
        <Route path="/caradding" element={<CarAdding />} />
        <Route path="/mycars" element={<MyCars />} />
        <Route path="/myfavourites" element={<MyFavourites />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </UserContextProvider>
  );
}
