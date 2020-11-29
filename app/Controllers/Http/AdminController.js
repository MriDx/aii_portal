'use strict'

const User = use('App/Models/User')
const WebAdmin = use('App/Models/WebAdmin')
const Product = use('App/Models/Product')
const Category = use('App/Models/Category')
const Image = use('App/Models/Image')
const Stock = use('App/Models/Stock')
const Size = use('App/Models/Size')
const HomeProduct = use('App/Models/HomeProduct')

class AdminController {

	async register({request, response, auth}) {
		//const user = await User.create(request.only(['name', 'email', 'password']))
		const user = await WebAdmin.create(request.only(['name', 'email', 'password']))

		await auth.login(user)
		return response.redirect('/dashboard')
	}

	async login({request, auth, response, session}) {
		const {email, password} = request.all()
		try {
			await auth.attempt(email, password)
			return response.redirect('/dashboard')
		} catch (error) {
			session.flash({loginError:'These credentials do not work'})
			return response.redirect('/')
		}
	}

	async logout({ request, auth, response, session }) {
		await auth.logout()
		return response.redirect('/')
	}

	async check({ request, view, auth, response }) {
		try {
			await auth.check()
			//let user = await auth.getUser()
			return response.redirect('/dashboard')

		} catch (error) {
			return view.render('index')
		}
	}

	async checkOnDashboard({ view, auth, response }) {
		try {
			await auth.check()
			let user = await auth.getUser()
			let products = await Product.query().getCount()
			let categories = await Category.query().getCount()
			let sizes = await Size.query().getCount()
			let home = await HomeProduct.query().getCount()
			return view.render('screens.dashboard', {
				status: 'success',
				message: 'auth success',
				user: user.toJSON(),
				products: products,
				categories: categories,
				sizes: sizes,
				home: home
				}
			)
			return response.redirect('/dashboard')
		} catch (error) {
			//return view.render('screens.dashboard', {status: 'failed', message:'auth failed'})
			return response.redirect('/')
		}
	}

	async checkOnDescAdd({ view, params: {id}, auth, response }) {
		try {
			//await auth.check()
			let user = await auth.getUser()
			let product = await Product.findByOrFail('id', id)
			let category = await Category.findBy('id', product.category_id)
			return view.render('screens.product_desc', {
				user: user.toJSON(),
				product: product.toJSON(),
				category: category.toJSON()
			})
			return response.redirect('/dashboard')
		} catch (error) {
			return view.render('screens.product_desc', {error: error})
			return response.redirect('/')
		}
		/* try {
			await auth.check()
			let user = await auth.getUser()
			return view.render('screens.product_desc', {status: 'success', message:'auth success', user: user.toJSON() })
			return response.redirect('/dashboard')
		} catch (error) {
			//return view.render('screens.dashboard', {status: 'failed', message:'auth failed'})
			return response.redirect('/')
		} */
	}

}

module.exports = AdminController
