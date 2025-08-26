"use client";

import { useState, useEffect } from "react";

type TodoFormProps = {
  initialTitle?: string;
  initialCompleted?: boolean;
  onSubmit: (todo: { title: string; completed: boolean }) => Promise<void> | void;
  buttonLabel?: string;
};

export default function TodoForm({
  initialTitle = "",
  initialCompleted = false,
  onSubmit,
  buttonLabel = "Save",
}: TodoFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [completed, setCompleted] = useState(initialCompleted);

  // لو عايزة تعملي إعادة ضبط عند تغير الـ props (مفيد في edit)
  useEffect(() => {
    setTitle(initialTitle);
    setCompleted(initialCompleted);
  }, [initialTitle, initialCompleted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, completed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mr-2"
        />
        <label>Completed</label>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
