'use strict'

const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const Image = use('App/Models/Image')
const Stock = use('App/Models/Stock')
const Size = use('App/Models/Size')

const Helpers = use('Helpers')
const Drive = use('Drive')

class ProductaddController {

	async all({ response, view, auth }) {
		try {
			let user = await auth.getUser()
			let products = await Product.all()
			return view.render('screens.products', {products: products.toJSON(), user: user.toJSON()})
		} catch (error) {
			return response.redirect('/')
		}
	}

	async cats({ auth, response, view }) {
		try {
			//await auth.check()
			let user = await auth.getUser()
			let categories = await Category.all()
			//return response.redirect('/add-new-product', {categories: categories.toJSON()})
			return view.render('screens.addproduct1', {categories: categories.toJSON(), user: user.toJSON()})
		} catch (error) {
			return response.redirect('/')
		}
	}

	async createProduct({ auth, request, response, view }) {
		try {
			if (await auth.check()) {
				let product = await Product.create(request.only(['name', 'brand_name', 'color', 'category_id']))
				/* return view.render('screens.addproduct', {
					product: product.toJSON(),
					status: 'success',
					message: 'Product created !'
				}) */
				return response.redirect('/product-description/'+product.id)
			}
		} catch (error) {
			return view.render('screens.addproduct', {
				status: 'danger',
				//message: 'Failed to create product'
				message: error
			})
		}
	}

	/* async p({ request, params: { id }, view, response, view }) {
		try {
			let user = await auth.check()
			let user = await auth.getUser()
			let product = await Product.findByOrFail('id', id)
			return view.render('screens.product_desc', {
				status: 'success',
				message: 'auth success',
				user: user.toJSON(),
				product: product.toJSON()
			})
			return response.redirect('/dashboard')
		} catch (error) {
			//return view.render('screens.dashboard', {status: 'failed', message:'auth failed'})
			return response.redirect('/')
		}
	}
 */
	async addDesc({ request, params, auth, view, response }) {
		const { product_id } = request.all()
		try {
			let user = await auth.getUser()
			let product = await Product.findByOrFail('id', product_id)
			let desc = await product.description().create(request.only([
				'unit', 'material', 'color', 'fit', 'sleeve', 'pattern', 'description', 'product_id'
			]))
			return response.redirect('/product-image/'+product_id)
		} catch (error) {
			return view.render('screens.product_desc', {
				status: 'danger',
				message: 'Something went wrong'
			})
		}
	}

	async productImage({ request, params: { id }, auth, view, response }) {
		try {
			let user = await auth.getUser()
			let product = await Product.findByOrFail('id', id)
			let images = await product.image().fetch()
			let category = await Category.findBy('id', product.category_id)
			return view.render('screens.product_image', {
				images: images.toJSON(),
				user: user.toJSON(),
				product: product.toJSON(),
				category: category.toJSON()
			})
		} catch (error) {
			return response.redirect('/')
		}
	}

	async addImage({ request, auth, view, response }) {
		const { id } = request.all()
		//return view.render('screens.product_image', { error: 'bal kela', id: id, product: '' })
		let product = await Product.findByOrFail('id', id)
		try {
			const validationOptions = {
				types: ['image'],
				size: '1mb',
			}
			let user = await auth.getUser()
			let product = await Product.findByOrFail('id', id)
			const imageFile = request.file('image', validationOptions)
			await imageFile.move(Helpers.publicPath('product'), {
				name: `${id}_${new Date().getTime()}.${imageFile.subtype}`,
				overwrite: true,
			})
			if (!imageFile.moved()) {
				throw imageFile.error()
			}
			const img = await Image.create({ product_id: id, url: `product/${imageFile.fileName}` })
			let images = await product.image().fetch()
			//return view.render('screens.product_image', { user: user.toJSON(), product: product, images: images.toJSON(), message: 'Image added' })
			return response.redirect('/product-image/'+id)
		} catch (error) {
			return view.render('screens.product_image', { error: error, id: id, status: 'danger', message: 'Failed to add Image'})
			//response.redirect('/product-image/id')
		}
	}


	async checkStock({ request, view, params: { id }, response, auth }) {
		try {
			let user = await auth.getUser()
			let product = await Product.findByOrFail('id', id)
			let category = await Category.findBy('id', product.category_id)
			let stock = await product.stock().with('size').fetch()
			let sizes = await Size.all()
			return view.render('screens.product-stock', {
				stocks: stock.toJSON(),
				sizes: sizes.toJSON(),
				user: user.toJSON(),
				product: product.toJSON(),
				category: category.toJSON()
			})
		} catch (error) {
			return view.render('screens.product-stock', {
				error: error
			})
			return response.redirect('/dashboard')
		}
	}

	async addStock({ request, view, auth, response }) {
		const { id, size_id, stock, mrp, price, discount } = request.all()
		//return view.render('screens.product-stock', {id: id, size_id: size_id})
		try {
			let user = await auth.getUser()
			let m = await Stock.findBy({product_id: id, size_id: size_id})
			if (m == null) {
				m = await Stock.create({
					product_id: id,
					size_id: size_id,
					stock: stock,
					price: price,
					mrp: mrp,
					discount: discount
				})
			}
			let r
			if (await m.stock > 0) {
				r = await Product.query().where('id', id).update({'stock': true})
			} else {
				r = await Product.query().where('id', id).update({'stock': false})
			}
			return response.redirect('/add-stock/'+id)
			return response.json({
				status: 'success',
				stock: m,
				affected: r
			})
		} catch (error) {
			return view.render('screens.product-stock', {error: error})
			return response.status(403).json({
				status: 'failed',
				error
			})
			}


	}


}

module.exports = ProductaddController
