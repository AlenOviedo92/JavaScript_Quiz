import { IconButton, Stack, Typography, Card, List, ListItem, ListItemButton, ListItemText } from "@mui/material"   //IconButton y Stack: los uso para dar estilos al juego
import { useQuestionsStore } from "./store/questions"
import { type Question as QuestionType } from "./types"
import SyntaxHighlighter from "react-syntax-highlighter"                                                            //Importo el componente para hacer SyntaxHighlighter
import { gradientDark, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./Footer"

const getBackgroundColor = (info: QuestionType, index: number) => {                                                 //Método que sirve para enseñar al usuario si su respuesta ha sido correcta o no
    const { userSelectedAnswer, correctAnswer } = info                                                              //Desesctructuro la propiedad "userSelectedAnswer" de info
    if(userSelectedAnswer == null) return 'transparent'                                                             //Si el usuario no ha seleccionado nada aún
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'                                //Si el usuario seleccionó la respuesta pero es incorrecta: significa que la respuesta que estamos mirando !== correctAnswer y también es !== a la respuesta seleccionada por el usuario
    if(index === correctAnswer) return 'green'                                                                      //Si el botón que estoy mirando es la respuesta correcta
    if(index === userSelectedAnswer) return 'red'                                                                   //Si ésta es la selección del usuario pero no es correcta
    return 'trasnparent'                                                                                            //Si no es ninguna de las anteriores
}

const Question = ({ info }: {info: QuestionType}) => {                                                              //info es el "export interface Question" del archivo types.d.ts
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {                                                      //Estoy crando una fn que a su vez devuelve otra fn(la 2da fn es la del handleClick y la 1ra es la de crear)
        selectAnswer(info.id, answerIndex)                                                                          //Al hacer click en alguna respuesta, selecciona dicha opción
    }                                                                                                               //Creo la fn "createHandleClick", para evitar tener que escribirla en la misma línea del onClick

    return (
        <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign:"left", marginTop: 5 }}>

            <Typography variant="h5">
                {info.question}                                                                                     {/*La pregunta*/}
            </Typography>

            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}                                                                                         {/*El código*/}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333'}} disablePadding>                                                           {/*Aquí voy a iterar todas las respuestas posibles para mostrarselas al usuario*/}
                {info.answers.map((answer, index) => (                                                              
                    <ListItem key={index} disablePadding divider>                                                   {/*Se puede usar index porque las respuestas no van a cambiar de orden ni van a desaparecer. Caso contrario utilizar id*/}
                        <ListItemButton onClick={createHandleClick(index)} sx={{ backgroundColor: getBackgroundColor(info, index) }} disabled={info.userSelectedAnswer != null}>
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }}/>
                        </ListItemButton>
                    </ListItem>                       
                ))}  
            </List>

        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
    const questionInfo = questions[currentQuestion]                                                                 //De todo el array de questions, me quedo con la question actual
    
    return (
        <>
            <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>

                {currentQuestion + 1}/{questions.length}

                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>             {/*No puedo avanzar más hacia el siguiente, porque ya estoy en el final */}
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}