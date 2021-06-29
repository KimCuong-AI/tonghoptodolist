import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Todolist from './Todolist/Todolist';

function App() {
  return (
    <BrowserRouter >
    <Todolist/>
    </BrowserRouter>
  );
}

export default App;
