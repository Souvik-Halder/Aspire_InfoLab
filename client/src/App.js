import './App.css';

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
function App() {
  return (
<Router>
  <Routes>
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/' element={<Home/>}/>
    
  </Routes>
</Router>
 
  
  );
}

export default App;
