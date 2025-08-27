"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoTableProps {
  todos: Todo[];
}

export default function TodoTable({ todos: initialTodos }: TodoTableProps) {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const viewTodo = (id: number) => {
    router.push(`/todos/${id}`);
  };

  const editTodo = (id: number) => {
    router.push(`/todos/${id}/edit`);
  };

  const deleteTodo = async (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    await fetch(`https://68aef553b91dfcdd62badf38.mockapi.io/tasks/${id}`, {
      method: "DELETE",
    });
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await fetch(`https://68aef553b91dfcdd62badf38.mockapi.io/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      toast.success("Todo changed status successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete.id);
      toast.success("Todo deleted successfully!");
      setTodoToDelete(null);
    }
  };

  return (
    <div className="container mx-auto text-center my-5">
      <div className="flex justify-center mb-4">
        <Link
          href="/todos/add"
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
        >
          ADD NEW TASK +
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500 py-20 text-lg">No data found</p>
      ) : (
        <table className="mt-10 border border-gray-300 mx-auto w-1/2 ">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="p-3">Task</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="border-t border-gray-300  hover:bg-gray-100 cursor-pointer text-center"
              >
                <td className="flex p-3 gap-2 rounded-lg text-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                  />
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.title}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className=" text-white px-4 py-2 "
                    onClick={() => viewTodo(todo.id)}
                  >
                    <i className="fas fa-eye text-green-500"></i>
                  </button>
                  <button
                    className=" text-white px-4 py-2"
                    onClick={() => editTodo(todo.id)}
                  >
                    <i className="fas fa-edit text-blue-500"></i>
                  </button>
                  <button
                    className=" text-white px-4 py-2 "
                    onClick={() => setTodoToDelete(todo)}
                  >
                    <i className="fas fa-trash text-red-500"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {todoToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md max-w-sm w-full">
            <p className="mb-4">Are you sure you want to delete this task</p>
            <div className="flex justify-end gap-4 py-5">
              <button
                onClick={() => setTodoToDelete(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
}
