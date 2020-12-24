'use strict'

const Route = use('Route')

Route.post('api/test', 'AdminController.test')
Route.get('api/t', 'AdminController.t')