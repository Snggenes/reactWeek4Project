import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Heading from '../components/Heading.jsx'

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const resData = await response.json();

      if (response.ok) {
        toast("Registration successful! Please log in.");
        navigate("/login");
      } else {
        toast(resData.message || "Registration failed");
      }
    } catch (error) {
      toast("An error occurred. Please try again later.");
    }

    reset();
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="relative border shadow-lg p-4">
        
        <Heading center title='Register' subtitle='Welcome to FrowOwner' secondSubtitle='Please Register'/>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 p-4"
        >
          <input
            {...register("username", {
              required: "Please enter your username",
            })}
            type="text"
            autoComplete="current-username"
            placeholder="Username"
            className={`outline-none w-full p-4 font-light rounded-md transition disabled:opacity-70 border ${
              errors.username ? "border-red-500" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}

          <input
            {...register("email", {
              required: "Please enter your email",
            })}
            type="email"
            autoComplete="current-email"
            placeholder="Email"
            className={`outline-none w-full p-4 font-light rounded-md transition disabled:opacity-70 border ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className={`outline-none w-full p-4 font-light rounded-md transition disabled:opacity-70 border ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            type="password"
            placeholder="Confirm Password"
            autoComplete="current-password"
            className={`outline-none w-full p-4 font-light rounded-md transition disabled:opacity-70 border ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className={`relative rounded-md transition bg-red-400 w-full py-2 text-white ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer hover:underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}
