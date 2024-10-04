import { useSelector } from "react-redux";
import { PostCard,Container } from "../component/index.js";
import { useEffect ,useState} from "react";

function AllPost()
{
    const post = useSelector((state)=>state.post.posts)
    const [posts,setPosts] = useState([]);
    const [loading,setLoading]=useState(false);useEffect(() => {
        if(post && post.length>0 && post.length != posts.length)
        {
            setPosts([...post])
        }
    },[post])
    return(
        <div className=" w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts && posts.map((post)=>(
                        <div key={post.index} className='p-2 w-1/4'>
                            <PostCard key={post._id} {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export {AllPost}