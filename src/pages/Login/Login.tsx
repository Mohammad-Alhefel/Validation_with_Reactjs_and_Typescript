import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
const Login = () => {
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email Is Required" })
      .email({ message: "Not Valid Email" }),
    password: z
      .string()
      .min(6, { message: "Password Must Be At Least 6 Characters" })
      .max(20, { message: "Password Must Be At Most 20 Characters" }),
  });
  type TLogin = z.infer<typeof loginSchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<TLogin> = ({ email, password }) => {
    const user = {
      email,
      password,
    };
    reset();
    console.log(user);
  };
  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter Your Email :"
          {...register("email")}
        />
        {errors.email && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.email.message}
          </span>
        )}
        <input
          type="text"
          placeholder="Enter Your Password :"
          {...register("password")}
        />
        {errors.password && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.password.message}
          </span>
        )}
        <button type="submit">Log in</button>
        <span>
          You Don't Have An Account <Link to={"/"}>Log in</Link>
        </span>
      </form>
    </>
  );
};

export default Login;
