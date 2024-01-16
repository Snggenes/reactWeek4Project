import React from "react";
import Categories from "../components/Categories.jsx";
import { useUserContext } from "../../context/userContext.jsx";
import CarsWithType from "../components/CarsWithType.jsx";
import Heading from "../components/Heading.jsx";
import GetMostExpensive from '../components/GetMostExpensive.jsx'
import Footer from "../components/Footer.jsx";

export default function Home() {
  const { user } = useUserContext();
  return (
    <>
      <Categories />
      <div>
        <div className="mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <Heading title="Electric Models" />
        </div>
        <CarsWithType type={{ type: "fuel", value: "electric" }} />
        <div className="mx-auto xl:px-20 md:px-10 sm:px-2 px-4 mt-6">
          <Heading title="Top Cars Available" />
        </div>
        <GetMostExpensive />
      </div>
      <Footer />
    </>
  );
}
