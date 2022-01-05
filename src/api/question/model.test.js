import { Question } from '.'

let question

beforeEach(async () => {
  question = await Question.create({ question: 'test', type: 'test', options: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = question.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(question.id)
    expect(view.question).toBe(question.question)
    expect(view.type).toBe(question.type)
    expect(view.options).toBe(question.options)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = question.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(question.id)
    expect(view.question).toBe(question.question)
    expect(view.type).toBe(question.type)
    expect(view.options).toBe(question.options)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
