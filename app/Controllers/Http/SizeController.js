'use strict'

const Size = use('App/Models/Size')

class SizeController {

	async checkSize({ auth, view , response}) {
		try {
			let user = await auth.getUser()
			return view.render('screens.add-size', {user: user.toJSON()})
		} catch (error) {
			return response.redirect('/')
		}
	}

	async addSize({ request, auth, view, response }) {
		try {
			let user = await auth.getUser()
			let size = await Size.create(request.only(['name', 'slug']))
			return view.render('screens.add-size', {user: user.toJSON(), status: 'success', message: 'Size Added'})
		} catch (error) {
			return response.redirect('/')
		}
	}

}

module.exports = SizeController
