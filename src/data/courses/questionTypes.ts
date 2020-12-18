type MultipleChoiceAnswer = {
  text: String
  value: String
  next?: String
  complete?: Boolean
}

type MultipleChoice = {
  id: String
  version: String
  type: 'multiple-choice'
  text: String
  correctAnswer: String
  other?: Boolean
  multiple?: Boolean
  required?: Boolean
  choices: MultipleChoiceAnswer[]
}

type Essay = {
  id: String
  version: String
  type: 'essay'
  text: String
}

type Theater = {
  id: String
  version: String
  type: 'theater'
  value: String
  text: String
}

type TrueFalse = {
  id: String
  version: String
  correctAnswer: 'true' | 'false'
  type: 'trueFalse'
  text: String
}

export type Question = TrueFalse | Essay | Theater | MultipleChoice

export type QuestionSet = {
  id: String
  version: String
  questions: Question[]
}

export type CourseQuestions = {
  courseSlug: String
  lessonQuestionSets: QuestionSet[]
}
