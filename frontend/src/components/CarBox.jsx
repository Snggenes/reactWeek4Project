import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Heart from "./Heart";
import { toast } from "react-toastify";

export default function CarBox({ id, poster, brand, model, price }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isMycar = currentPath === "/mycars";

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cars/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      toast("Deleted!");
      navigate(currentPath);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="col-span-1 group">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <img
            fill="true"
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={poster}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-2
            right-2
          "
          >
            <Heart id={id} />
          </div>
        </div>
        <div className="font-semibold text-lg flex gap-1">
          {brand.toUpperCase()}
        </div>
        <div className="font-light text-neutral-500">{model}</div>

        <div className="font-semibold">$ {price}</div>

        {isMycar ? (
          <button
            className="rounded-md transition bg-red-400 w-full py-1 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        ) : (
          <button
            className="rounded-md transition bg-red-400 w-full py-1 text-white hover:bg-red-600"
            onClick={() => {
              navigate(`/car/${id}`);
            }}
          >
            Explore More
          </button>
        )}
      </div>
    </div>
  );
}
