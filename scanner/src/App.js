import { useState } from 'react';
import {Router,Routes,Route,BrowserRouter} from 'react-router-dom'
import ArtistSignIn from './components/ArtistSignIn';

import Scanner from './components/Scanner';

function App() {
  const [islogin,setIslogin]=useState(false);
  const [mId,setMid]=useState("");
  const [role,setRole]=useState("");
  const backend= "https://myid-pi.vercel.app"
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Scanner mId={mId}  backend={backend} islogin={islogin} role={role} setIslogin={setIslogin} />}/>
        <Route path='/signIn' element={<ArtistSignIn setMid={setMid}  backend={backend} setIslogin={setIslogin} setAdmin = {setRole}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
