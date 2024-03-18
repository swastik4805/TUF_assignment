
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { AllSubmissions } from './Pages/AllSubmissions';


//selectedOption
//username
//stdin
//sourceCode

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/allSubmissions' element={<AllSubmissions></AllSubmissions>}></Route>
    </Routes>
  )
}

export default App;
