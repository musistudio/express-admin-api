const path = require('path')
const fs = require('fs')

const BasePath = path.join(path.resolve(), 'app/', 'service/')

const services = {}

function loadFile() {
    let files = fs.readdirSync(BasePath)
    files.forEach(file => {
        let fileName = path.join(BasePath, file)
        let fileStat = fs.statSync(fileName)
        if(!fileStat.isFile() || file === 'index.js') return
        let service = require(fileName)
        services[file.substring(0, file.length-3)] = service
    })
}
loadFile()

module.exports = services

