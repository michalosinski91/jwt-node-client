import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

const App: React.FC = () => {

  return(
    <Router>
      <div>
        <header>
            <div>
                <Link to='/register'>Register</Link>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </header>
        <Switch>
          <Route exact path='/' component={Home} /> 
          <Route exact path='/register' component={Register} /> 
          <Route exact path='/login' component={Login} /> 
        </Switch>
      </div>
    </Router>
  )
}

export default App;
