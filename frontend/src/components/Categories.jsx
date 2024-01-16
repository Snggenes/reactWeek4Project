import React from "react";
import { categories } from "../../data/data.js";
import CategoryBox from "./CategoryBox.jsx";
import Heading from './Heading.jsx'

export default function Categories() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center shadow-md mb-4 px-14 p-4">
      <Heading title='Top brands'/>
      <div className="flex flex-row pt-4 items-center justify-between gap-8">
        {categories.map((category) => {
          return (
            <CategoryBox
              key={category.value}
              label={category.value}
              icon={category.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
