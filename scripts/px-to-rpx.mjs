import fs from 'fs'
import path from 'path'

const extraDir = path.resolve('src/extra')

function pxToRpx(value) {
  const num = parseFloat(value)
  if (Number.isNaN(num)) return `${value}rpx`
  const rpx = num * 2
  return `${Number.isInteger(rpx) ? rpx : parseFloat(rpx.toFixed(2))}rpx`
}

function convertPxToRpx(text) {
  return text.replace(/(-?\d*\.?\d+)px/g, (_, num) => pxToRpx(num))
}

function convertVueFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const styleRegex = /(<style[^>]*>)([\s\S]*?)(<\/style>)/g
  let changed = false

  content = content.replace(styleRegex, (match, open, styles, close) => {
    const converted = convertPxToRpx(styles)
    if (converted !== styles) changed = true
    return open + converted + close
  })

  content = content.replace(/:title-size="(\d+)"/g, (_, n) => {
    changed = true
    return `:title-size="${Number(n) * 2}rpx"`
  })

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('Updated:', path.relative(extraDir, filePath))
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.vue')) convertVueFile(full)
  }
}

walk(extraDir)
console.log('Done')
