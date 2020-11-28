'use strict'

class register {
  get rules () {
    return {
      // validation rules
      email: 'required|unique:web_admins',
      password: 'required',
      name: 'required'
    }
  }

  getMessages() {
    return {
      'required': '{{ field }} is required.',
      'unique': '{{ field }} already exists'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()

    return this.ctx.response.redirect('back')
  }

}

module.exports = register
