import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm(); // you can use validation form with `useForm` before, install `react-hook-form` and import then you can use that

  const delay = (d) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, d * 1000);
    });
  };
  const onSubmit = async (data) => {
    await delay(2); // simulating network delay

    // let r = await fetch("http://localhost:3000/", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });

    // let res = await r.text();
    console.log(data);

    // if (data.username !== "anas") {
    //   setError("myform", {
    //     message:
    //       "Your form is not in good order because credentials is invalid",
    //   });
    // }
    // if (data.username === "mirza") {
    //   setError("blocked", {
    //     message: "Sorry this user is blocked",
    //   });
    // }
  };

  return (
    <>
      <div className="container">
        {isSubmitting && <div className="">Loading...</div>}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="username"
            {...register("username", {
              required: { value: true, message: "this field is required" },
              minLength: { value: 3, message: "min length is 3" },
              maxLength: { value: 8, message: "max length is 8" },
            })}
            type="text"
          />
          {errors.username && (
            <div className="red">{errors.username.message}</div>
          )}

          <input
            placeholder="password"
            {...register("password", {
              minLength: { value: 7, message: "min length of password is 7" },
              required: { value: true, message: "this field is required" },
            })}
            type="password"
          />
          {errors.password && (
            <div className="red">{errors.password.message}</div>
          )}
          <input disabled={isSubmitting} type="submit" value="Submit" />
          {errors.myform && <div className="red">{errors.myform.message}</div>}
          {errors.blocked && (
            <div className="red">{errors.blocked.message}</div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
