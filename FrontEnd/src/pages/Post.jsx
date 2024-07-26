import { useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import {Button,Container} from "../component/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.withCredentials=true;

function Post(){
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=>state.auth.userData);
    function refreshPage() {
        setTimeout(()=>{
            window.location.reload();
        }, 500);
        console.log('page to reload')
    }

    const isAuthor = post && userData ? post.user===userData._id : false;

    const getSelectedPost = async(slug)=>
    {
        const response = await axios(`http://localhost:5000/api/v1/posts/single-post/${slug}`)

        if(response.data.success)
        {
            setPost(response.data.data);
        }
    }

    useEffect(()=>
    {
        if(slug)
        {
            getSelectedPost(slug);
        }
        else{
            navigate("/")
        }
    },[slug,navigate])


    const deletePost =async()=>{

        const response = await axios(`http://localhost:5000/api/v1/posts/delete-post/${post._id}`);

        console.log(response);

        if(response.data.success)
        {
            refreshPage();
            navigate('/');
        }
        
    }

    return post ? (<div className='py-8'>
        <Container>
            <div className='w-[450px] h-[600px] flex justify-center mb-4 relative border rounded-xl pt-2'>
                <img src={post.coverImage} alt="cover image" className="rounded-xl" />

                {isAuthor && (<div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post._id}`}>
                        <Button bgColor='bg-green-200' className='mr-3' text="Edit"></Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost} text="Delete"></Button>
                </div>)}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                    {parse(post.content)}
            </div>
        </Container>
    </div>):<h1>not post</h1>
}
export  {Post}