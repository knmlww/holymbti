import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Calculate from './component/Calculate';


import Result from './component/Result'

const App = () => {

    return(
      <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/calculate' element={<Calculate/>}/>
      <Route path='/searchResult'>
        <Route path=':search' element={<Result/>}/>
      </Route>
      </Routes>
    )
}

export default App;
