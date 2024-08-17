import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerCreateEndpointCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.createEndpoint', async () => {
        const endpoint = await vscode.window.showInputBox({
            prompt: 'Enter the endpoint',
            placeHolder: 'e.g., auth/login'
        });

        if (!endpoint) {
            vscode.window.showInformationMessage('Endpoint creation canceled or no input provided.');
            return;
        }

        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('Unable to determine the workspace root path.');
            return;
        }

        const endpointFilePath = path.join(rootPath, 'lib', 'data', 'utils', 'endpoint.dart');

        const newEndpoint = `\nstatic const String ${convertToCamelCase(endpoint)} = "${endpoint}";`;

        if (fs.existsSync(endpointFilePath)) {
            let routerContent = fs.readFileSync(endpointFilePath, 'utf-8');
            const marker = '}';
            const markerEnd = '\n}';

            if (routerContent.includes(marker)) {
                const newContent = routerContent.replace(marker, newEndpoint + markerEnd);
                fs.writeFileSync(endpointFilePath, newContent, 'utf-8');
                vscode.window.showInformationMessage(`Endpoint ${endpoint} added to endpoint.dart.`);
            } else {
                vscode.window.showErrorMessage(`Marker '${marker}' not found in endpoint.dart.`);
            }
        } else {
            vscode.window.showErrorMessage('endpoint.dart file not found.');
        }
    });

    context.subscriptions.push(initCommand);
}

function convertToCamelCase(input: string): string {
    return input
        .split('/')
        .map((part, index) =>
            index === 0
                ? part.toLowerCase()
                : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join('');
}
