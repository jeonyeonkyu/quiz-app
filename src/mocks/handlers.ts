import { rest } from 'msw'

const quizzes = [
  {
    category: 'Geography',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which of these countries is located the FURTHEST away from the South China Sea?',
    correct_answer: 'Bangladesh',
    incorrect_answers: ['Malaysia', 'Vietnam', 'Philippines'],
  },
  {
    category: 'History',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'United States President John F. Kennedy was assassinated during his presidential motorcade in Atlanta, Georgia on November 22nd, 1963.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'History',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Which building was set aflame on August 24th, 1812?',
    correct_answer: 'The White House',
    incorrect_answers: [
      'Parliament Building',
      'Grand National Assembly Building',
      'Palace of the Nation',
    ],
  },
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Darth Vader&#039;s famous reveal to Luke is iconic. But which of these is the right one?',
    correct_answer: '&quot;No. I am your father.&quot;',
    incorrect_answers: [
      '&quot;Luke, I am your father.&quot;',
      '&quot;You&#039;re wrong. I am your father.&quot;',
      '&quot;The truth is that I am your father.&quot;',
    ],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Who is the English voice actor for Sora from the Kingdom Hearts series?',
    correct_answer: 'Haley Joel Osment',
    incorrect_answers: ['Kōki Uchiyama', 'Jesse McCartney', 'Miyu Irino'],
  },
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'What is the name of the supercomputer located in the control room in &quot;Jurassic Park&quot; (1993)?',
    correct_answer: 'Thinking Machines CM-5',
    incorrect_answers: ['Cray X-MP', 'Cray XK7', 'IBM Blue Gene/Q'],
  },
  {
    category: 'Celebrities',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Which school in Surrey, England did Steve Backshall attend?',
    correct_answer: 'Collingwood College',
    incorrect_answers: [
      'Tomlinscote School',
      'Kings International College',
      'Lyndhurst School',
    ],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Who released the 1991 album &quot;Out of Time&quot;?',
    correct_answer: 'R.E.M.',
    incorrect_answers: ['U2', 'Coldplay', 'The Rolling Stones'],
  },
  {
    category: 'History',
    type: 'multiple',
    difficulty: 'hard',
    question: 'The pantheon in Rome was used to worship what god?',
    correct_answer: 'Any god they wanted',
    incorrect_answers: ['Athena', 'Zeus', 'Both Athena and Zeus'],
  },
  {
    category: 'Geography',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which of the following is not a megadiverse country - one that harbors a high number of the earth&#039;s endemic species?',
    correct_answer: 'Thailand',
    incorrect_answers: ['Peru', 'Mexico', 'South Africa'],
  },
]

export const handlers = [
  rest.get('/quizzes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: quizzes }))
  }),
]
