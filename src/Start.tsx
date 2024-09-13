import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/questions"

const LIMIT_QUESTIONS = 10

export const Start = () => {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)         //Para traerme el método fetchQuestions del Estado Global

    const handleClick = () => {
        fetchQuestions(LIMIT_QUESTIONS)
    }

    return (
        <Button onClick={handleClick} variant='contained'>
            ¡Empezar!
        </Button>
    )
}