import styled from '@emotion/styled'
import {
  Button,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { QuizStore } from '../../store/quizStore'
import Correct from '../animations/Correct'
import Wrong from '../animations/Wrong'

type Props = Pick<
  QuizStore,
  'quizzes' | 'currentQuizIndex' | 'hasCorrectAnswers' | 'setNextQuiz'
> & {
  handleChecked: (index: number) => void
}

const QuizBox = ({
  quizzes,
  currentQuizIndex,
  handleChecked,
  hasCorrectAnswers,
  setNextQuiz,
}: Props) => {
  const quiz = quizzes[currentQuizIndex]
  const hasCorrectAnswer = hasCorrectAnswers[currentQuizIndex]
  return (
    <>
      <Header>
        <h1>퀴즈</h1>
      </Header>
      <QuizBoxWrapper>
        {hasCorrectAnswer === true && <Correct />}
        {hasCorrectAnswer === false && <Wrong />}
        <Category>{quiz.category}</Category>
        <Difficulty label={quiz.difficulty} />

        <Question role="question">{`${currentQuizIndex + 1}. ${
          quiz.question
        }`}</Question>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {quiz.incorrect_answers.map((answer, index) => {
            return (
              <FormControlLabel
                key={answer}
                value={answer}
                control={
                  <Radio role="radio" onChange={() => handleChecked(index)} />
                }
                label={answer}
              />
            )
          })}
        </RadioGroup>

        <NextButtonWrapper>
          <>
            {quiz.checkedAnswer && (
              <Button
                onClick={setNextQuiz}
                disabled={hasCorrectAnswer !== undefined}
              >
                {quizzes.length - 1 !== currentQuizIndex ? '다음 문항' : '완료'}
              </Button>
            )}
          </>
        </NextButtonWrapper>
      </QuizBoxWrapper>
    </>
  )
}

const QuizBoxWrapper = styled.div`
  position: relative;
  padding: 16px;
  border: 1px solid black;
  min-width: 600px;
  max-width: 600px;
  border-radius: 8px;

  @media (max-width: 600px) {
    min-width: auto;
  }
`
const Header = styled.header``

const Category = styled.span``
const Difficulty = styled(Chip)`
  margin-left: 12px;
`
const Question = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 16px;
`

const NextButtonWrapper = styled.div`
  height: 40px;
`
export default QuizBox
