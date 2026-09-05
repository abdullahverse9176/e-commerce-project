
import React from "react";
import { useForm } from "react-hook-form";

export const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (

    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow-md">
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name", {
              required: "Name is required"
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              required: "Email is required"
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: "Password is required"
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-xs italic"  >{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isSubmitting}>
          Submit
        </button>

      </form>
    </div>

  );
};

