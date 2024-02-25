//import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Match2 from './Components/Match2';
import TodoList2 from './Components/TodoList2';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, onIdTokenChanged, signOut } from 'firebase/auth';
import { auth } from './FB/conf';
import Login from './FB/Login';
import { Button, Icon, Menu } from 'semantic-ui-react';
import TodoListFB from './FB/TodoListFB';
import DummyLogin from './FB/DummyLogin';
import TodoList25Feb from './Components/TodoList25Feb';
export const MyContext = createContext(null)
function App() {
  const urlParams = new URLSearchParams(window.location.search)
  let param = urlParams.get('page')
  if (!param) {
    param = 'Home'

  }

  const [user, setUser] = useState(null)
  const [page, setpage] = useState(param)

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, [auth])
  function doLogout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  function MainMenu() {
    const items = ['Home', 'Match2', 'TodoList2', 'TodoListFB', 'DummyLogin', "Games", "TodoList25Feb"]


    return (
      <Menu icon='labeled' widths={items.length + 1} compact size='mini'>
        {items.map((item) =>
          <Menu.Item name='gamepad'
            onClick={() => chngpage(item)}
          >
            <Icon name='home' />
            {item}
          </Menu.Item>)
        }
        <Menu.Item name='signout' color='red' onClick={doLogout} ><Icon color='red' name='sign-out' /> Log Out</Menu.Item>
      </Menu>)
  }
  function chngpage(value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', value);
    const newURL = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, document.title, newURL);
    setpage(value)
  }

  return (
    <div className="App">
      {user ?
        <MyContext.Provider value={{ user }}>
          <MainMenu />
          {page === 'Home' && <p>this is home</p>}
          {page === 'DummyLogin' && <DummyLogin/>}
          {page === 'TodoListFB' && <TodoListFB />}
          {page === 'Match2' && <Match2 />}
          {page === 'TodoList2' && <TodoList2 />}
          {page === 'TodoList25Feb' && <TodoList25Feb />}
          
        </MyContext.Provider>
        :
        <Login />
      }
    </div>
  );
}

export default App;
