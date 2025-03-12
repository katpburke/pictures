import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Uploader from './Uploader.jsx';
import Display from './Display.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Uploader />} />
          <Route path='/images/:id' element={<Display />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
