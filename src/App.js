import logo from './logo.svg';
import './App.css';
import Dragons from './components/Dragons';
import Missions from './components/Missions';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Topbar from './components/Topbar';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Dragons />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/dragons" element={<Dragons/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
