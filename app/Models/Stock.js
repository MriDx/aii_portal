'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Stock extends Model {

	product() {
		return this.belongsTo('App/Models/Product');
	}

	size() {
		return this.belongsTo('App/Models/Size');
	}

	cart() {
		return this.belongsToMany('App/Models/Cart')
	}
}

module.exports = Stock
