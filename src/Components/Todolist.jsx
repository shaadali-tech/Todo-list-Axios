import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axiosInstance.get("/todos");
        setTodos(res.data.slice(0, 10));
        setError("");
      } catch (err) {
        console.log(err);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) {
    return <p>Loading todos...</p>;
  }

  return (
    <>
      <h1>Todos</h1>
      {error && <p>{error}</p>}
      {!error &&
        todos.map((todo) => (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.completed ? "Completed" : "Not completed"}</p>
          </div>
        ))}
    </>
  );
};

export default Todolist;
