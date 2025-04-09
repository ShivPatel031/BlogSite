import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function InputBox({
  type,
  placeholder,
  value,
  id,
  name,
  Icon,
  register,
  validation,
  disable = false,
  className =""
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full relative my-2">
      <input
        disable={disable}
        id={id}
        name={name}
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        defaultValue={value}
        {...register(name, { ...validation })}
        className={"bg-gray-200 w-[100%]  h-12 pl-14 text-lg focus:outline-gray-400 rounded-xl focus:bg-gray-100 text-gray-600"+className}
      />
      {Icon && <Icon className="absolute top-3 left-4 text-gray-600" />}

      {type == "password" ? (
        showPassword ? (
          <EyeOff
            className="text-gray-600 absolute top-3 right-4 cursor-pointer z-10"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="text-gray-600 absolute top-3 right-4 cursor-pointer z-10"
            onClick={() => setShowPassword(true)}
          />
        )
      ) : null}
    </div>
  );
}
