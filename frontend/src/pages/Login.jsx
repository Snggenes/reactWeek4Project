import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import Heading from "../components/Heading";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const resData = await response.json();
      toast(resData.message);

      if (response.ok) {
        setUser(resData.user);
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }

    reset();
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="relative border shadow-lg p-4">
        <Heading
          title="Login"
          subtitle="Welcome to YourOwner"
          secondSubtitle="Please login"
          center
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 p-4"
        >
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
            autoComplete="current-email"
            className={`outline-none w-full p-4 font-light rounded-md transition disabled:opacity-70 border ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={`outline-none w-full p-4 font-light rounded-md transition disabled:opacity-70 border ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md transition bg-red-400 w-full py-2 text-white ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
