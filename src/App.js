import CreateComponent from '../src/components/CreateComponent';
import ShowComponents from './components/ShowComponents';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ShowComponents />} />
          <Route path='/show' element={<CreateComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
