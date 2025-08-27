"use client";
import TodoForm from "@/components/TodoForm";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function EditTodoForm({ todo }: { todo: Todo }) {
  const router = useRouter();

  const handleSubmit = async (updatedTodo: {
    title: string;
    completed: boolean;
  }) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    toast.success("Todo updated!");
    router.push("/todos");
  };

  return (
    <>
      <TodoForm
        initialTitle={todo.title}
        initialCompleted={todo.completed}
        onSubmit={handleSubmit}
        buttonLabel="Update Todo"
      />
      <Toaster position="top-right" />
    </>
  );
}
