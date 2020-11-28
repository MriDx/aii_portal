'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Size extends Model {

	product() {
		return this.hasMany('App/Models/Product');
	}

	orderitem() {
		return this.belongsToMany('App/Models/OrderItem')
	}
}

module.exports = Size
