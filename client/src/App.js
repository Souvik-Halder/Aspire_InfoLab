import './App.css';
import Home from './Home'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import MiddlePage from './components/MiddlePage';
function App() {
  return (
<Router>
  <Routes>
    <Route path='/middlepage' element={<MiddlePage/>}/>
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/register' element={<SignUp/>}/>
    
  </Routes>
</Router>
 
  
  );
}

export default App;
