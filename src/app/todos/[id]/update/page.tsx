"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import TodoForm from "@/components/TodoForm";
import toast, { Toaster } from "react-hot-toast"; // import toast

export default function EditTodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [todo, setTodo] = useState<{
    title: string;
    completed: boolean;
  } | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setTodo({ title: data.title, completed: data.completed })
      );
  }, [id]);

  const handleUpdate = async (updated: {
    title: string;
    completed: boolean;
  }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );

    if (res.ok) {
      toast.success("Todo updated successfully!");
      router.push("/todos");
    } else {
      toast.error("Failed to update todo");
      alert("Failed to update todo");
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Todo</h1>
      <TodoForm
        initialTitle={todo.title}
        initialCompleted={todo.completed}
        onSubmit={handleUpdate}
        buttonLabel="Update Todo"
      />
      <Toaster position="top-right" />
    </div>
  );
}
