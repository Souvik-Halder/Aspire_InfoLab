import { createSlice } from '@reduxjs/toolkit'



const initialState={
  allPosts:null,
  posts:null
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state,action) => {
    const {post}=action.payload;
    state.posts=action.payload
      
    },
    fetchallPosts:(state,action)=>{
      const {getAllPost}=action.payload;
      state.allPosts=getAllPost
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setPost,fetchallPosts } = postSlice.actions

export default postSlice.reducer