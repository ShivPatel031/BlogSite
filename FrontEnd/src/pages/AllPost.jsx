import { PostCard,Container } from "../component/index.js";
import { useEffect ,useState} from "react";

function AllPost()
{
    const [posts,setPosts] = useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        
    })
    return(
        <div className=" w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts && posts.map((post)=>(
                        <div key={post.index} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export {AllPost}