'use strict'

class createSize {
  get rules () {
    return {
      // validation rules
      name: 'required|unique:sizes',
      slug: 'required|unique:sizes'
    }
  }

  getMessage() {
    return {
      required: '{{ field }} is required',
      unique: '{{ field }} is already exist'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = createSize
