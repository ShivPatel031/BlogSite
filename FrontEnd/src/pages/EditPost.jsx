import { useEffect,useState } from "react";
import { Container ,PostForm} from "../component/index.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";  
axios.defaults.withCredentials=true;

function EditPost(){
    const [post,setPost] = useState(null);
    const {slug}=useParams();
    const navigate = useNavigate();

    const getSelectedPost = async(slug)=>
    {
        const response = await axios(`http://localhost:5000/api/v1/posts/single-post/${slug}`)

        if(response.data.success)
        {
            setPost(response.data.data);
        }
    }

    useEffect(()=>{
        if(slug)
        {
            getSelectedPost(slug)
        }
        else
        {
            navigate("/")
        }
    },[slug,navigate])

    return post ? (<div className="py-8">
        <Container>
            <PostForm  post={post}/>
        </Container>
    </div>):null
}

export {EditPost}