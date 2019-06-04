const path = require('path')
const fs = require('fs')

const BasePath = path.join(path.resolve(), 'app/', 'model/')

const models = {}

function loadFile() {
    let files = fs.readdirSync(BasePath)
    files.forEach(file => {
        let fileName = path.join(BasePath, file)
        let fileStat = fs.statSync(fileName)
        if(!fileStat.isFile() || file === 'index.js') return
        let model = require(fileName)
        models[file.substring(0, file.length-3)] = model
    })
}
loadFile()

module.exports = models

