const frontend = require('./frontend')

const injectHTML = (data, { body, scripts, url }) => {
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`
  )
  data = data.replace('</body>', scripts.join('') + '</body>')
  return data
}

const extractAssets = (assets, chunks) =>
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k])

/**
 * Загрузить страницу по url
 * @arg {Object} req
 * @return {Promise}
 */
module.exports = function ssr ({ url }) {
  const {
    React,
    renderToString,
    Root,
    manifest,
    htmlData,
  } = frontend

  const modules = []

  const routeMarkup = renderToString(
    React.createElement(Root, { screenWidth: 1025 })
  )

  const extraChunks = extractAssets(manifest, modules).map(
    c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
  )

  const html = injectHTML(htmlData, {
    body: routeMarkup,
    scripts: extraChunks,
    url: url,
  })

  return html
}
