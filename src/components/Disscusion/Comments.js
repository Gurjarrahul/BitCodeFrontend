import React from 'react'
import './comm.css'
import { useState,useEffect } from 'react'
import { json, useParams,useNavigate } from 'react-router-dom'

const Comments = () => {
  let navigate=useNavigate();
  let [user_name,setName]=useState();
  const  user=async ()=>{
    const response=await fetch('https://coding-platform-bitcode.onrender.com/home');
    let data=await response.json();
    setName(data.name);
  }

  const [blog,setBlog] = useState([]);
  const [comment,setnewComment]=useState('');
  const [post,setnewPost]=useState('');
  const fun = async () => {
    const response = await fetch('https://coding-platform-bitcode.onrender.com/discussion');
    let data = await response.json();
    setBlog(data);
    
  }
 let commenting=async(e)=>{
      e.preventDefault();
     const id=e.target.id;
     if(user_name)
     {
     let response=await fetch('https://coding-platform-bitcode.onrender.com/thread',{
      method:"POST",
      headers:{
       'Content-Type':'Application/json',
       'Access-Control-Allow-Origin':'*'
      },
      body:JSON.stringify({id,user_name,post,comment})
  });
  let data = await response.json();
  setBlog(data);
   }
   else{
    window.alert('You are not login !');
    navigate("/login");
   }
  setnewComment('');
  setnewPost('');

 }

  useEffect(() => {
    fun();
    user();
  },[]);

  return (
    <>
    <h1>Add new post</h1>
    <form>
    <textarea placeholder='Write post here..!' value={post} onChange={(e)=>setnewPost(e.target.value)}></textarea>
    <button  onClick={commenting}>add blog</button>
    </form>
      {
        blog.map((value,ind)=>
            <>
            <h2>{value.Uname}</h2>
            <p>{value.post}</p>
            <hr/>
            comments
            <br/>
            {value.comments.map((value1,ind1)=>
             <>
             <label>@{value1.user_name}</label>
             <pre>{value1.comment}</pre>
             <br/>
             </>
            )
            }
             <form>
            <textarea placeholder='comment here..!' onChange={(e)=>setnewComment(e.target.value)}></textarea>
            <button id={value._id} onClick={commenting}>comment</button>
            </form>
            </>
        )
      }
    </>
  )
}

export default Comments