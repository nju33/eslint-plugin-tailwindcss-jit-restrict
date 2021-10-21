/**
 * @fileoverview Rule to restrict usable arbitrary values
 * @author nju33
 */

'use strict'

const minimatch = require('minimatch')
const { Settings } = require('../settings')

const ARBITARY_PATTERN = /\b(?:[^:]+:)*?(?:[^-]+-)\[.+?\]/gm
const generateRegExp = () => ARBITARY_PATTERN

/**
 * @typedef {'forbidden'} MessageIds
 */

/**
 * @typedef {import("@typescript-eslint/experimental-utils").TSESLint.RuleModule<MessageIds, {}>} RuleModule
 */

/**
 * @typedef {import("@typescript-eslint/experimental-utils").TSESLint.RuleContext<MessageIds, {}>} RuleContext
 */

/**
 * @typedef {import("@typescript-eslint/experimental-utils").TSESTree.Literal | import("@typescript-eslint/experimental-utils").TSESTree.TemplateElement} HandlingNodes
 */

class ReportBuilder {
  /**
   *
   * @param {object} [_value]
   */
  constructor(_value = {}) {
    this._value = _value
  }

  getValue() {
    return this._value
  }

  /**
   * @param {string} value
   * @returns this
   */
  value(value) {
    return new ReportBuilder({ ...this._value, value })
  }

  /**
   * @param {number} startLine
   * @returns this
   */
  startLine(startLine) {
    return new ReportBuilder({ ...this._value, startLine })
  }

  /**
   * @param {number} startColumn
   * @returns this
   */
  startColumn(startColumn) {
    return new ReportBuilder({ ...this._value, startColumn })
  }

  /**
   * @param {number} endLine
   * @returns this
   */
  endLine(endLine) {
    return new ReportBuilder({ ...this._value, endLine })
  }

  /**
   * @param {number} endColumn
   * @returns this
   */
  endColumn(endColumn) {
    return new ReportBuilder({ ...this._value, endColumn })
  }

  /**
   * @param {number} rangeStart
   * @returns this
   */
  rangeStart(rangeStart) {
    return new ReportBuilder({ ...this._value, rangeStart })
  }

  /**
   * @param {number} rangeEnd
   * @returns this
   */
  rangeEnd(rangeEnd) {
    return new ReportBuilder({ ...this._value, rangeEnd })
  }
}

class ForbiddenReport {
  static messageId = 'forbidden'

  /**
   * @param {ReadOnly<RuleContext>} context
   */
  constructor(context) {
    /** @readonly */
    this.context = context
  }

  /**
   * @param {ReportBuilder} builder
   */
  report(builder) {
    this.context.report({
      messageId: ForbiddenReport.messageId,
      data: {
        value: builder.getValue().value
      },
      loc: {
        start: {
          line: builder.getValue().startLine,
          column: builder.getValue().startColumn
        },
        end: {
          line: builder.getValue().endLine,
          column: builder.getValue().endColumn
        }
      },
      suggest: [
        {
          desc: `Remove \`${builder.getValue().value}\``,
          fix: (fixer) => {
            return fixer.removeRange([
              builder.getValue().rangeStart,
              builder.getValue().rangeEnd
            ])
          }
        }
      ]
    })
  }
}

/** @type {(context: ReadOnly<RuleContext>) => (node: HandlingNodes) => any} */
const process = (context) => (node) => {
  const settings = new Settings(context.settings[Settings.settingName])
  const re = generateRegExp()
  const startLine = node.loc.start.line
  /** @type string[] */
  let lines
  if (node.type === 'Literal') {
    lines = node.raw.split('\n')
  } else if (node.type === 'TemplateElement') {
    lines = node.value.raw.split('\n')
  }

  /** @type {number} */
  let rangeStart = node.range[0]
  lines.forEach((line, index) => {
    const currentLine = startLine + index
    const startColumn = index === 0 ? node.loc.start.column : 0
    /** @type {RegExpExecArray} */
    let currentArbitraryValue
    while ((currentArbitraryValue = re.exec(line)) != null) {
      const value = currentArbitraryValue[0]

      const matchesWhiteList = settings
        .getWhiteList()
        .some((stringOrPattern) => {
          return stringOrPattern === value || minimatch(value, stringOrPattern)
        })
      if (matchesWhiteList) {
        continue
      }

      let reportBuilder = new ReportBuilder()
      reportBuilder = reportBuilder.value(currentArbitraryValue[0])
      reportBuilder = reportBuilder.startLine(currentLine)
      reportBuilder = reportBuilder.startColumn(
        startColumn + currentArbitraryValue.index
      )
      reportBuilder = reportBuilder.endColumn(
        startColumn + currentArbitraryValue.index + value.length
      )
      reportBuilder = reportBuilder.rangeStart(
        rangeStart + currentArbitraryValue.index
      )
      reportBuilder = reportBuilder.rangeEnd(
        rangeStart + currentArbitraryValue.index + value.length
      )

      const forbiddenReport = new ForbiddenReport(context)
      forbiddenReport.report(reportBuilder)
    }

    rangeStart += line.length + 1 // new-line
    if (index === 0) {
      rangeStart += 1 // first `
    }
  })
}

/**
 * @type {RuleModule}
 */
module.exports = {
  type: 'suggestion',
  meta: {
    docs: {
      description: 'Restrict usable arbitrary values',
      category: 'Possible Problems',
      recommended: 'error'
    },
    messages: {
      forbidden: '{{ value }} is forbidden.'
    },
    hasSuggestions: true,
    deprecated: false
  },
  create: (context) => {
    return {
      Literal: process(context),
      TemplateElement: process(context)
    }
  }
}
