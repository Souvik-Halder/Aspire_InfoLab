import './App.css';

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import Digo from './components/Digo';
import SingleConnection from './components/Connection/SingleConnection';
import Connections from './components/Connection/Connections';
import AllRequests from './components/Connection/AllRequests';
import AcceptedRequests from './components/Connection/AcceptedRequests';
function App() {
  return (
<Router>
  <Routes>
    {/* <Route path='/middlepage' element={<MiddlePage/>}/> */}
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/dignosis' element={<Digo/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/connections' element={<Connections/>}/>
    <Route path='/allrequests' element={<AllRequests/>} />
    <Route path='/acceptedRequests' element={<AcceptedRequests/>}/>
    
  </Routes>
</Router>
 
  
  );
}

export default App;
