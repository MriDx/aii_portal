'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

	size() {
		return this.belongsToMany('App/Models/Size');
	}

	stock() {
		//return this.belongsToMany('App/Models/Stock');
		return this.hasMany('App/Models/Stock');
	}

	image() {
		return this.hasMany('App/Models/Image');
	}

	cart() {
		return this.hasMany('App/Models/Cart')
	}

	orderitems() {
		return this.belongsToMany('App/Models/OrderItem')
	}

	category() {
		return this.belongsTo('App/Models/Category')
	}

	featured() {
		return this.belongsTo('App/Models/Featured')
	}

	reviews() {
		return this.hasMany('App/Models/Review')
	}

	description() {
		return this.hasOne('App/Models/ProductDescription')
	}

	tags() {
		return this.hasOne('App/Models/Tag')
	}



}

module.exports = Product
