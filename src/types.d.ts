//Solo voy a tipar este archivo, para tener la pregunta tipada
export interface Question {                         //Esto es lo que voy a usar para hacer el Estado Global
    id: number;
    question: string;
    code: string;
    answers: string[];
    correctAnswer: number;
    userSelectedAnswer?: number;                    //Lo que selecciona el usuario. El ? le dice que puede ser undefined, porque puede no seleccionarse nada
    isCorrectUserAnswer?: boolean;
}