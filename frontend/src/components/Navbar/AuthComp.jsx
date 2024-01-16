import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../../context/userContext.jsx";
import { toast } from "react-toastify";

export default function AuthComp({ menuOpen, toggleMenu }) {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    toast(data.message);
    setUser(null);
    navigate("/");
  };

  const openCarAdding = () => {
    if (!user) {
      toast("Login First");
      return navigate("/login");
    }
    navigate("/caradding");
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col md:flex-row items-center gap-2">
        {user ? (
          <>
            <Link
              to={`chat`}
              className="ml-4 text-gray-600 hover:text-gray-800"
            >
              Chat
            </Link>
            <Link
              to={`mycars`}
              className="ml-4 text-gray-600 hover:text-gray-800"
            >
              My cars
            </Link>
            <Link
              to={`myfavourites`}
              className="ml-4 text-gray-600 hover:text-gray-800"
            >
              My favourites
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 text-gray-600 hover:text-gray-800 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="ml-4 text-gray-600 hover:text-gray-800"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="ml-4 text-gray-600 hover:text-gray-800  py-2 rounded"
            >
              Login
            </Link>
          </>
        )}
        <div
          className="border rounded-md shadow-sm p-2 cursor-pointer bg-red-400 text-white hover:bg-red-600"
          onClick={openCarAdding}
        >
          Sell your car!
        </div>
      </div>
    </div>
  );
}
