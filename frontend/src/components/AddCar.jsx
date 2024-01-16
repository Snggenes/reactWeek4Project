import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ImageUpload from "./ImageUpload.jsx";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useUserContext } from "../../context/userContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { updatedData, fuelType, carBodies } from "../../data/data.js";
import Heading from "./Heading.jsx";

export default function AddCar({ handleClick }) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [step, setStep] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    control,
    watch,
  } = useForm({
    defaultValues: {
      brand: "",
      model: "",
      price: null,
      year: null,
      fuel: null,
      body: null,
      kmstand: null,
      poster: null,
    },
  });
  const selectedBrand = watch("brand");
  const selectedBrandModels = selectedBrand ? selectedBrand.models : [];

  const onSubmit = async () => {
    const values = getValues();
    const newCar = {
      brand: values.brand.brand.toLowerCase(),
      model: values.model.value.toLowerCase(),
      fuel: values.fuel.value.toLowerCase(),
      body: values.body.value.toLowerCase(),
      price: values.price,
      year: values.year,
      kmStand: values.kmStand,
      poster: imgUrl,
      userId: user._id,
    };

    const response = await fetch("http://localhost:8080/cars", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newCar),
    });

    const resData = await response.json();
    console.log(resData._id);

    const response2 = await fetch(
      `http://localhost:8080/profile/${user._id}/${resData._id}`,
      {
        method: "POST",
      }
    );

    const resData2 = await response2.json();
    console.log(resData2);

    if (response.ok) {
      navigate("/");
      toast("You added a car");
    }
    console.log(newCar);
    setImgUrl(null);
    reset();
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="relative p-8 bg-white h-auto w-full">
        <IoMdClose
          className="cursor-pointer absolute top-4 right-4"
          onClick={handleClick}
        />
        {step ? (
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>From owner</h2>
            <h3>Lets describe your car together</h3>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Select
                  options={updatedData}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={field.value}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <Select
                  options={selectedBrandModels}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={field.value}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              name="fuel"
              control={control}
              render={({ field }) => (
                <Select
                  options={fuelType}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={field.value}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <Select
                  options={carBodies}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={field.value}
                />
              )}
              rules={{ required: true }}
            />
            <input
              {...register("price", {
                required: "Price is required",
              })}
              type="number"
              autoComplete="none"
              placeholder="Price"
              className="outline-none w-full p-2 font-light rounded-md transition disabled:opacity-70 border"
            />
            <input
              {...register("year", {
                required: "Year is required",
              })}
              type="number"
              autoComplete="none"
              placeholder="Year"
              className="outline-none w-full p-2 font-light rounded-md transition disabled:opacity-70 border"
            />
            <input
              {...register("kmStand", {
                required: "KmStand is required",
              })}
              type="number"
              autoComplete="none"
              placeholder="KmStand"
              className="outline-none w-full p-2 font-light rounded-md transition disabled:opacity-70 border"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md transition bg-red-400 w-full py-2 text-white"
            >
              Add Your Car!
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <Heading title='lets start with an image of your car' subtitle='Please upload one!'/>
            <ImageUpload setImgUrl={setImgUrl} />
            <div
              className="cursor-pointer relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md transition bg-red-400 w-full py-2 text-white text-center"
              onClick={() => {
                if (!imgUrl) {
                  return;
                }
                setStep((prev) => !prev);
              }}
            >
              Next
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
