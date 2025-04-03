import { TrendingUp } from "lucide-react";
import { InPageNavigation } from "../Components/InPageNavigation";
import { TrandingBlog } from "../Components/Tranding";
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
  return (
    <section className="w-screen flex-1 flex justify-center gap-10">
      <div className="w-full max-w-[1350px] md:flex">
        <div className="w-3/4">
          <InPageNavigation routes={["latest", "trending"]}></InPageNavigation>
        </div>
        <div className=" w-1/4 min-w-[40%] lg:min-w-[400px] max-w-min border-l border-gray-200 pl-8 pt-3 md:block hidden ml-3">
          <div className="flex flex-col gap-2 mb-5">
            <h1 className="font-medium text-lg mb-3 capitalize">
              Stories form all interests
            </h1>
            <div className="flex flex-wrap gap-2">
              {interests.map(data=><button className="px-5 py-2 bg-gray-200 rounded-full">{data}</button>)}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            <h1 className="font-medium text-lg mb-3 capitalize flex gap-2 items-center">
              Tending <TrendingUp className="w-6 h-6" />
            </h1>
            <TrandingBlog />
          </div>
        </div>
      </div>
    </section>
  );
}
