import './App.css'
import Api from './components/Api'
import Use from './components/Use'
import Navbar from './components/Navbar'
import CategaryBar from './pages/CategaryBar'

function App() {
  return (
    <>
      <Navbar />
      <CategaryBar />
      <Api />
      <Use />
    </>
  )
}

export default App
