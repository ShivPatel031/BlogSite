import React, {useEffect, useState} from 'react'
import {Container, PostCard} from '../component'
import { useSelector } from 'react-redux'

function Home() {
    const post = useSelector((state)=>state.post.posts)
    const [posts, setPosts] = useState([]);

    console.log(post)
 

    useEffect(() => {
        if(post && post.length>0 && post.length != posts.length)
        {
            setPosts([...post])
        }
    },[post])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post._id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export {Home}

