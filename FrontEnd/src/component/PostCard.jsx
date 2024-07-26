import { Link } from "react-router-dom";

function PostCard(
    {_id,title,coverImage}
){

    return(
        <Link to={`/post/${_id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={coverImage} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export {PostCard};