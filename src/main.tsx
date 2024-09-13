import { ThemeProvider, createTheme } from '@mui/material/styles' //Para usar el dark mode de mui
import CssBaseline from '@mui/material/CssBaseline'               //Para usar el dark mode de mui

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const darkTheme = createTheme({                                   //Copiado de la página de mui
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>                               {/*Para usar el dark mode de mui*/}
    <CssBaseline />                                               {/*Para usar el dark mode de mui*/}
    <App />
  </ThemeProvider>                                               
)


