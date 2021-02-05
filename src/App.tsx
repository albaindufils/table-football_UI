import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AppRoot from "./AppRoot";
import {BrowserRouter} from "react-router-dom";





function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <AppRoot />
          </BrowserRouter>
      </div>
  );
}

export default App;
