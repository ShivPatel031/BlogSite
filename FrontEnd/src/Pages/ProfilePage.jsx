import { AboutUser } from "../Components/AboutUser";
import { authStore } from "../Stores/authStore";

export function ProfilePage() {
  const { user } = authStore();
  console.log(user);
  return (
    <div className="flex-1 flex justify-center">
      <section className=" max-w-[1224px] md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 ">
        <div className="flex flex-col max-md:items-center gap-5 min-w-[250px">
          <img
            src={user.userImage}
            className="w-48 h-48 bg-gray-200 rounded-full md:w-32 md:h-32"
          />
          <h1 className="text-2xl font-medium">@{user.userName}</h1>
          <p className="text-xl capitalize h-6">{user.userName}</p>
          {user.noOfBlogs && user.noOfReads && <p>blogs - readers</p>}
          <button className="px-5 py-2 mt-2 bg-gray-200 hover:bg-black hover:text-white rounded-xl">
            Edit Profile
          </button>
        </div>
        <AboutUser className="max-md:hidden" bio={user} />
      </section>
    </div>
  );
}
