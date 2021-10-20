'use strict'

/**
 * @type {import("@typescript-eslint/experimental-utils").TSESLint.RuleModule<'default', {}>}
 */
module.exports = {
  meta: {
    docs: {
      description: '',
      category: '',
      recommended: false
    },
    messages: {
      default: '{{ message }}'
    },
    schema: []
  },
  create: (context) => {
    return {
      Identifier: (node) => {
        context.report({
          node: node,
          messageId: 'default',
          data: {
            message: 'Identifiers not allowed for Super Important reasons.'
          }
        })
      }
    }
  }
}
