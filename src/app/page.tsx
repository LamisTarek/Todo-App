"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4">
      
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Welcome to Todo List App
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Organize your tasks, stay productive, and never miss a thing. 
          Your personal todo list, right at your fingertips.
        </p>

        <Link
          href="/todos"
          className="inline-block bg-white text-purple-600 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          View My Todos
        </Link>
      </div>

      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-30 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"></div> */}

      <footer className="mt-12 text-gray-200 text-sm text-center z-10">
        &copy; {new Date().getFullYear()} Todo List App. All rights reserved.
      </footer>
    </div>
  );
}
