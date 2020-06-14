const { commands } = require('vscode')
const toggle = require('./toggle')

module.exports =  {
  activate: () => {
    commands.registerTextEditorCommand("only-test.toggle", toggle)
  }
}
