require('dotenv').config()
const shell = require('shelljs')
shell.config.fatal = true
console.log('NPM Token: ', process.env.NPM_AUTH_TOKEN)

if (process.env.NPM_AUTH_TOKEN) {
  shell.exec('rush publish --publish --include-all')
} else {
  throw new Error('未提供NPM_AUTH_TOKEN,无法发布')
}
