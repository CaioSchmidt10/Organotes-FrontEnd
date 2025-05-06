import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Calendar from './components/calendar';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/Calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
