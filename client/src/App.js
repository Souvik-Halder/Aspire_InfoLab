import './App.css';
import Home from './Home'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
function App() {
  return (
<Router>
  <Routes>
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/register' element={<SignUp/>}/>
    
  </Routes>
</Router>
 
  
  );
}

export default App;
