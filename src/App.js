import './App.css';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import GetCurrentUser from './API/GetCurrentUser';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function currentUser() {
        const response = await GetCurrentUser();
        if(response)
          setUser(response);
    }
    currentUser();
  }, [])
  return (
    <BrowserRouter>
      <Header currentUser={user} setCurrentUser={setUser}/>
      <Routes>
        <Route path='/' element={<Login user={user} setUser={setUser} />} />
        <Route path='/home' element={user ? <Home currentUser={user} /> : <h1 style={{textAlign: 'center', marginTop: '100px'}}>User Not Authorized</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
