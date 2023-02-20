"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand("synobtainer.obtain-synonym", async () => {
        var WordPOS = require("wordpos"), wordpos = new WordPOS();
        const editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            return;
        }
        const cursorPosition = editor.selection.start;
        const wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
        const selectedWord = editor.document.getText(wordRange);
        const word = selectedWord;
        if (selectedWord.length === 0) {
            vscode.window.showInformationMessage("No word selected. Please move cursor within word.");
            return;
        }
        await wordpos.lookup(selectedWord, async function (result) {
            const synonymWithDef = result.flatMap((item) => {
                return item.synonyms
                    .filter(function (synonym) {
                    return synonym !== selectedWord;
                })
                    .map(function (synonym) {
                    return {
                        synonym: synonym,
                        definition: item.def,
                        type: item.lexName,
                    };
                });
            });
            const synonymArticles = await synonymWithDef.map((syn) => {
                return {
                    label: syn.synonym,
                    detail: syn.definition,
                    description: syn.type,
                };
            });
            const synonymPicked = await vscode.window.showQuickPick(synonymArticles, {
                canPickMany: false,
                title: "Synonyms",
                matchOnDetail: true,
            });
            editor.edit((selectedWord) => {
                selectedWord.replace(editor.selection, 
                //@ts-ignore
                synonymPicked === undefined ? word : synonymPicked.label);
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map