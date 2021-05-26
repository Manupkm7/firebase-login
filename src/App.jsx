import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin from './components/Admin'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Reset from './components/Reset'
import {auth} from './firebase/firebase'

function App() {
  const [firebaseUser, setFirebasUser] = useState(false)

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setFirebasUser(user)
      }else{
        setFirebasUser(null)
      }
    })
  },[firebaseUser,setFirebasUser])
  return firebaseUser !== false ? (
    <Router>
    <div className="container">
      <Navbar firebaseUser={firebaseUser} />
      <Switch>
      <Route path='/' exact></Route>
      <Route path='/login'><Login /></Route>  
      <Route path='/admin'><Admin /></Route>
      <Route path='/reset'><Reset/></Route>
      </Switch> 
    </div>
    </Router>
    
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
