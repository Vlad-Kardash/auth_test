"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Пользователя не зарегистрирован.");
        return;
      }

      router.replace("profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-xl p-6 border-t-4 border-blue-500 rounded-lg ">
        <h1 className="test-xl font-bold my-4 ">Авторизация</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded">
            Войти
          </button>
          {error && (
            <div className=" text-red-500 w-fit text-sm py-1 px-3 ">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            У вас еще нет аккаунта?
            <span className="text-blue-500 underline px-1 ">
              Зарегистрироваться
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handlSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: folse,
//       });
//       if (res.error) {
//         setError("Учетные данные необнаружены.");
//         return;
//       }
//       router.replace("/profile");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="shadow-xl p-6 border-t-4 border-blue-500 rounded-lg ">
//         <h1 className="test-xl font-bold my-4 ">Авторизация</h1>
//         <form onSubmit={handlSubmit} className="flex flex-col gap-3">
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             placeholder="email"
//           />

//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="password"
//           />
//           <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded">
//             Войти
//           </button>
//           {error && (
//             <div className=" text-red-500 w-fit text-sm py-1 px-3 ">
//               {error}
//             </div>
//           )}

//           <Link className="text-sm mt-3 text-right" href={"/register"}>
//             У вас еще нет аккаунта?
//             <span className="text-blue-500 underline px-1 ">
//               Зарегистрироваться
//             </span>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }
