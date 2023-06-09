import React,{useState,useEffect} from "react";
import { fetchPosts, uploadPost } from "../../https";
import {useDispatch} from 'react-redux'
import { fetchallPosts, setPost } from "../../slice/postSlice";
const Cards ={
    name:"Hello World",
    area:"This is a card component",
    img:"https://picsum.photos/id/1027/150/150",
    timePosted:"2h",
    postText:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus repellendus nostrum id totam praesentium nam.",
    postImg:"https://picsum.photos/id/244/900/900"
};



const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const dispatch=useDispatch()
    async function submitPost(){
      const myForm=new FormData()
      myForm.append('description',description);
      console.log(description)
      const {data}=await uploadPost(myForm);
      console.log(data);
      dispatch(setPost(data))
    }
useEffect(() => {
  async function loadPosts(){
    const {data}=await fetchPosts();
    console.log(data)
    setAllPosts(data.getAllPost)
    dispatch(fetchallPosts(data));
  }
  loadPosts();

}, []);



  return (
    <div className=" bg-gray-200">
      <div className="w-full flex justify-center  items-center p-20">
        <div className="rounded-md bg-white w-full max-w-lg">
          <div className="px-5 py-3 flex items-center justify-between text-blue-400 border-b">
            <i className="fas fa-times text-xl"></i>

            <p className="inline hover:bg-blue-100 px-4 py-3 rounded-full font-bold cursor-pointer">
              Discard
            </p>
          </div>

          <div className="flex p-4">
            <div>
              <img
                className="rounded-full w-14"
                src="https://picsum.photos/id/1027/150/150"
              />
            </div>

            <div className="ml-3 flex flex-col w-full">
              <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
                placeholder="What's happening?"
                className="w-full text-lg resize-none outline-none h-20"></textarea>
              
            </div>
          </div>

          <div className="flex items-center text-blue-400 justify-between py-6 px-4 border-t">
            <div className="flex text-2xl pl-12">
              <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                <i className="fas fa-image"></i>
              </div>

              <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                <i className="fas fa-poll-h"></i>
              </div>

              <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                <i className="fas fa-smile"></i>
              </div>

              <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>

            <div onClick={submitPost}>
              <p className="inline px-4 py-3 rounded-md font-bold text-white bg-blue-300 cursor-pointer">
                Post <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
     {
      allPosts && allPosts.map(post=>(
        <div key={post._id} id="huhu" class="w-full flex justify-center bg-gray-200 h-screen items-center mb-10">
        <div class="bg-white border   rounded-sm max-w-lg">
          <div class="flex items-center my-2 px-4 py-3">
            <img
              class="h-8 w-8 rounded-full"
              src="https://picsum.photos/id/1027/150/150"
            />
            <div class="ml-3 ">
              <span class="text-md font-semibold antialiased block leading-tight">
                {post.userId.name}
              </span>
              <span class="text-gray-600 text-xs block">
               {post.userId.role}
              </span>
            </div>
          </div>
          <p className="p-5">
           {post.description}
          </p>
          <img src={Cards.postImg} />
          <div class="flex items-center justify-between mx-4 mt-3 mb-2">
            <div class="flex gap-5">
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
              
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </div>
            <div class="flex">
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
              </svg>
            </div>
          </div>
          <textarea id="message" rows="4" class="block p-2.5 w-full h-10 overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 resize-none" placeholder="Write your thoughts here..."></textarea>
        </div>
      </div> 
      ))
     }
    </div>
  );
};

export default Home;