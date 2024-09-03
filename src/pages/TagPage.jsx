import React from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination'

const TagPage = () =>{

    const navigation = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);


    return(
        <div  className='w-11/12 max-w-[650px] flex flex-col gap-y-7  justify-center items-center h-screen my-60'>
            <Header/>
            <div>
                <button 
                  className='rounded-md border-2 px-4 py-1'
                onClick={()=>navigation(-1)}>
                    Back
                </button>
                <h2 className='text-md font-bold'>
                    Blogs Tagged <span>#{tag}</span>
                </h2>
            </div>
            <Blogs/>
            <Pagination/>
        </div>
    )
}
export default TagPage