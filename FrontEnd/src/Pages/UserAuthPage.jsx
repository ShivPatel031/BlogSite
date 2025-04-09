import { KeyRound, Mail, UserRound } from "lucide-react";
import { InputBox } from "../Common/InputBox";
import { Logo } from "../Common/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimationWrapper } from "../Common/AnimationWrapper";
import { useForm } from "react-hook-form";
import { authStore } from "../stores/authStore";
import { useEffect } from "react";

export function UserAuthPage({ type }) {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const { login, isLogging, signup, isSigning, isLogin } = authStore();
  const navigate = useNavigate();
  const from = location.state?.path || "/";
  const nav = () => {
    navigate(from, { replace: true });
  };
  useEffect(() => {
    if (isLogin) {
      nav();
    }
  }, [isLogin]);
  const onSubmit = async (data) => {
    if (type == "sign-in") {
      if (isLogging) return;
      if (data?.userName) {
        delete data.userName;
      }
      if (await login(data)) {
        nav();
      }
    } else {
      if (isSigning) return;

      if (await signup(data)) {
        navigate("/sign-in");
      }
    }
  };
  return (
    <AnimationWrapper keyValue={type}>
      <div className="flex flex-col w-screen h-screen justify-center items-center ">
        <div className="flex flex-col justify-center items-center w-full max-w-[450px] py-10  px-10 ">
          <Logo h="100" />
          <h1 className="my-10 text-4xl font-semibold">
            {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
          </h1>
          <form
            className="w-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {type == "sign-up" && (
              <InputBox
                placeholder="User Name"
                name="userName"
                type="text"
                Icon={UserRound}
                register={register}
                validation={{ required: true, maxLength: 20 }}
              />
            )}

            <InputBox
              placeholder="Email"
              name="email"
              type="email"
              Icon={Mail}
              register={register}
              validation={{ required: true, maxLength: 25 }}
            />

            <InputBox
              placeholder="Password"
              name="password"
              type="password"
              Icon={KeyRound}
              register={register}
              validation={{
                // pattern:
                //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                required: true,
              }}
            />

            <button
              type="submit"
              className="bg-black/90 text-white px-8 py-3 rounded-2xl my-6 text-lg"
            >
              {type == "sign-in"
                ? isLogging
                  ? "Sign In..."
                  : "Sign In"
                : isSigning
                ? "Sign Up..."
                : "Sign Up"}
            </button>
          </form>
          <div className="flex w-full items-center gap-2 px-12 text-gray-400">
            <hr className=" border-black/30 w-1/2" />
            <p>or</p>
            <hr className="w-1/2 border-black/30" />
          </div>
          {type == "sign-in" ? (
            <p className="my-3">
              Don't have account ?{" "}
              <Link to="/sign-up" className="text-blue-600 underline">
                Join us today.
              </Link>
            </p>
          ) : (
            <p className="my-3">
              Already a member ?{" "}
              <Link to="/sign-in" className="text-blue-600 underline">
                Sign in here.
              </Link>
            </p>
          )}
        </div>
      </div>
    </AnimationWrapper>
  );
}
