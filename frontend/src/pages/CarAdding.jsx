import React, { useState } from "react";
import AddCar from "../components/AddCar";
import { IoCheckmarkSharp } from "react-icons/io5";
import Heading from "../components/Heading.jsx";

export default function CarAdding() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="bg-white shadow-md p-8 mx-auto">
        {!isOpen && <Heading title="Sell Your Car on FromOwner" />}
        {!isOpen ? (
          <div className="pl-6">
            <p className="text-lg text-gray-700 mb-4 mt-2">
              Welcome to FrowOwner! We make it easy for you to sell your car and
              connect with potential buyers. Here's why you should choose
              FrowOwner for selling your car:
            </p>
            <div className="flex items-center gap-2 mb-4">
              <IoCheckmarkSharp className="text-green-500" />
              <p className="text-lg text-gray-600">
                It's completely free to list your car
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <IoCheckmarkSharp className="text-green-500" />
              <p className="text-lg text-gray-600">
                Reach millions of potential buyers
              </p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <IoCheckmarkSharp className="text-green-500" />
              <p className="text-lg text-gray-600">
                Boost your sales with our promotional packages
              </p>
            </div>
            <p className="text-lg text-gray-700">
              Ready to sell your car? Click here to start the process!
            </p>
            <button onClick={handleClick} className='relative rounded-md transition bg-red-400 p-2 text-white mt-3'>
              Get Started!
          </button>
          </div>
        ) : (
          <p></p>
        )}

        {isOpen && <AddCar isOpen={isOpen} handleClick={handleClick} />}
      </div>
    </div>
  );
}
