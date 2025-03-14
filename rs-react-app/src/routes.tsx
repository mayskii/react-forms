import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import HookFormPage from './pages/HookFormPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
        <Route path="/hook-form" element={<HookFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
