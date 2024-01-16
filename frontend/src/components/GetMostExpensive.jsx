import React, { useEffect, useState } from "react";
import CarBox from "./CarBox.jsx";
import Container from "./Container.jsx";

export default function MostExpensiveCars() {
  const [expensiveCars, setExpensiveCars] = useState([]);

  const fetchMostExpensiveCars = async () => {
    try {
      const response = await fetch("http://localhost:8080/most-expensive");
      const data = await response.json();
      setExpensiveCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchMostExpensiveCars();
  }, []);

  const carsMap = expensiveCars.map((car) => (
    <CarBox
      key={car._id}
      id={car._id}
      poster={car.poster}
      brand={car.brand}
      model={car.model}
      price={car.price}
    />
  ));

  return (
    <Container>
      {expensiveCars.length > 0 ? carsMap : <p>No expensive cars found.</p>}
    </Container>
  );
}
