"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log("Name: ", name);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Заполните все поля");
      return;
    }
    try {
      const resUser = await fetch("api/userExists", {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUser.json();
      if (user) {
        setError("Пользователь с таким email уже существует.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("Ошибка при регистрации");
      }
    } catch (error) {
      console.log("Не удалось зарегистрировать", error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-xl p-6 border-t-4 border-blue-500 rounded-lg ">
        <h1 className="test-xl font-bold my-4 ">Регистрация</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Имя"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded">
            Зарегистрироваться
          </button>
          {error && (
            <div className=" text-red-500 w-fit text-sm py-1 px-3 ">
              {/* Ошибка регистрации! */}
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Есть аккаунт?
            <span className="text-blue-500 underline px-1 ">Войти</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
