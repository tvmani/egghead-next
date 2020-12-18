import find from 'lodash/find'

import {QuestionSet} from './courses/questionTypes'
import scaleReactDevelopmentWithNx from './courses/scale-react-development-with-nx-4038'
import leafletGuideQuestionSet from './courses/build-maps-with-react-leaflet'

const questionSets = [
  ...scaleReactDevelopmentWithNx.lessonQuestionSets,
  ...leafletGuideQuestionSet.lessonQuestionSets,
]

const findLessonQuestionSet = (resourceSlug: string) =>
  find(questionSets, {id: resourceSlug})

export default findLessonQuestionSet
