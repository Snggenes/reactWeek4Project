import React, { useEffect, useState } from "react";
import CarBox from "../components/CarBox.jsx";
import Empty from "../components/Empty.jsx";
import Container from "../components/Container.jsx";
import { useUserContext } from "../../context/userContext.jsx";

export default function MyCars() {
  const { user } = useUserContext();
  const [cars, setCars] = useState([]);

  const fetchFunc = async () => {
    const response = await fetch(`http://localhost:8080/mycars/${user._id}`);
    const data = await response.json();
    setCars(data);
  };

  useEffect(() => {
    fetchFunc();
  }, [user]);

  const carsMap =
    cars?.length > 0 ? (
      <Container>
        {cars.map((car) => {
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
        })}
      </Container>
    ) : (
      <div>
        <Empty
          title="You Do Not Have Any Cars!!"
          subtitle="Click To Sell Your Car"
        />
      </div>
    );

  return <div>{carsMap}</div>;
}
