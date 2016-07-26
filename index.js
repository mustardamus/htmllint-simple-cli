#!/usr/bin/env node
'use strict'

const path = require('path')
const fs = require('fs')
const htmllint = require('htmllint')
const commander = require('commander')
const chalk = require('chalk')
const globby = require('globby')
const camelCase = require('camelcase')

// htmllint options: https://github.com/htmllint/htmllint/wiki/Options

const parseList = function (val) {
  return val.split(',')
}

commander
  .version('0.1.0')
  .option('-f, --files <globs>', 'Files to lint, can have wildcards and multiple locations: "a/*.html, b/**/*.html"', parseList)
  .option('--attr-bans <attributes>', '', parseList)
  .option('--attr-name-ignore-regex <regex>')
  .option('--attr-name-style <style>')
  .option('--attr-no-dup')
  .option('--attr-no-unsafe-char')
  .option('--attr-quote-style <style>')
  .option('--attr-req-value')
  .option('--class-style <style>')
  .option('--class-no-dup')
  .option('--doctype-first [val]')
  .option('--doctype-html5')
  .option('--fig-req-figcaption')
  .option('--focusable-tabindex-style')
  .option('--head-req-title')
  .option('--href-style <style>')
  .option('--html-req-lang')
  .option('--id-class-ignore-regex <regex>')
  .option('--id-class-no-ad')
  .option('--id-class-style <style>')
  .option('--id-no-dup')
  .option('--img-req-alt [val]')
  .option('--img-req-src')
  .option('--indent-style <style>')
  .option('--indent-width <width>', '', parseInt)
  .option('--indent-width-cont')
  .option('--label-req-for')
  .option('--line-end-style <style>')
  .option('--line-max-len')
  .option('--line-max-len-ignore-regex')
  .option('--spec-char-escape')
  .option('--table-req-caption')
  .option('--tag-bans <tags>', '', parseList)
  .option('--tag-close')
  .option('--tag-name-lowercase')
  .option('--tag-name-match')
  .option('--tag-self-close')
  .option('--title-max-len <length>', '', parseInt)
  .option('--title-no-dup')
  .parse(process.argv)

let lintOptions = {}

for (let opt of commander.options) {
  let key = camelCase(opt.long)

  if (commander[key] && key !== 'version' && key !== 'files') {
    lintOptions[opt.long.replace('--', '')] = commander[key]
  }
}

if (!commander.files) {
  commander.files = ['**/*.html']
}

for (let filePath of globby.sync(commander.files)) {
  let fullPath = path.join(process.cwd(), filePath)
  let content = fs.readFileSync(fullPath, 'utf8')

  htmllint(content, lintOptions).then((issues) => {
    for (let issue of issues) {
      let message = issue.msg || htmllint.messages.renderIssue(issue)

      console.log(
        chalk.yellow(filePath),
        chalk.grey('Line: ' + chalk.red(issue.line)),
        chalk.grey('Column: ' + chalk.red(issue.column)),
        chalk.grey('-'), chalk.red(message),
        chalk.grey('(' + issue.rule + ')')
      )
    }
  })
}
