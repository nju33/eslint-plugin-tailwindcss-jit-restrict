'use strict'

const { TSESLint } = require('@typescript-eslint/experimental-utils')
const constraint = require('../rules/constraint')

const tester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  }
})

tester.run('constraint', constraint, {
  valid: [],
  invalid: [
    {
      filename: 'fixtures/test.tsx',
      code: `
import {use} from '@hooks/asf/sfas/asfasdf'

const a = 'text-lg bg-white'
const b = clsx('flex', true && 'flex-column')

const el = <div className={clsx(a, "transform")} id="a"></div>
const el2 = <div className={"z-10"} id="a"></div>
      `,
      errors: [{ messageId: 'default' }]
    }
  ]
})
