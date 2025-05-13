import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Calendar from './pages/calendar';
import Notes from './pages/notes';
import Estudos from './pages/Estudos';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Estudos" element={<Estudos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
