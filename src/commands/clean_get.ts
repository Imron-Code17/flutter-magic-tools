import * as vscode from 'vscode';

export function registerCleanGetCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.cleanGet', async () => {
        const terminalName = 'Flutter Magic';
        let terminal = vscode.window.terminals.find(t => t.name === terminalName);

        if (!terminal) {
            terminal = vscode.window.createTerminal(terminalName);
        }

        terminal.show();
        terminal.sendText('flutter clean && flutter pub get');
    });
    context.subscriptions.push(initCommand);
}