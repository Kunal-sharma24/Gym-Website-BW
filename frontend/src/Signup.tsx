import React from "react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-80 p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Create an Account</h2>
        <p className="text-gray-700 dark:text-gray-200 text-lg">Join us and start your fitness journey</p>

        <form className="mt-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
