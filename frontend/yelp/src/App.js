import React from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'; 
import Home from './routes/Home';
import Detail from './routes/Detail';
import Update from './routes/Update';
import detailPage from './components/detailPage';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route exact path = "/restaurants/:id/detail" element={<Detail/>}/>
          <Route exact path = "/restaurants/:id/update" element={<Update/>}/>
        </Routes>
      </Router>
    </div>
  );
    
}

export default App;
