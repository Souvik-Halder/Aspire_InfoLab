import './App.css';

import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
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
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/connections' element={<Connections/>}/>
    <Route path='/allrequests' element={<AllRequests/>} />
    <Route path='/acceptedRequests' element={<AcceptedRequests/>}/>
   { isAuth && <Route
          path="/rooms"
          element={
       
              <Rooms/>
           
          } />}
          <Route
          path="/room/:id"
          element={
           
              <Room/>
          
          } />

    
  </Routes>
</Router>
 
  
  );
  function ProtectedRoute({  children }) {
    const {user,isAuth}=useSelector((state)=>state.auth)
  
    if(isAuth && !user.activated){
      return <Navigate to="/activate" replace/>
    }
     if(!isAuth){
      return <Navigate replace to='/'/>
    }
    return children
  }
}

export default App;
