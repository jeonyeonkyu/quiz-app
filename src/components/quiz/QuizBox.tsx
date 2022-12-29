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
  | 'quizzes'
  | 'currentQuizIndex'
  | 'hasCorrectAnswers'
  | 'setNextQuiz'
  | 'endTime'
  | 'setPrevPage'
> & {
  handleChecked: (index: number) => void
}

const QuizBox = ({
  quizzes,
  currentQuizIndex,
  handleChecked,
  hasCorrectAnswers,
  setNextQuiz,
  endTime,
  setPrevPage,
}: Props) => {
  const quiz = quizzes[currentQuizIndex]
  const hasCorrectAnswer = hasCorrectAnswers[currentQuizIndex]
  return (
    <>
      <Header>
        <h1>퀴즈</h1>
      </Header>
      <QuizBoxWrapper>
        {hasCorrectAnswer === true && (
          <Correct width={endTime ? '100px' : '500px'} />
        )}
        {hasCorrectAnswer === false && (
          <Wrong width={endTime ? '100px' : '500px'} />
        )}
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
                  <Radio
                    role="radio"
                    checked={answer === quiz.checkedAnswer}
                    onChange={() => handleChecked(index)}
                    disabled={hasCorrectAnswer !== undefined}
                  />
                }
                label={answer}
              />
            )
          })}
        </RadioGroup>

        <ButtonWrapper>
          <>
            {endTime && currentQuizIndex !== 0 && (
              <Button style={{ width: '90px' }} onClick={setPrevPage}>
                이전 문항
              </Button>
            )}
          </>

          <Spacing />
          <>
            {quiz.checkedAnswer && (
              <Button
                style={{ width: '90px' }}
                onClick={setNextQuiz}
                disabled={!endTime && hasCorrectAnswer !== undefined}
              >
                {quizzes.length - 1 !== currentQuizIndex ? '다음 문항' : '완료'}
              </Button>
            )}
          </>
        </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
`

const Spacing = styled.div`
  width: 100%;
`
export default QuizBox
