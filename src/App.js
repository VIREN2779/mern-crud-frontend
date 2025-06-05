import ShowComponents from './components/ShowComponents';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ShowComponents />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
