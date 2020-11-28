'use strict'

class createCategory {
  get rules () {
    return {
      // validation rules
      name: 'required|unique:categories',
      image: 'required'
    }
  }

  getMessage() {
    return {
      require: '{{ field }} is required',
      unique: '{{ field }} is already exist'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }

}

module.exports = createCategory
