import { Bell, NotebookPen, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../../public/profile.png";
import { authStore } from "../Stores/authStore";
import { AnimationWrapper } from "./AnimationWrapper";

const DropDownOption = [
  { title: "Write" },
  { title: "Profile", link: "/profile/id" },
  { title: "Dashboard" },
  { title: "Settings", link: "/settings/edit-profile" },
  { title: "Log Out" },
];

function DropDownManu({ isLargeScreen }) {
  const { user } = authStore();
  const { logout } = authStore();
  const navigate = useNavigate();
  return (
    // <AnimationWrapper
    //   initial={{ y: 10 }}
    //   animate={{ y: 0 }}
    //   transition={{ duration: 1 }}
    // >
    <div className="w-34 absolute top-14 right-0 bg-gray-100 rounded-xl">
      <ul className="flex w-full flex-col justify-center my-2">
        {DropDownOption.map((data) => {
          if (isLargeScreen && data.title == "Write") return;
          return (
            <li
              className="my-1 hover:bg-gray-300 rounded-md cursor-pointer px-3 flex flex-col"
              onClick={async () => {
                if (data.title == "Log Out") {
                  if (await logout()) {
                    navigate("/");
                  }
                } else {
                  navigate(data.link);
                }
              }}
            >
              <p className={`${data.title == "Log Out" ? "text-lg" : "my-1"}`}>
                {data.title}
              </p>
              <p className={`${data.title == "Log Out" ? "text-lg" : ""}`}>
                {data.title == "Log Out" && `@${user?.userName}`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
    // </AnimationWrapper>
  );
}

export function Header() {
  const [showMenu, isShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { isLogin, user } = authStore();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // `lg` is typically 1024px

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);
  return (
    <div className="w-full h-18 flex justify-center">
      <div className="w-full max-w-[90%] flex justify-between items-center">
        <Logo h="70" />
        <div className="flex items-center gap-2">
          {isLargeScreen ? (
            <div className="relative">
              <input
                className="bg-gray-200 h-10 w-64 rounded-3xl pl-5 text-gray-600 outline-gray-300 text-lg"
                placeholder="Search ..."
                value={search}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) navigate(`/search/${search}`);
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute top-2 left-55 text-gray-500 cursor-pointer" />
            </div>
          ) : (
            <div
              className=" relative w-11 bg-gray-200 h-11 rounded-full flex justify-center items-center"
              tabIndex={0}
              // onBlur={() => setShowSearch(false)}
            >
              <Search
                className="w-7 h-7 text-gray-500 cursor-pointer"
                onClick={() => setShowSearch((curr) => !curr)}
              />

              {showSearch && (
                <div className="absolute -bottom-15 right-0">
                  <input
                    className={`bg-gray-200 h-10 w-sm rounded-3xl pl-5 text-gray-600 outline-gray-300 text-lg`}
                    placeholder="Search ..."
                    value={search}
                    onKeyDown={(e) => {
                      if (e.keyCode == 13) navigate(`/search/${search}`);
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute top-2 right-4  text-gray-500 cursor-pointer" />
                  <X
                    className="absolute -right-10 top-2 cursor-pointer"
                    onClick={() => setShowSearch(false)}
                  />
                </div>
              )}
            </div>
          )}

          {isLargeScreen && isLogin && (
            <button
              className={`px-5 flex gap-1 text-gray-600 bg-gray-200 py-2 rounded-4xl cursor-pointer mx-7`}
              onClick={() => navigate("editor")}
            >
              <NotebookPen className="w-4" />
              Write
            </button>
          )}

          {isLogin ? (
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer">
                <Bell className="w-7 h-7 rounded-full text-gray-500" />
              </div>

              <div
                className="relative"
                tabIndex={0}
                onClick={() => {
                  isShowMenu((curr) => !curr);
                }}
                onBlur={() => {
                  isShowMenu(false);
                }}
              >
                <img
                  src={user?.userImage || userImage}
                  alt="user profile image"
                  className="w-11 h-11 cursor-pointer rounded-full"
                />
                {showMenu && <DropDownManu isLargeScreen={isLargeScreen} />}
              </div>
            </div>
          ) : (
            <>
              <button
                className="px-5 flex gap-1 text-gray-700 bg-gray-200 py-2 rounded-4xl cursor-pointer hover:bg-black/90 hover:text-white"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
              {isLargeScreen && (
                <button
                  className="px-5 flex gap-1 text-gray-700 bg-gray-200 py-2 rounded-4xl cursor-pointer hover:bg-black/90 hover:text-white"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
