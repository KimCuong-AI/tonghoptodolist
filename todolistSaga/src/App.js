import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Profile from './pages/Profiles/Profile';
import Todolist from './pages/TodoList/Todolist';
import TodolistRFC from './pages/TodoList/TodolistRFC';
import ToDoListRedux from './pages/TodoList/ToDoListRedux';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaGa';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <LoadingComponent/>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/todolistrcc' component={Todolist} />
        <Route exact path='/todolistrfc' component={TodolistRFC} />
        <Route exact path='/todolistredux' component={ToDoListRedux} />
        <Route exact path='/todolistsaga' component={BaiTapToDoListSaga} />
        <Route exact path='/' component={Home} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
