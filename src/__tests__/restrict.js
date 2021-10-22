'use strict'

const fs = require('fs')
const path = require('path')
const { TSESLint } = require('@typescript-eslint/experimental-utils')
const restrict = require('../rules/restrict')

const tester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

tester.run('restrict', restrict, {
  valid: [],
  invalid: [
    {
      code: fs
        .readFileSync(
          path.join(__dirname, '../fixtures', 'a-variable-in-a-line.ts'),
          'utf-8'
        )
        .trim(),
      errors: [
        { messageId: 'forbidden' },
        {
          messageId: 'forbidden',
          suggestions: [
            {
              // @ts-ignore
              desc: 'Remove `h-[918px]`',
              output: `;(() => {
  const className = 'w-[762px]       md:top-[-400px]'
})()`
            }
          ]
        },
        { messageId: 'forbidden' }
      ]
    },
    {
      code: fs
        .readFileSync(
          path.join(__dirname, '../fixtures', 'a-variable-in-a-line.ts'),
          'utf-8'
        )
        .trim(),
      options: [{ whiteList: ['w-\\[@(762|766)px\\]', 'h-*'] }],
      errors: [{ messageId: 'forbidden' }]
    },
    {
      code: fs
        .readFileSync(
          path.join(__dirname, '../fixtures', 'a-variable-in-a-line.ts'),
          'utf-8'
        )
        .trim(),
      settings: {
        'tailwindcss-jit-restrict': {
          whiteList: ['w-[762px]', 'h-*']
        }
      },
      errors: [{ messageId: 'forbidden' }]
    },
    {
      code: fs
        .readFileSync(
          path.join(__dirname, '../fixtures', 'a-variable-in-multiple-line.ts'),
          'utf-8'
        )
        .trim(),
      errors: [
        { messageId: 'forbidden' },
        { messageId: 'forbidden' },
        {
          messageId: 'forbidden',
          suggestions: [
            {
              // @ts-ignore
              desc: 'Remove `md:top-[-400px]`',
              output: `
;(() => {
  const className = \`w-[762px]
  h-[918px]




      



md:bottom-[400px]\`
})()
              `.trim()
            }
          ]
        },
        { messageId: 'forbidden' }
      ]
    },
    {
      code: fs
        .readFileSync(
          path.join(__dirname, '../fixtures', 'jsx-class-name.tsx'),
          'utf-8'
        )
        .trim(),
      errors: [
        { messageId: 'forbidden' },
        { messageId: 'forbidden' },
        { messageId: 'forbidden' }
      ]
    },
    {
      code: fs
        .readFileSync(
          path.join(
            __dirname,
            '../fixtures',
            'jsx-class-name-with-a-utility.tsx'
          ),
          'utf-8'
        )
        .trim(),
      errors: [
        { messageId: 'forbidden' },
        { messageId: 'forbidden' },
        { messageId: 'forbidden' }
      ]
    }
  ]
})
