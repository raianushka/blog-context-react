import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({post})  =>{
    return(
        <div>
        <NavLink to={`/blog/${post.id}`} >
            <span className='font-bold  text-sm'>{post.title}</span>
        </NavLink>
        <p className='text-[12px]'>
            By <span className='italic'>{post.author}</span> on {" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
                <span className='underline font-bold'>{post.category}</span>
            </NavLink>
        </p>
        <p className='text-[12px]'>Posted on {post.date} </p>
        <p className='text-sm mt-3'>{post.content}</p>
        <div className='flex gap-x-3 mt-2'>
            {post.tags.map( (tag, index) => (
                <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                    <span className='text-blue-500 underline font-bold text-xs'>{`#${tag}`}</span>
                </NavLink>
            ))}
        </div>
        </div>
      
    )
}
export default BlogDetails