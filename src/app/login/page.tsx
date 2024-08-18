"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Cookies from "js-cookie";

import apiClient from "../axiosConfig";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await apiClient.post("/auth", data);
      Cookies.set("token", response.data.token, { expires: 3 });
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-3 text-center text-yellow-500">
          Login
        </h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            {...register("username", { required: true })}
            className="w-full p-2 border border-yellow-300 rounded text-black"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-2 border border-yellow-300 rounded text-black"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
