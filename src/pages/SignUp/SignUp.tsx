import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const SignUp = () => {
  const signUpSchema = z
    .object({
      first_name: z.string().min(1, { message: "First Name is Required" }),
      last_name: z.string().min(1, { message: "Last Name is Required" }),
      email: z
        .string()
        .min(1, { message: "Email is Required" })
        .email({ message: "Not Valid Email" }),
      password: z
        .string()
        .min(6, { message: "Password Must Be At Least 6 Characters" })
        .max(20, { message: "Password Must Be At Most 20 Characters" }),
      confirm_password: z
        .string()
        .min(6, { message: "Confirm Password Must Be At Least 6 Characters" })
        .max(20, { message: "Confirm Must Be At Most 20 Characters" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Password Doesn't Match With Confirm Password",
      path: ["confirm_password"],
    });
  type TSignUp = z.infer<typeof signUpSchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignUp>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<TSignUp> = ({
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
    <div>
      <h2>Create An Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter Your First Name :"
          {...register("first_name")}
        />
        {errors.first_name && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.first_name.message}
          </span>
        )}
        <input
          type="text"
          placeholder="Enter Your Last Name :"
          {...register("last_name")}
        />
        {errors.last_name && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.last_name.message}
          </span>
        )}
        <input
          type="email"
          placeholder="Enter Your Email :"
          {...register("email")}
        />
        {errors.email && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.email.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Enter Your Password :"
          {...register("password")}
        />
        {errors.password && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.password.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Confirm Your Password :"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <span style={{ display: "block", color: "red", marginBlock: "15px" }}>
            {errors.confirm_password.message}
          </span>
        )}
        <button disabled={isSubmitting} type="submit">
          Sign Up
        </button>
        <span>
          You Have An Account <Link to={"/login"}>Log in</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
