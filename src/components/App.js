import Signin from './Signin.js';
import Signup from './Signup.js';
import Home from './Home.js';

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Signin/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
