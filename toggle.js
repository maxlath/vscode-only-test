const testStartLinePattern = /^\s+it/
const vscode = require('vscode')
const nonNull = value => value != null

module.exports = async textEditor => {
  const { line: cursorLineNum } = textEditor.selections[0].active
  const text = textEditor.document.getText()
  const lines = text.split('\n')
  const testStartLine = lines.slice(0, cursorLineNum + 1).reverse().find(line => line.match(testStartLinePattern))

  // Get the index of the closest matching line
  const testStartLineNum = lines
    .map((line, index) => {
      if (line === testStartLine && index <= cursorLineNum) return index
    })
    .filter(nonNull)
    .slice(-1)[0]

  if (testStartLineNum < 0) {
    console.warn('test line not found')
    return
  }

  const start = new vscode.Position(testStartLineNum, 0)
  const end = new vscode.Position(testStartLineNum, testStartLine.length)
  const range = new vscode.Range(start, end)

  let updatedLine
  if (testStartLine.match(/^\s+it\(/)) {
    updatedLine = testStartLine.replace('it(', 'it.only(')
  } else {
    updatedLine = testStartLine.replace('it.only(', 'it(')
  }

  vscode.window.activeTextEditor.edit(editBuilder => {
    editBuilder.replace(range, updatedLine)
  })
}
