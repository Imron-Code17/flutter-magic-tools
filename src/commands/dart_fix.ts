import * as vscode from 'vscode';

export function registerDartFixCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.dartFix', async () => {
        const terminalName = 'Flutter Magic';
        let terminal = vscode.window.terminals.find(t => t.name === terminalName);

        if (!terminal) {
            terminal = vscode.window.createTerminal(terminalName);
        }
        terminal.show();
        terminal.sendText('dart fix --dry-run && dart fix --apply');
    });
    context.subscriptions.push(initCommand);
}
