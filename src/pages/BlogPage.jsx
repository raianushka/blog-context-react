import React, { useState , useContext, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import BlogDetails from '../components/BlogDetails';


const BlogPage = () =>{

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/"
    const [blog, setBlog] = useState(null)
    const [relatedBlogs, setRelatedBlogs] = useState([])
    const location = useLocation();
    const navigation = useNavigate();
    const{setLoading, loading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);


    async function fetchRelatedBlogs(){
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try{
            const res = await fetch(url);
            const data= await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            console.log("Error in Blog id call");
            setBlog(null);
            setRelatedBlogs([])
        }
        setLoading(false)
    }

    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname])

    return(
        <div className='w-11/12 max-w-[650px] flex flex-col gap-y-7  justify-center items-center h-screen my-60'>
                <Header/>
            <div>
                <button
                 className='rounded-md border-2 px-4 py-1'
                onClick={()=>navigation(-1)}>
                    Back
                </button>
             </div>
           {
            loading? <Spinner/> :
            blog ? (<div>
                <BlogDetails post={blog} />
                <h2 className='text-lg font-bold'>Related Blogs</h2>
                {
                    relatedBlogs.map( (post) => (
                        <div key={post.id}>
                            <BlogDetails post = {post}/>
                        </div>
                    ))
                }
            </div>) : (<div> <p>No Blog Found</p></div>)
           }
        </div>
    )
}
export default BlogPage