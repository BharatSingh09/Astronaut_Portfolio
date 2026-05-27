import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './components/Homepage'
import Connect from './components/Connect';
import Freelance from './components/Freelance';
function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/connect' element={<Connect/>}/>
        <Route path='/freelance' element={<Freelance/>}/>
      </Routes>
     </BrowserRouter>
  )
}

export default App
