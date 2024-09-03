import React, { useContext, useEffect} from 'react'
import {AppContext} from './context/AppContext'
import Home from './pages/Home'
import BlogPage from './pages/BlogPage'
import CategoryPage from './pages/CategoryPage'
import TagPage from './pages/TagPage'
import {Route, Routes, useSearchParams, useLocation} from 'react-router-dom'



export default function App() {

  const {fetchBlogPosts} = useContext(AppContext);

  //url mei se kisi ko search krna h ya access krna h ya update krna h to hm useSearchParams() ka use krenge
  //jaha pe hm update kr skte h and access kr skte h hmari query ke parameters ko
  //output: search parameters ka object and setSearchParams ka function
  const [searchParams, setSearchParams] = useSearchParams();
 //current location access
  const location=useLocation() ;

  useEffect(()=>{
    const page = searchParams.get("page") ?? 1;
    if(location.pathname.includes("tags")) {
      //iska mtlb tag wala page show krna h 
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag)
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null,category)
    }
    else{
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (

    <div className='w-11/12 flex flex-col justify-center items-center'>

 

    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/blog/:blogId' element = {<BlogPage/>}/>
      <Route path='/tags/:tag' element = {<TagPage/>}/>
      <Route path='/categories/:category' element = {<CategoryPage/>}/>

    </Routes>

    </div>

  );
}
