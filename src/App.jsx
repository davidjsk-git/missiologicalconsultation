import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Style2 from './pages/Style2';
import Style1 from './pages/Style1';
import MissiologicalConsultation from './pages/MissiologicalConsultation';
import Admin from './pages/Admin';
import Style3 from './pages/Style3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/MissiologicalConsultation" replace />} />
        <Route path="/Style2" element={<Style2 />} />
        <Route path="/Style1" element={<Style1 />} />
        <Route path="/MissiologicalConsultation" element={<MissiologicalConsultation />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Style3" element={<Style3 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
