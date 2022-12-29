import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import React from 'react'

type Props = {
  onChange: (e: React.ChangeEvent) => void
  value: string
}

const IncorrectAnswerNote = ({ onChange, value }: Props) => {
  return (
    <IncorrectAnswerNoteWrapper>
      <TextField
        onChange={onChange}
        value={value}
        style={{ width: '100%' }}
        label="오답 노트"
        multiline
        rows={3}
      />
    </IncorrectAnswerNoteWrapper>
  )
}

const IncorrectAnswerNoteWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`

export default IncorrectAnswerNote
