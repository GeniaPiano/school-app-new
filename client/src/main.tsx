import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {Root} from "./views/Root/Root";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider>
          <Root/>
      </ChakraProvider>
  </React.StrictMode>
)
