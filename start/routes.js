'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('index')

Route.get('/', 'AdminController.check')

//Route.post('/register', 'AdminController.register').validator('register')
Route.post('/login', 'AdminController.login')

Route.get('/logout', 'AdminController.logout')

//Route.on('/dashboard').render('screens.dashboard')
Route.get('/dashboard', 'AdminController.checkOnDashboard')

//Route.on('/add-new-product').render('screens.addproduct')
Route.get('/add-new-product', 'ProductaddController.cats')
Route.post('/add-new-product', 'ProductaddController.createProduct').validator('createProduct')

Route.get('/product-description/:id', 'AdminController.checkOnDescAdd')
Route.post('/product-description', 'ProductaddController.addDesc')

Route.get('/product-image/:id', 'ProductaddController.productImage')
Route.post('product-image', 'ProductaddController.addImage')

Route.get('/add-stock/:id', 'ProductaddController.checkStock')
Route.post('add-stock', 'ProductaddController.addStock')


Route.get('/categories', 'CategoryController.viewAll')
Route.get('/add-category', 'CategoryController.checkAdd')
Route.post('/add-category', 'CategoryController.addCategory').validator('createCategory')

Route.get('/add-size', 'SizeController.checkSize')
Route.post('/add-size', 'SizeController.addSize').validator('createSize')

Route.get('/products', 'ProductaddController.all')

//Route.on('/add-to-home').render('screens.add-to-home')
Route.get('/add-to-home', 'ProductaddController.checkHome')
Route.get('/add-to-home/:product_id', 'ProductaddController.addHome')


Route.get('/home-products', 'ProductaddController.home')
