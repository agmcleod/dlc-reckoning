// taken from: https://github.com/open-meteo/open-meteo-website/commit/ef7455fd852d47cacf19cb30af6d466a231a2868. <3

import { lstatSync, readdirSync, renameSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const buildDirPath = resolve(__dirname, '../build/')

// Search for abcd.html files and move them to abcd/index.html
function walk(directory) {
  const files = readdirSync(directory)
  files.forEach((file) => {
    const absolute = `${directory}/${file}`
    if (lstatSync(absolute).isDirectory()) {
      walk(absolute)
      return
    }

    const parts = file.split('.')
    if (parts.length != 2) {
      return
    }
    if (parts[0] == 'index' || parts[1] != 'html') {
      return
    }

    const newFile = absolute.replace('.html', '')

    console.log(`Rename ${file} to ${newFile}`)
    renameSync(absolute, newFile)
  })
}

walk(buildDirPath)
