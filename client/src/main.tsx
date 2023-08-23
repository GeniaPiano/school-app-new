import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {Root} from "./views/Root/Root";
import {colors, components} from "./assets/style/theme";
import {NavSizeProvider} from "./provider/NavSizeProvider";

const theme = extendTheme({colors, components})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
         <NavSizeProvider>
             <Root/>
         </NavSizeProvider>
      </ChakraProvider>
  </React.StrictMode>
)
