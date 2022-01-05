import { Result } from '.'

let result

beforeEach(async () => {
  result = await Result.create({ answers: 'test', score: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = result.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(result.id)
    expect(view.answers).toBe(result.answers)
    expect(view.score).toBe(result.score)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = result.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(result.id)
    expect(view.answers).toBe(result.answers)
    expect(view.score).toBe(result.score)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
