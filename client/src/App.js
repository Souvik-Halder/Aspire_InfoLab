import './App.css';

import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import Digo from './components/Dignosis/Digo';
import Digo from './components/Dignosis/Digo';
import SingleConnection from './components/Connection/SingleConnection';
import Connections from './components/Connection/Connections';
import AllRequests from './components/Connection/AllRequests';
import Rooms from '../../client/src/components/Rooms/Rooms'
import Room from '../../client/src/components/Room/Room'
import AcceptedRequests from './components/Connection/AcceptedRequests';
import NavBar from './components/Header/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './https';
import { setAuth } from './slice/authSlice';
import MiddlePage from './components/MiddlePage';
function App() {
  const{user,isAuth}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
   async function loadUsersfrontend(){
    const {data}=await loadUser();
    dispatch(setAuth(data))
   }
   loadUsersfrontend()
  },[])
  return (
<Router>
<NavBar/>
  <Routes>
   
    {/* <Route path='/middlepage' element={<MiddlePage/>}/> */}
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/dignosis' element={<Digo/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/connections' element={
      <ProtectedRoute>
      <Connections/>
      </ProtectedRoute>
      }/>
    <Route path='/allrequests' element={<AllRequests/>} />
    <Route path='/acceptedRequests' element={<AcceptedRequests/>}/>
   { isAuth && <Route
          path="/rooms"
          element={
       <ProtectedRoute>
              <Rooms/>
              </ProtectedRoute>
          } />}
          <Route
          path="/room/:id"
          element={
           <ProtectedRoute>
              <Room/>
              </ProtectedRoute>
          } />

    
  </Routes>
</Router>
 
  
  );
  function GuestRoute({  children }) {
    const {isAuth}=useSelector((state)=>state.auth)
    //This is the new protected route configuration
    if (isAuth) {
      return <Navigate to="/rooms" replace />
    }
    return children
  }
  
  function SemiprotectedRoute({ children }) {
    const {user,isAuth,isActivate}=useSelector((state)=>state.auth)
  
  
    if (!isAuth) {
      return <Navigate to="/" replace />
    }
    else if (isAuth && !isActivate) {
      return children
    }
    else {
      return <Navigate to="/rooms" replace />
    }
  }
  
  function ProtectedRoute({  children }) {
    const {user,isAuth,isActivate}=useSelector((state)=>state.auth)
  
    if(isAuth && !isActivate){
      return <Navigate to="/middlepage" replace/>
    }
     if(!isAuth){
      return <Navigate replace to='/'/>
    }
    return children
  }
}

export default App;
