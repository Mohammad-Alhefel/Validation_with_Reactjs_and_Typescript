import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.css";
const App = () => {
  // Zod Library
  const signupSchema = z
    .object({
      first_name: z.string().min(1, { message: "Fisrt Name is Required" }),
      last_name: z.string().min(1, { message: "Last Name is Required" }),
      email: z
        .string()
        .min(1, { message: "Email is Required" })
        .email({ message: "Not Valid Email" }),
      password: z
        .string()
        .min(6, { message: "Password Must Be At Least 6 Chars" })
        .max(20, { message: "Password Must Be At Most 20 Chars" }),
      confirm_password: z
        .string()
        .min(6, { message: "Confirm Password Must Be At Least 6 Chars" })
        .max(20, { message: "Confirm Password Must Be At Most 20 Chars" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Password Doesn't Match",
      path: ["conconfirm_password"],
    });
  // For Typescript
  type tSignup = z.infer<typeof signupSchema>;
  // React Hook Form Library
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<tSignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<tSignup> = ({
    first_name,
    last_name,
    email,
    password,
  }) => {
    const user = {
      first_name,
      last_name,
      email,
      password,
    };
    reset();
    console.log(user);
  };
  return (
    <>
      <h2>Create An Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter First Name :"
          {...register("first_name")}
        />
        {errors.first_name && (
          <span
            style={{
              color: "red",
              display: "block",
              margin: "10px 0",
              fontSize: "15px",
            }}
          >
            {errors.first_name.message}
          </span>
        )}
        <input
          type="text"
          placeholder="Enter Last Name :"
          {...register("last_name")}
        />
        {errors.last_name && (
          <span
            style={{
              color: "red",
              display: "block",
              margin: "10px 0",
              fontSize: "15px",
            }}
          >
            {errors.last_name.message}
          </span>
        )}
        <input
          type="email"
          placeholder="Enter Your Email :"
          {...register("email")}
        />
        {errors.email && (
          <span
            style={{
              color: "red",
              display: "block",
              margin: "10px 0",
              fontSize: "15px",
            }}
          >
            {errors.email.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Enter Your password :"
          {...register("password")}
        />
        {errors.password && (
          <span
            style={{
              color: "red",
              display: "block",
              margin: "10px 0",
              fontSize: "15px",
            }}
          >
            {errors.password.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Enter Your confirm password :"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <span
            style={{
              color: "red",
              display: "block",
              margin: "10px 0",
              fontSize: "15px",
            }}
          >
            {errors.confirm_password.message}
          </span>
        )}
        <button disabled={isSubmitting} type="submit">
          SignUp
        </button>
      </form>
    </>
  );
};

export default App;
