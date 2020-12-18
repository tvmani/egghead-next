import React, {FunctionComponent, useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import findQuestionSet from '../../../data/findSurveyQuestionSets'
import QuestionReveal from '../../mdx/QuestionReveal.js'

type QuizProps = any

const Quiz: FunctionComponent<QuizProps> = (props) => {
  const questionSet = findQuestionSet(props.slug)

  console.log({slug: props.slug, questionSet: questionSet})

  if (questionSet) {
    return (
      <QuestionReveal question={questionSet.questions[0].text}>
        <ReactMarkdown>{questionSet.questions[0].value}</ReactMarkdown>
      </QuestionReveal>
    )
  } else {
    return <div>nothing</div>
  }
}

export default Quiz
