import React from "react";
import Link from "next/link";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const res = await fetch(
    `https://68aef553b91dfcdd62badf38.mockapi.io/tasks/${params.id}`,
    {
      cache: "no-store",
    }
  );
  const todo: Todo = await res.json();
  console.log(todo);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Todo Detail</h1>

      {todo ? (
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-600">ID:</span>{" "}
            <span className="text-gray-900">{todo.id}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Title:</span>{" "}
            <span className="text-gray-900">{todo.title}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-600">Completed:</span>{" "}
            {todo.completed ? (
              <span className="text-green-600 font-medium">✅ Yes</span>
            ) : (
              <span className="text-red-600 font-medium">❌ No</span>
            )}
          </p>
        </div>
      ) : (
        <p className="mt-5 text-gray-500 text-center">Loading...</p>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/todos"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition"
        >
          ⬅ Back to Todos
        </Link>
      </div>
    </div>
  );
}
