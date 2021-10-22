const restrict = require('./rules/restrict')

module.exports = {
  rules: {
    restrict
  },
  configs: {
    all: {
      rules: {
        restrict: 'error'
      }
    }
  }
}
