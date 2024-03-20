// this is our post preview compoment that one box

import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

// using database function that is image function
// is this postcard we have a box in that one image and below it heading
function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard