import { Heart } from "lucide-react";
import { getDay } from "../Utility/date";
import { Link } from "react-router-dom";

export function BlogPostCard({ data, key }) {
  return (
    <Link className="flex items-center gap-8 w-full border-b border-gray-200 pb-5 mb-4">
      <div className="w-full" key={key}>
        <div className="flex gap-2 items-center mb-7">
          <img
            src={data.userId.userImage}
            alt="user image"
            className="w-8 h-8 rounded-full"
          />
          <p className="line-clamp-1">@{data.userId.userName}</p>
          <p className="min-w-fit">{getDay(data.createdAt)}</p>
        </div>
        <h1 className="font-semibold capitalize text-2xl">{data.title}</h1>
        <p className="my-3 text-lg leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {data.description}
        </p>
        <div className="flex items-center gap-5 mt-6">
          <span className="py-1 px-4 bg-gray-200 rounded-full capitalize">
            {data.tags[0]}
          </span>
          <span className="flex gap-2 text-xl items-center">
            <Heart className="w-6 h-6" />
            {data.likes.length}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square bg-gray-50">
        <img
          src={data.imageUrl}
          alr="blog banner image"
          className="w-full h-rull aspect-square object-cover "
        />
      </div>
    </Link>
  );
}
