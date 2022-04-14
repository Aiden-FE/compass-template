const fs = require('fs')
const path = require('path')
const srcDir = path.resolve(__dirname, '../src')

const EXCLUDES_FILE_PREFIX = ['_', 'index']
const INCLUDES_FILE_SUFFIX = ['.ts']

function validateFileName (fileName) {
    let isValid = true
    isValid = EXCLUDES_FILE_PREFIX.reduce((previousValue, currentValue) => {
        if (!previousValue) return previousValue
        return !fileName.startsWith(currentValue)
    }, isValid)
    if (!isValid) return isValid
    isValid = INCLUDES_FILE_SUFFIX.reduce((previousValue, currentValue) => {
        if (!previousValue) return previousValue
        return fileName.endsWith(currentValue)
    }, isValid)
    return isValid
}

function getAllEntry(srcDir) {
    const allEntry = []
    const files = fs.readdirSync(srcDir)
    files.forEach(fileName => {
        const fileDir = path.join(srcDir, fileName)
        const stats = fs.statSync(fileDir)
        if (stats.isFile()
            && validateFileName(fileName)
        ) {
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
