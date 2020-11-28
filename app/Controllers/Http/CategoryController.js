'use strict'

const Category = use('App/Models/Category')

const Helpers = use('Helpers')
const Drive = use('Drive')

class CategoryController {

	async viewAll({ view, auth, response }) {
		try {
			let user = await auth.getUser()
			let categories = await Category.query().withCount('products').fetch()
			return view.render('screens.categories', {
				user: user.toJSON(),
				categories: categories.toJSON()
				//status: 'success', message : 'Category Created'
			})
		} catch (error) {
			return response.redirect('/')
		}
	}

	async checkAdd({ view, auth, response, request }) {
		try {
			let user = await auth.getUser()
			return view.render('screens.add-category', {user: user.toJSON()})
		} catch (error) {
			return response.redirect('/')
		}
	}

	async addCategory({ request, auth, view, response }) {
		const {name} = request.all()
		try {
			let user = await auth.getUser()
			const validationOptions = {
				types: ['image'],
				size: '1mb',
			}
			const imageFile = request.file('image', validationOptions)
			let imageName = name.replace(/\s/g, "")
			await imageFile.move(Helpers.publicPath('category'), {
				//name: `${id}_${new Date().getTime()}.${imageFile.subtype}`,
				name: `${imageName}.png`,
				overwrite: true,
			})
			if (!imageFile.moved()) {
				throw imageFile.error()
			}
			let catgory = await Category.create({
				name: name,
				image: `category/${imageName}.png`
			})
			return view.render('screens.add-category', {user: user.toJSON(), status: 'success', message : 'Category Created'})
			return response.redirect('back', {user: user.toJSON(), status: 'success', message : 'Category Created'})
			return view.render('screens.add-category', {user: user.toJSON()})
		} catch (error) {
			return view.render('screens.add-category', {
				error: error,
				status: 'danger',
				message: error.message
			})
			return response.redirect('/')
		}
	}

}

module.exports = CategoryController
