import { IoCarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    console.log("Form Submitted:", data);
    // Add your API submission logic here
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IoCarOutline className="w-auto h-10 mx-auto" />
        <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
          Create new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-900 text-sm/6"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                type="text"
                className={`block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm outline outline-2 outline-inset ${
                  errors.name ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-400 focus:outline-2 focus:outline-inset ${
                  errors.name ? "focus:outline-red-500" : "focus:outline-black"
                } sm:text-sm/6`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className={`block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm outline outline-2 outline-inset ${
                  errors.email ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-400 focus:outline-2 focus:outline-inset ${
                  errors.email ? "focus:outline-red-500" : "focus:outline-black"
                } sm:text-sm/6`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className={`block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm outline outline-2 outline-inset ${
                  errors.password ? "outline-red-500" : "outline-gray-300"
                } placeholder:text-gray-400 focus:outline-2 focus:outline-inset ${
                  errors.password
                    ? "focus:outline-red-500"
                    : "focus:outline-black"
                } sm:text-sm/6`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-gray-500 text-sm/6">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:text-black/70"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
