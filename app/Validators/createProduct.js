'use strict'

class createProduct {
  get rules () {
    return {
      name: 'required',
      brand_name: 'required',
      color: 'required',
      category_id:'required|number'
    }
  }

  getMessages() {
    return {
      'required': '{{ field }} is required.',
      'number': '{{ field }} sould be a number'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = createProduct
