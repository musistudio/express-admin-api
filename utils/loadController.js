const path = require('path')
const fs = require('fs')

const Controllers = {}
const BasePath = path.join(path.resolve(), 'app/', 'controller/')

function loadFile(modules) {
    Controllers[modules] = {}
    let modulePath = path.join(BasePath, modules)
    let files = fs.readdirSync(modulePath)
    files.forEach(file => {
        let fileName = path.join(modulePath, file)
        let fileStat = fs.statSync(fileName)
        if(!fileStat.isFile()) return
        let moduleName = require(fileName)
        Controllers[modules][file.slice(0,-3)] = new moduleName()
    })
}

(function (BasePath) {
    let dirs = fs.readdirSync(BasePath)
    dirs.forEach(dir => {
        let dirStat = fs.statSync(path.join(BasePath, dir))
        if(dirStat.isDirectory()) loadFile(dir)
    })
})(BasePath)

module.exports = Controllers
