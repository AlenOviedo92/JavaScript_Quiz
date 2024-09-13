import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {                                        //Creo un Custom Hook de questions, el cual se puede usar en cualquier sitio
    const questions = useQuestionsStore(state => state.questions)              //Cada vez que cambie questions en el Estado Global, la variable "questions" definida en esta línea se volverá a renderizar
    let correct = 0                                                            //Lee cuantas correctas tenemos
    let incorrect = 0
    let unanswered = 0

    questions.forEach(question => {
        const { userSelectedAnswer, correctAnswer } = question
        if(userSelectedAnswer == null) unanswered++
        else if(userSelectedAnswer === correctAnswer) correct++
        else incorrect++
    })

    return { correct, incorrect, unanswered }
} 