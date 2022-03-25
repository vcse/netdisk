'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_URL: '"/api"',
  VUE_APP_SECRET_KEY: '"TFGJKL98G9FG"'
})
