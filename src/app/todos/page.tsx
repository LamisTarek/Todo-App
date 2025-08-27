import TodoTable from "@/components/TodoTable";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("https://68aef553b91dfcdd62badf38.mockapi.io/tasks", {
    cache: "no-store",
  });

  return res.json();
};

export default async function TodosPage() {
  const todos = await fetchTodos();

  console.log(todos)

  return (
    <div className="container mx-auto text-center my-5">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>
      <TodoTable todos={todos} />
    </div>
  );
}
