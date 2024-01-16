import React, { useEffect, useState } from "react";
import Empty from "./Empty.jsx";
import CarBox from "./CarBox.jsx";
import Container from "./Container.jsx";

export default function CarsWithType({ type }) {
  const typeLowerCase = type.value.toLowerCase();
  const [carsToMap, setCarsToMap] = useState([]);

  const fetchCars = async () => {
    const response = await fetch(`http://localhost:8080/${type.type}/${typeLowerCase}`);
    const data = await response.json();
    setCarsToMap(data);
  };
  useEffect(() => {
    fetchCars();
  }, [typeLowerCase]);

  const carsMap = carsToMap && (
    carsToMap.map((car) => {
      return (
        <CarBox
          key={car._id}
          id={car._id}
          poster={car.poster}
          brand={car.brand}
          model={car.model}
          price={car.price}
        />
      );
    })
  );

  return (
    <Container>
      {carsToMap.length > 0 ? carsMap : <Empty title='No Matches'/>}

    </Container>
    
  );
}
