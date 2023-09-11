import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Root} from "./views/Root/Root";
import {AllProviders} from "./providers/AllProviders";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AllProviders>
         <Root/>
      </AllProviders>
  </React.StrictMode>
)
