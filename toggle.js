const testStartLinePattern = /^\s+it/
const { writeFile } = require('fs').promises

module.exports = async (textEditor, edit) => {
  const { line: cursorLineNum } = textEditor._selections[0].active
  const { fileName } = textEditor._documentData._document
  const lines = textEditor._documentData._lines
  const testStartLine = lines.slice(0, cursorLineNum).reverse().find(line => line.match(testStartLinePattern))
  const testStartLineNum = lines.indexOf(testStartLine)

  const updatedFile = lines
    .map((line, i) => {
      if (i !== testStartLineNum) return line
      if (line.match(/^\s+it\(/)) return line.replace('it(', 'it.only(')
      else return line.replace('it.only(', 'it(')
    })
    .join('\n')

  writeFile(fileName, updatedFile)
}
