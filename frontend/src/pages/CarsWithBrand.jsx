import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "../components/Categories";
import CarBox from "../components/CarBox.jsx";
import Empty from "../components/Empty.jsx";
import Container from "../components/Container.jsx";

export default function BrandCars() {
  const { brand } = useParams();
  const brandLowerCase = brand.toLowerCase();
  const [carsToMap, setCarsToMap] = useState([]);

  const fetchCars = async () => {
    const response = await fetch(
      `http://localhost:8080/cars/${brandLowerCase}`
    );
    const data = await response.json();
    setCarsToMap(data);
  };

  useEffect(() => {
    fetchCars();
  }, [brandLowerCase]);

  const carsMap = carsToMap ? (
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
  ) : (
    <div></div>
  );

  return (
    <div>
      <Categories />
      <Container>{carsToMap.length > 0 ? carsMap : <Empty title='No Matches For The Brand!'/>}</Container>
    </div>
  );
}
