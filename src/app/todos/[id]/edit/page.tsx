import EditTodoForm from "./editTodoForm";

export default async function EditTodoPage({
  params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    { cache: "no-store" }
  );
  const todo = await res.json();

  return <EditTodoForm todo={todo} />;
}
