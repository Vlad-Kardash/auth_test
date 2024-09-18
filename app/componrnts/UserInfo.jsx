"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue("");
  }
  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  // const signOutUrl = process.env.NEXTAUTH_URL;
  return (
    <div className="">
      <div className=" bg-blue-100  shadow-lg p-8 flex justify-between gap-2">
        <div>
          <div>
            Имя:<span className=" font-bold ">{session?.user?.name}</span>
          </div>
          <div>
            Email:<span className=" font-bold ">{session?.user?.email}</span>
          </div>
        </div>
        <button
          href="/"
          onClick={() => signOut()}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded"
        >
          Выход
        </button>
      </div>

      <div className="grid place-items-center ">
        <h1>Список добрых дел</h1>
        <form>
          <input type="text" value={inputValue} onChange={handleChange} />
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white m-2 py-2 px-4 border border-blue-200 hover:border-transparent rounded"
            onClick={handleSubmit}
          >
            Записать
          </button>
        </form>
      </div>
      <div className="">
        <ul className="list-disc ">
          {todos.map((todo, index) => (
            <li className="flex justify-between m-5 py-2 px-4 " key={index}>
              {todo}
              <button
                className="bg-transparent  hover:bg-blue-500 text-blue-500 font-semibold hover:text-white  border border-blue-200 hover:border-transparent rounded-full px-2  "
                onClick={() => handleDelete(index)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
