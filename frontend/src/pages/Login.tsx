import { IoCarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data); // Handle login logic here
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IoCarOutline className="w-auto h-10 mx-auto" />
        <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-900 text-sm/6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.email ? "ring-red-500" : "ring-gray-300"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-black"
                } sm:text-sm/6`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-900 text-sm/6"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.password ? "ring-red-500" : "ring-gray-300"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-black"
                } sm:text-sm/6`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-gray-500 text-sm/6">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:text-black/70"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
