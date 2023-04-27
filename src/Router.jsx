import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './pages/Form/Form';
import Home from './pages/Home';
import Posts from './pages/Posts';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
