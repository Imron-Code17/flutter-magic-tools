import * as vscode from 'vscode';

export function registerGenerateCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.generate', async () => {
        const terminalName = 'Flutter Magic';
        let terminal = vscode.window.terminals.find(t => t.name === terminalName);

        if (!terminal) {
            terminal = vscode.window.createTerminal(terminalName);
        }
        terminal.show();
        terminal.sendText('flutter pub run build_runner build');
    });
    context.subscriptions.push(initCommand);
}
