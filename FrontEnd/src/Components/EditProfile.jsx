import { useForm } from "react-hook-form";
import { InputBox } from "../Common/InputBox";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Mail,
  Twitter,
  UserRound,
  UserRoundSearch,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { authStore } from "../Stores/authStore";
import toast from "react-hot-toast";

const socialLinksInputs = [
  { icon: Facebook, name: "facebook" },
  { icon: Github, name: "github" },
  { icon: Instagram, name: "instagram" },
  { icon: Twitter, name: "x" },
  { icon: Globe, name: "website" },
  { icon: Youtube, name: "youtube" },
];

export function EditProfile() {
  const { user, updateProfileImage ,updateProfileData} = authStore();
  const [profileImage, setProfileImag] = useState(user?.userImage);
  const [imageFile, setImageFile] = useState(null);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      userName: user?.userName || "shivpatel",
      bio: user?.bio || "",
      facebook: user?.social_links?.facebook || "https://",
      github: user?.social_links?.github || "https://",
      instagram: user?.social_links?.instagram || "https://",
      x: user?.social_links?.twitter || "https://",
      website: user?.social_links?.website || "https://",
      youtube: user?.social_links?.youtube || "https://",
    },
  });
  const handleUpldateImage = () => {
    if (!imageFile) {
      toast.error("Upload Image File.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    updateProfileImage(formData);
  };
  const onSubmit = (data) => {
    updateProfileData(data);
  };
  return (
    <>
      <section>
        <h1 className="max-md:hidden">Edit Profile</h1>
        <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
          <div className="flex flex-col justify-center items-center max-lg:w-full mb-5">
            <label
              htmlFor="uploadImg"
              className="relative block w-48 h-48  bg-gray-200 rounded-full overflow-hidden "
            >
              <img src={profileImage} alt="User Image"></img>
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                Upload Image
              </div>
              <input
                id="uploadImg"
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => {
                  let img = e.target.files[0];
                  let imgUrl = URL.createObjectURL(img);
                  setImageFile(img);
                  setProfileImag(imgUrl);
                }}
                hidden
              />
            </label>

            <button
              className="mt-5 bg-gray-200 max-lg:bg-center  px-8 rounded-full py-3 cursor-pointer"
              onClick={handleUpldateImage}
            >
              Upload
            </button>
          </div>
          <form className="w-full mx-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
              <div>
                <InputBox
                  placeholder="Full Name"
                  name="fullName"
                  type="text"
                  Icon={UserRound}
                  register={register}
                  validation={{ required: true, maxLength: 20 }}
                />
              </div>
              <div>
                <InputBox
                  placeholder="Email"
                  name="email"
                  type="email"
                  Icon={Mail}
                  register={register}
                  validation={{ required: true, maxLength: 25 }}
                />
              </div>
            </div>

            <InputBox
              placeholder="User Name"
              name="userName"
              type="text"
              Icon={UserRoundSearch}
              register={register}
              validation={{ required: true, maxLength: 20 }}
            />

            <p className="text-gray-600 -mt-2">
              Username will use to search user and will be visible to all users
            </p>
            <BioTextArea register={register} name="bio" watch={watch} />
            <p className="mt-5">Add your social handles below</p>
            <div className="md:grid md:grid-cols-2 gap-x-6">
              {socialLinksInputs.map((data, i) => (
                <InputBox
                  placeholder={`Enter ${data.name} link`}
                  name={data.name}
                  type="text"
                  Icon={data.icon}
                  register={register}
                  //   validation={{ required: true, maxLength: 20 }}
                />
              ))}
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-gray-400 rounded-full hover:bg-black hover:text-white mt-10"
            >
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function BioTextArea({ register, name, watch }) {
  let characterLimit = 200;

  return (
    <>
      <textarea
        maxLength={characterLimit}
        {...register(name)}
        placeholder="Enter Blog Description"
        className="h-40 resize-none leading-7 bg-gray-100 focus:bg-gray-50 ring-offset-purple-400 rounded-2xl my-2 p-4 w-full mt-4"
      ></textarea>
      <p className="text-right">
        {characterLimit - watch(name).length} character left
      </p>
    </>
  );
}
