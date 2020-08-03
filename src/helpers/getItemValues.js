export default function getItemValues (item) {
  const iconImg = require(`images/icons/${item}`)
  const itemTitle = item.slice(0, -4)
  return { iconImg, itemTitle }
}
