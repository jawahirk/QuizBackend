import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Question, { schema } from './model'

const router = new Router()
const { question, type, options } = schema.tree

/**
 * @api {post} /questions Create question
 * @apiName CreateQuestion
 * @apiGroup Question
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam question Question's question.
 * @apiParam type Question's type.
 * @apiParam options Question's options.
 * @apiSuccess {Object} question Question's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Question not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ question, type, options }),
  create)

/**
 * @api {get} /questions Retrieve questions
 * @apiName RetrieveQuestions
 * @apiGroup Question
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of questions.
 * @apiSuccess {Object[]} rows List of questions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /questions/:id Retrieve question
 * @apiName RetrieveQuestion
 * @apiGroup Question
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} question Question's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Question not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /questions/:id Update question
 * @apiName UpdateQuestion
 * @apiGroup Question
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam question Question's question.
 * @apiParam type Question's type.
 * @apiParam options Question's options.
 * @apiSuccess {Object} question Question's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Question not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ question, type, options }),
  update)

/**
 * @api {delete} /questions/:id Delete question
 * @apiName DeleteQuestion
 * @apiGroup Question
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Question not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
