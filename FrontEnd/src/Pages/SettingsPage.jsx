import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const settingsOptions = [
  {
    title: "dashboard",
    options: [
      { title: "Blogs", link: "blogs" },
      { title: "Notification", link: "notification" },
      { title: "Write", link: "write" },
    ],
  },
  {
    title: "Settings",
    options: [
      { title: "Edit Profile", link: "edit-profile" },
      { title: "change passworde", link: "change-password" },
    ],
  },
];

export function SettingsPage() {
  const [pageState, setPageState] = useState("editor profile");
  return (
    <>
      <div className="flex-1 w-full flex justify-center">
        <section className="w-full relative flex gap-10 py-10 m-0 max-md:flex-col max-w-[1200px]">
          <div className="md:hidden bg-white py-1 border-b border-gray-100 flex flex-nowrap overflow-x-auto">
            <button className="py-5 capitalize">
              <Menu className="pointer-events-auto" />
            </button>
            <button className="p-5 capitalize">{pageState}</button>
            <hr className="absolute bottom-0 duration-500" />
          </div>
          <div className="hidden md:block sticky top-[80px] z-30">
            <div className="min-w-[200px] md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-gray-200 md:border-r absolute max-md:top-[64px] max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500">
              {settingsOptions &&
                settingsOptions.length &&
                settingsOptions.map((data, i) => (
                  <div key={i} className={`mt-${i * 10}`}>
                    <h1 className="text-xl text-gray-800 capitalize ">{data.title}</h1>
                    <hr className="border-gray-100 mb-4 flex flex-col" />
                    <div className="flex flex-col">
                      {data.options &&
                        data.options.length &&
                        data.options.map((op, i) => (
                          <NavLink
                            to={op.link}
                            className={({ isActive }) =>
                              `py-4 px-3 capitalize ${isActive ? "bg-black/20  border-r-2" : " text-gray-600"}`
                            }
                          >
                            {op.title}
                          </NavLink>
                        ))}
                    </div>
                  </div>
                ))}

              {/* <NavLink onClick={() => setPageState("blogs")}>Blogs</NavLink>
              <NavLink>Notification</NavLink>
              <NavLink>Write</NavLink>

              <h1 className="text-xl text-gray-600 mb-3 mt-5">Settings</h1>
              <hr className="border-gray-100 -ml-6 mb-8 mr-6" />
              <NavLink>Edit Profile</NavLink>
              <NavLink>change password</NavLink> */}
            </div>
          </div>
          <div className="max-md:-mt-8 mt-5 w-full">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}
