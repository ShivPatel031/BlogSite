// import { useForm } from "react-hook-form";
// import {Button,Select,RTE, Input} from "../index.js";
// import { useCallback, useEffect, useState } from "react";
// import { AddPost } from "../../pages/AddPost.jsx";
// import { useNavigate } from "react-router-dom";
// import { useSelector ,useDispatch} from "react-redux";
// import axios from "axios";
// axios.defaults.withCredentials=true;

// function PostForm({post})
// {
    
//     const {register,handleSubmit,watch,setValue,control,getValues}=useForm(
//         {
//             defaultValues:{
//                 title:post?.title || '',
//                 slug:post?.slug | '',
//                 content:post?.content || '',
//                 status:post?.status?"active":"inactive" || 'active',
//             }
//         }
//     )

//     const navigate = useNavigate();
//     const userData = useSelector((state)=>state.auth.userData);

//     const submit = async (data)=>
//     {

//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('slug', data.slug);
//         formData.append('content', data.content);
//         formData.append('status',data.status);
//         formData.append('image', data.image['0']);

//         function refreshPage() {
//             setTimeout(()=>{
//                 window.location.reload();
//             }, 500);
//             console.log('page to reload')
//         }

//         if(post){
//            formData.append('Id',post._id);

//            const updatedPost = await axios.post(`http://${import.meta.env.VITE_BACKEND_SERVER}/api/v1/posts/update-post`,formData);

//            if(updatedPost.data.success)
//            {
//             navigate("/");
//            }
           
//         }
//         else{
//             const addedPost = await axios.post(`http://${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/add-post`,formData);

//             console.log(addedPost);
//             if(addedPost.data.success){
//                 console.log(addedPost.data.data);
//                 refreshPage();
//                 dispatch(AddPost(user.data.data));
//                 navigate('/');
//             } 
//         }
//     }

//     const slugTransform = useCallback((value)=>{
//         if(value && typeof value === 'string')
//         {
//             return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-');
//         }

//         return "";
//     })

//     useEffect(()=>{
//         const subscription = watch((value,{name})=>{
//             if(name==='title')
//             {
//                 setValue('slug',slugTransform(value.title,{shouldValidate:true}))
//             }
//         })

//         return ()=>{
//             subscription.unsubscribe();
//         }
//     },[watch,slugTransform,setValue,post])


//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" encType="multipart/form-data">
//             <div className='w-2/3 px-2'>
//                 <Input 
//                 // value={post.title}
//                 label="Title :"
//                 placeholder="Title"
//                 className="mb-4"
//                 {...register("title",{required:true}  )}/>

//                 <Input 
//                 // value={post.slug}
//                 label="Slug :"
//                 placeholder="Slug"
//                 className="mb-4"
//                 {...register("slug",{required:true})}
//                 onInput={(e)=>{
//                     setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true});
//                 }}/>

//                 <RTE 
//                     label="Content :"
//                     name="content"
//                     control={control}
//                     defaultValue={getValues("content")}/>
//             </div>

//             <div className="w-1/3 px-2">
//                 <Input 
//                     label="Featured Imag :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image",{required:false})}/>
//                     {/* show image prew if file is uploaded */}

//                     <Select 
//                         options={['active',"inactive"]}
//                         label="Status"
//                         className="mb-4"
//                         {...register("status",{required:true})}/>

//                     <Button 
//                         type="submit"
//                         bgColor={post ? "bg-green-500":undefined}
//                         className="w-full h-[40px] active:scale-50"
//                         text={post ? "Update":"Submit"}/>
//             </div>

//         </form>
//     )
// }


// export {PostForm};

import { useForm, Controller } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AddPost } from "../../pages/AddPost.jsx";
import { Button, Select, Input, RTE } from "../index.js";
import { Editor } from "@tinymce/tinymce-react";

axios.defaults.withCredentials = true;

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status ? "active" : "inactive",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("image", data.image[0]);

    const refreshPage = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    try {
      if (post) {
        formData.append("Id", post._id);
        const updatedPost = await axios.post(
          `http://${import.meta.env.VITE_BACKEND_SERVER}/api/v1/posts/update-post`,
          formData
        );
        if (updatedPost.data.success) {
          navigate("/");
        }
      } else {
        const addedPost = await axios.post(
          `http://${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/add-post`,
          formData
        );
        if (addedPost.data.success) {
          refreshPage();
          dispatch(AddPost(addedPost.data.data));
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{post ? "Edit Post" : "Create New Post"}</h2>
      <div className="space-y-6">
        <div>
          <Input
            label="Title"
            placeholder="Enter post title"
            {...register("title", { required: "Title is required" })}
          />
        </div>
        <div>
          <Input
            label="Slug"
            placeholder="post-slug"
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          {/* <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field: { onChange, value } }) => (
              <Editor
                apiKey="your-tinymce-api-key"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
                onEditorChange={onChange}
                value={value}
              />
            )}
          /> */}
          
          <RTE 
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        {/* <div>
          <Select
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            label="Status"
            {...register("status", { required: "Status is required" })}
          />
        </div> */}
        <Button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

export {PostForm};
