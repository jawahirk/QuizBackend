import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Result } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, result

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  result = await Result.create({})
})

test('POST /results 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, answers: 'test', score: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.answers).toEqual('test')
  expect(body.score).toEqual('test')
})

test('POST /results 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /results 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /results 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /results 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /results 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /results/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${result.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(result.id)
})

test('GET /results/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${result.id}`)
  expect(status).toBe(401)
})

test('GET /results/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /results/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${result.id}`)
    .send({ access_token: userSession, answers: 'test', score: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(result.id)
  expect(body.answers).toEqual('test')
  expect(body.score).toEqual('test')
})

test('PUT /results/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${result.id}`)
  expect(status).toBe(401)
})

test('PUT /results/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, answers: 'test', score: 'test' })
  expect(status).toBe(404)
})

test('DELETE /results/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${result.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /results/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${result.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /results/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${result.id}`)
  expect(status).toBe(401)
})

test('DELETE /results/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
