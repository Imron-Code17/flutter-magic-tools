import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerMenuCommand(context: vscode.ExtensionContext): void {
    let menuCommand = vscode.commands.registerCommand('fluttermagictools.menu', async () => {
        const panel = vscode.window.createWebviewPanel(
            'fluttermagictools',
            'Flutter Magic Tools',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src', 'menu'))]
            }
        );

        const cssUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'src', 'menu', 'css', 'index.css')));
        const jsUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'src', 'menu', 'js', 'index.js')));

        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
        const entitiesFolderPath = path.join(rootPath, 'lib', 'domain', 'entities');

        const htmlPath = path.join(context.extensionPath, 'src', 'menu', 'index.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        htmlContent = htmlContent.replace('{{cssUri}}', cssUri.toString());
        htmlContent = htmlContent.replace('{{jsUri}}', jsUri.toString());

        panel.webview.html = htmlContent;

        panel.webview.onDidReceiveMessage(async message => {
            switch (message.command) {
                case 'loadModelFolders':
                    try {
                        if (!fs.existsSync(entitiesFolderPath)) {
                            panel.webview.postMessage({ command: 'loadFolders', folders: [] });
                            return;
                        }

                        const folders = fs.readdirSync(entitiesFolderPath).filter(file => {
                            return fs.statSync(path.join(entitiesFolderPath, file)).isDirectory();
                        });
                        console.log(`Folders: ${folders}`);  // Debugging output

                        panel.webview.postMessage({ command: 'loadFolders', folders });
                    } catch (error) {
                        console.error('Error reading folders:', error);
                        panel.webview.postMessage({ command: 'loadFolders', folders: [] });
                    }
                    break;
            }
        });
    });

    context.subscriptions.push(menuCommand);
}
