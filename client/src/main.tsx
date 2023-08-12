import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {Root} from "./views/Root/Root";
import {colors} from "./assets/style/theme";

const theme = extendTheme({colors})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <Root/>
      </ChakraProvider>
  </React.StrictMode>
)
