const fs = require('fs')
const p = require('path')
const jsdom = require('jsdom')

const frontendBuildPath = p.join(__dirname, '../../../build')

function evalFrontendScripts (dom, scriptList) {
  const window = dom.window // eslint-disable-line no-unused-vars
  const document = dom.window.document // eslint-disable-line no-unused-vars
  const navigator = dom.window.navigator // eslint-disable-line no-unused-vars
  const XMLHttpRequest = dom.window.XMLHttpRequest // eslint-disable-line no-unused-vars
  const localStorage = { // eslint-disable-line no-unused-vars
    getItem: () => null,
    setItem: () => undefined
  }
  scriptList.forEach(function (script) {
    eval(script) // eslint-disable-line no-eval
  })
}

function getScriptPaths ({ htmlData, manifestFiles }) {
  if (htmlData) {
    const regex = /\/static\/js\/.+?\.js/g
    return htmlData.match(regex).map(path => p.join(frontendBuildPath, path))
  }
  if (manifestFiles) {
    return Object.keys(manifestFiles)
      .filter(function (key) {
        return key.endsWith('.chunk.js') || key.endsWith('runtime~main.js') || key.endsWith('main.js')
      })
      .map(function (key) {
        return p.join(frontendBuildPath, manifestFiles[key])
      })
  }
}

const indexHtmlPath = p.join(frontendBuildPath, 'index.html')
const assetManifestJsonPath = p.join(frontendBuildPath, 'asset-manifest.json')
const htmlData = fs.readFileSync(indexHtmlPath, 'utf8')
const manifest = JSON.parse(fs.readFileSync(assetManifestJsonPath, 'utf8'))
const scriptPaths = getScriptPaths({ manifestFiles: manifest.files })
const dom = new jsdom.JSDOM('<!DOCTYPE html>')
evalFrontendScripts(dom, scriptPaths.map(path => fs.readFileSync(path, 'utf8')))
const frontendFuncs = dom.window.APP.server
const frontend = {
  ...frontendFuncs,
  manifest,
  htmlData,
}

module.exports = frontend
