import { createSlice } from '@reduxjs/toolkit'



const initialState={
  isAuth:false,
  user:null,
  isActivate:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {
      const {user}=action.payload
      console.log(user+"user")
      if(user===null){
     state.user=user;
     state.isAuth=false
      }
      else{
        state.user=user;
        state.isAuth=true
      }
      if(user.role!=='user'){
        state.isActivate=true
      }
      else{
        state.isActivate=false
      }
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer