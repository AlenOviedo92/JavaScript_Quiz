import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionsStore(state => state.questions)                         //Así accedo a la info del Estado Global, más precisamente a las preguntas del quiz

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>     {/*Stack sirve para apilar elementos, agrego estilos con mui*/}
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quiz
          </Typography>   
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
        
      </Container>
    </main>
  )
}

export default App
