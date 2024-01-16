import React, { useEffect, useState } from "react";
import CarBox from "../components/CarBox.jsx";
import Container from "../components/Container.jsx";

export default function GetAllCars() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFunc = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cars?page=${page}&limit=12`
      );
      const data = await response.json();

      const shuffledCars = [...data];
      for (let i = shuffledCars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCars[i], shuffledCars[j]] = [shuffledCars[j], shuffledCars[i]];
      }

      setCars(shuffledCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchFunc(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleGoBack = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cars.map((car) => (
          <CarBox
            key={car._id}
            id={car._id}
            poster={car.poster}
            brand={car.brand}
            model={car.model}
            price={car.price}
          />
        ))}
      </Container>
      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={handleGoBack}
          className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Go Back
        </button>
        <button
          onClick={handleLoadMore}
          className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
