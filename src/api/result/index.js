import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Result, { schema } from './model'

const router = new Router()
const { answers, score } = schema.tree

/**
 * @api {post} /results Create result
 * @apiName CreateResult
 * @apiGroup Result
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam answers Result's answers.
 * @apiParam score Result's score.
 * @apiSuccess {Object} result Result's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Result not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ answers, score }),
  create)

/**
 * @api {get} /results Retrieve results
 * @apiName RetrieveResults
 * @apiGroup Result
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of results.
 * @apiSuccess {Object[]} rows List of results.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /results/:id Retrieve result
 * @apiName RetrieveResult
 * @apiGroup Result
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} result Result's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Result not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /results/:id Update result
 * @apiName UpdateResult
 * @apiGroup Result
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam answers Result's answers.
 * @apiParam score Result's score.
 * @apiSuccess {Object} result Result's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Result not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ answers, score }),
  update)

/**
 * @api {delete} /results/:id Delete result
 * @apiName DeleteResult
 * @apiGroup Result
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Result not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
