const fs = require('fs')
const path = require('path')
const srcDir = path.resolve(__dirname, '../src')

const ignoreTag = '.'

function getAllEntry(srcDir) {
    const allEntry = []
    const files = fs.readdirSync(srcDir)
    files.filter(fileName => !fileName.startsWith(ignoreTag))
        .forEach(fileName => {
        const fileDir = path.join(srcDir, fileName)
        const stats = fs.statSync(fileDir)
        if (stats.isFile()) {
            allEntry.push(fileDir)
        } else if (stats.isDirectory()) {
            const childrenEntry = getAllEntry(fileDir)
            allEntry.push(...childrenEntry)
        }
    })
    return allEntry
}

const entryList = getAllEntry(srcDir)

module.exports = {
    entryList
}
