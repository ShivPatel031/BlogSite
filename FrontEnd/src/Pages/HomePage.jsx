import { TrendingUp } from "lucide-react";
import { InPageNavigation } from "../Components/InPageNavigation";
import { TrandingBlog } from "../Components/Tranding";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
const interests = [
  "programming",
  "hollywood",
  "film making",
  "social media",
  "cooking",
  "tech",
  "finances",
  "travel",
];

export function HomePage() {
  let routes = [];
  const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
  const [pageState, setPageState] = useState("home");

  if (isSmallScreen) {
    routes = [...routes,pageState, "trending"];
  } else {
    routes = [...routes,pageState];
  }

  const handleTagClick = (topic) => {
    if (topic === pageState) {
      setPageState("home");
    } else {
      setPageState(topic);
    }
  };
  return (
    <section className="w-screen flex-1 flex justify-center gap-10">
      <div className="w-full max-w-[1350px] md:flex px-10">
        <div className="lg:w-3/4 w-full">
          <InPageNavigation routes={routes}></InPageNavigation>
        </div>
        {!isSmallScreen && (
          <div className=" w-1/4 min-w-[40%] lg:min-w-[400px] max-w-min border-l border-gray-200 pl-8 pt-3 md:block hidden ml-3">
            <div className="flex flex-col gap-2 mb-5">
              <h1 className="font-medium text-lg mb-3 capitalize">
                Stories form all interests
              </h1>
              <div className="flex flex-wrap gap-2">
                {interests.map((data, i) => (
                  <button
                    key={i}
                    className={`px-5 py-2 ${
                      pageState === data ? "bg-black text-white" : "bg-gray-200"
                    } rounded-full cursor-pointer capitalize`}
                    onClick={() => handleTagClick(data)}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <h1 className="font-medium text-lg mb-3 capitalize flex gap-2 items-center">
                Tending <TrendingUp className="w-6 h-6" />
              </h1>
              <TrandingBlog />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
