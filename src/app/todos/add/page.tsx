"use client";

import { useRouter } from "next/navigation";
import TodoForm from "@/components/TodoForm";
import toast, { Toaster } from "react-hot-toast";

export default function AddTodoPage() {
  const router = useRouter();

  const handleAdd = async (todo: { title: string; completed: boolean }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, userId: 1 }),
    });

    if (res.ok) {
      toast.success("Todo added successfully!");
      router.push("/todos");
    } else {
      toast.error("Failed to add todo");
      alert("Failed to add todo");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center mt-10">
        Add New Todo
      </h1>
      <TodoForm onSubmit={handleAdd} buttonLabel="Add Todo" />
      <Toaster position="top-right" />
    </div>
  );
}
