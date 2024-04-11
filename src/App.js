import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import './css/App.css';

import Result from './component/Result'

const App = () => {
  const [path, setPath] = useState("");

  const pathHandler= (param) => {
    setPath(param);
  }

    return(
      <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      </Routes>
    )
}

export default App;
