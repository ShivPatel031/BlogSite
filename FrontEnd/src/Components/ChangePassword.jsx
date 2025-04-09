import { useForm } from "react-hook-form";
import { InputBox } from "../Common/InputBox";
import { KeyRound } from "lucide-react";

export function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={() => handleSubmit(onSubmit)} className="w-full max-w-[300px] mx-6 ">
        <h1 className="max-md:hidden text-2xl mb-6">Change Password</h1>
        <InputBox
          placeholder="Old Password"
          name="oldPassword"
          type="password"
          Icon={KeyRound}
          register={register}
          validation={{
            // pattern:
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            required: true,
          }}
        />

        <InputBox
          placeholder="New Password"
          name="newPassword"
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
          className="bg-gray-300 hover:bg-black hover:text-white capitalize px-5 py-3 mt-4 rounded-xl"
        >
          Change Password
        </button>
      </form>
    </>
  );
}
