import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Heading from "../components/Heading.jsx";
import Heart from "../components/Heart.jsx";
import { useUserContext } from "../../context/userContext.jsx";

export default function CarWithId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [owner, setOwner] = useState(null);
  const { user } = useUserContext();

  const fetchCar = async () => {
    const response = await fetch(`http://localhost:8080/car/${id}`);
    const data = await response.json();
    setCar(data);
    const response2 = await fetch(`http://localhost:8080/profile/user/${id}`);
    const data2 = await response2.json();
    setOwner(data2);
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  const handleButtonClick = async () => {
    const response = await fetch(`http://localhost:8080/chat/create-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participant1: owner._id,
        participant2: user?._id,
      }),
    });
    const data = await response.json();
    console.log(data);
    navigate("/chat");
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className=" max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <Heading title={car?.brand.toUpperCase()} subtitle={car?.model} />
            <div className="w-full lg:h-[60vh] overflow-hidden rounded-xl relative">
              <img src={car?.poster} className="object-cover w-full" />
              <div className="absolute top-5 right-5">
                <Heart id={car?._id} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                  <div>Hosted By {owner?.username}</div>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                  <div>{car?.year}</div>
                  <div>{car?.body}</div>
                  <div>{car?.fuel}</div>
                  <div>${car?.price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="p-3 shadow-xl rounded-lg bg-red-400 text-white mt-3"
          onClick={handleButtonClick}
        >
          Contact With The Owner!
        </button>
      </div>
    </div>
  );
}
