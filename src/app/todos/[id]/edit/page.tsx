import EditTodoForm from "./editTodoForm";
interface PageProps {
    params: Promise<{ id: string }>;
  }
export default async function EditTodoPage({
  params,
}: PageProps) {
    const { id } = await params;
    
    const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    { cache: "no-store" }
  );
  const todo = await res.json();

  return <EditTodoForm todo={todo} />;
}
