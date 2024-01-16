import React, { useState, useEffect } from "react";
import CarBox from "../components/CarBox";
import Container from "../components/Container.jsx";
import Categories from "../components/Categories.jsx";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/search/${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm.length >= 2) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Categories />
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          className="p-2 border w-1/3 border-gray-300 rounded-md focus:outline-none focus:border-red-400"
        />
      </div>
      <Container>
        {searchResults.map((car) => (
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
    </div>
  );
};

export default SearchComponent;
