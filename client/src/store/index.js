

import { configureStore } from '@reduxjs/toolkit'
import auth from '../slice/authSlice'
import post from '../slice/postSlice'
export const store = configureStore({
  reducer: {
 auth,
 post
  },
})

