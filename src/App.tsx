import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Bye } from './pages/Bye'
import { setAccessToken } from './accessToken';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', { 
      method: 'POST',
      credentials: 'include' 
    }).then(async x => {
      const {accessToken} = await x.json()
      setAccessToken(accessToken)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>loading...</div>
  }
  return(
    <Router>
      <div>
        <header>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/bye'>Bye</Link>
            </div>
        </header>
        <Switch>
          <Route exact path='/' component={Home} /> 
          <Route exact path='/register' component={Register} /> 
          <Route exact path='/login' component={Login} /> 
          <Route exact path='/bye' component={Bye} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
