const fs = require('fs')
const path = require('path')

const defaultRootDir = path.resolve(__dirname, '../src/main.ts')
const modulesRootDir = path.resolve(__dirname, '../src/modules')

const EXCLUDES_FILE_PREFIX = ['_', 'index']
const EXCLUDES_FILE_SUFFIX = ['.spec.ts', '.type.ts']
const INCLUDES_FILE_SUFFIX = ['.ts']

function validateFileName (fileName) {
    let isValid = true
    isValid = EXCLUDES_FILE_PREFIX.reduce((previousValue, currentValue) => {
        if (!previousValue) return previousValue
        return !fileName.startsWith(currentValue)
    }, isValid)
    isValid = EXCLUDES_FILE_SUFFIX.reduce((previousValue, currentValue) => {
        if (!previousValue) return previousValue
        return !fileName.endsWith(currentValue)
    }, isValid)
    if (!isValid) return isValid
    isValid = INCLUDES_FILE_SUFFIX.reduce((previousValue, currentValue) => {
        if (!previousValue) return previousValue
        return fileName.endsWith(currentValue)
    }, isValid)
    return isValid
}

/**
 * @param srcDir
 * @return {string[]}
 */
function getAllEntry(srcDir) {
    const allEntry = [defaultRootDir]
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

const moduleList = getAllEntry(modulesRootDir)

module.exports = moduleList
