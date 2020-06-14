# vscode-only-test

A vscode/[codium](https://vscodium.com/) extension that adds a command to toggle [Mocha](https://mochajs.org) `it.only` to the test the cursor is in.


## Install
```
cd ~/.vscode/extensions
git clone https://github.com/maxlath/vscode-only-test
```

This command can then be bound to a shortkey, by adding the shortkey to `keybindings.json` (in my set up, can be found at in `~/.config/VSCodium/User`):
```json
{
    "key": "ctrl+shift+alt+o",
    "command": "only-test.toggle"
}
```
