import { useForm } from "react-hook-form";
import {Button,Select,RTE, Input} from "../index.js";
import { useCallback, useEffect, useState } from "react";
import { AddPost } from "../../pages/AddPost.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
axios.defaults.withCredentials=true;

function PostForm({post})
{
    
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
        {
            defaultValues:{
                title:post?.title || '',
                slug:post?.slug | '',
                content:post?.content || '',
                status:post?.status?"active":"inactive" || 'active',
            }
        }
    )

    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData);

    const submit = async (data)=>
    {

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('status',data.status);
        formData.append('image', data.image['0']);

        function refreshPage() {
            setTimeout(()=>{
                window.location.reload();
            }, 500);
            console.log('page to reload')
        }

        if(post){
           formData.append('Id',post._id);

           const updatedPost = await axios.post("http://localhost:5000/api/v1/posts/update-post",formData);

           if(updatedPost.data.success)
           {
            navigate("/");
           }
           
        }
        else{
            const addedPost = await axios.post("http://localhost:5000/api/v1/user/add-post",formData);

            console.log(addedPost);
            if(addedPost.data.success){
                console.log(addedPost.data.data);
                refreshPage();
                dispatch(AddPost(user.data.data));
                navigate('/');
            } 
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string')
        {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-');
        }

        return "";
    })

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title')
            {
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })

        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugTransform,setValue,post])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" encType="multipart/form-data">
            <div className='w-2/3 px-2'>
                <Input 
                // value={post.title}
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title",{required:true}  )}/>

                <Input 
                // value={post.slug}
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug",{required:true})}
                onInput={(e)=>{
                    setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true});
                }}/>

                <RTE 
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}/>
            </div>

            <div className="w-1/3 px-2">
                <Input 
                    label="Featured Imag :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image",{required:false})}/>
                    {/* show image prew if file is uploaded */}

                    <Select 
                        options={['active',"inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status",{required:true})}/>

                    <Button 
                        type="submit"
                        bgColor={post ? "bg-green-500":undefined}
                        className="w-full h-[40px] active:scale-50"
                        text={post ? "Update":"Submit"}/>
            </div>

        </form>
    )
}


export {PostForm};