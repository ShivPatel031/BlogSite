import React, {useEffect, useState} from 'react'
import {Container, PostCard} from '../component'
import { useSelector } from 'react-redux'
import { ArrowRight, BookOpen } from 'lucide-react'

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
  
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to <span className="text-primary">BlogSite</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <div className="mt-8">
              <a
                href="#posts"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
              >
                Start Reading
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Container>
          <div id="posts" className="py-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Latest Posts</h2>
            {posts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-xl font-medium text-gray-900">No posts yet</h3>
                <p className="mt-1 text-gray-500">Login to start reading or create your first post.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} {...post} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  )
}

export {Home}

