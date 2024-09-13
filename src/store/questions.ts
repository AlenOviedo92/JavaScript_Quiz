//Aquí voy a crear el Estado Global con zustand
import { create } from "zustand"
import { type Question } from "../types"                                                            //Importo el Question como "type"
import confetti from "canvas-confetti"                                                              
import { persist, devtools } from "zustand/middleware"                                              //Para aplicar la persistencia de datos en la localStorage. El "persist" captura todos los cambios que se quieren hacer en la store y los sincroniza con la localStorage

interface State {                                                                                   //Interface para el estado, para tipar el Estado
    questions: Question[]                                                                           //questions será un array de quiestions
    currentQuestion: number                                                                         //Para ver que pregunta está parado el usuario
    fetchQuestions: (limit: number) => Promise<void>                                                //Este método devuelve void y no las preguntas, porque lo que voy a hacer es cambiar el estado
    selectAnswer: (questionId: number, answerIndex: number) => void                                 //De la pregunta con el id tal, me debes marcar(fijar) la respuesta con el índice tal
    goNextQuestion: () => void
    goPreviousQuestion: () => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {                   //El create debe recibir un callback, en este cb tengo que devolver el objeto que será el estado global. set para actualizar el Estado y get para leerlo
    return {                                                                                        //Aquí se tendrá tanto el estado como las formas de actualizar el estado
        questions: [],                                                                              //Para empezar será un array vacío
        currentQuestion: 0,                                                                         //Para empezar será 0, es la posición del array questions
        fetchQuestions: async(limit: number) => {                                                   //Es async porque arriba devuelve una promesa: Promise<void>
            const res = await fetch('http://localhost:5173/data.json')                              //Al hacer click en empezar voy a llamar a fetchQuestions(método), y vamos a actualizar el estado. Esta URL también puede ser alguna API. Con esta línea me traigo toda la info de data.json 
            const json = await res.json()
            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)                  //Con este truco se desordena el array "() => Math.random() - 0.5", y uso slice para limitar el número de resultados(preguntas)
            set({ questions }, false, "FETCH_QUESTIONS")                                            //Con set actualizo el estado questions de la línea 13. Los 2do y 3er parámetros se agregan para nombrar la actions "FETCH_QUESTIONS" e identificarla en la Redux DevTools
        },
        selectAnswer: (questionId: number, answerIndex: number) => {                                //De esta pregunta con este id, me debes marcar la respuesta que coincida con éste índice
            const { questions } = get()                                                             //Desde el método "selectAnswer" accedo a la propiedad "questions" del Estado Global. get() me devuelve el E.G. completo
            const newQuestions = structuredClone(questions)                                         //Uso structuredClone para clonar ojetos de forma profunda
            //En la línea anterior estoy clonando directamente todas las preguntas. Solo voy a cambiar aquella que necesito en concreto
            const questionIndex = newQuestions.findIndex(question => question.id === questionId)    //Busco el questionIndex: Primero busco el index de la question. Debido a que anteriomente se desordenó el index uso findIndex
            const questionInfo = newQuestions[questionIndex]                                        //Me quedo con la question que coincide con el questionIndex, obtengo toda la info de la pregunta
            //console.log(questionInfo)
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex                  //Averiguo si el usuario ha seleccionado la respuesta correcta. "answerIndex" es el índice de la respuesta seleccionada por el usuario. Si el usuario selecciona la respuesta correcta, esta propiedad será true, sino será false
            if(isCorrectUserAnswer) confetti()
            //Cambio o actualizo esta info en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo, isCorrectUserAnswer, userSelectedAnswer: answerIndex               //Hago una copia del obj que contiene la info de la question y actualizo las propiedades de interés. "userSelectedAnswer: answerIndex" me va a servir para indicar al usuario la respuesta que ha seleccionado
            }
            set({ questions: newQuestions }, false, "SELECT_ANSWER")                                //Actualizo el estado
        },                                                                                          //De esta forma actualizamos el estado al seleccionar una question                                         
        goNextQuestion: () => {
            const {currentQuestion, questions} = get()                                              //Recupero la pregunta actual y todas las preguntas
            const nextQuestion = currentQuestion + 1
            if(nextQuestion < questions.length) {                                                   //Si aún hay preguntas siguientes
                set({ currentQuestion: nextQuestion }, false, "GO_NEXT_QUESTION")
            }
        },
        goPreviousQuestion: () => {
            const {currentQuestion} = get()
            const previousQuestion = currentQuestion - 1
            if(previousQuestion >= 0) {                                                             //Si aún hay preguntas anteriores
                set({ currentQuestion: previousQuestion }, false, "GO_PREVIOUS_QUESTION")
            }
        },
        reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, "RESET_QUIZ")
        }
    }
}, {
    name: "questions",                                                                               //Aquí le damos un nombre a lo que queremos persistir
    //getStorage: () => sessionStorage                                                               //Le digo dónde lo quiero guardar, si no se pone nada lo guarda en "localStorage" por default
})))

//La interface creada explica o describe cómo es el estado
//Con lo anterior ya estoy creando el Estado Global y puedo acceder a él desde cualquier sitio(componente)
