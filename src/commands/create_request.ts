import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerCreateRequestCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.createRequest', async () => {
        // Prompt for function name
        const functionName = await vscode.window.showInputBox({
            prompt: 'Enter the function name',
            placeHolder: 'e.g., getAllData'
        });
        if (!functionName) {
            vscode.window.showInformationMessage('Function name not provided.');
            return;
        }

        // Prompt for object name
        const objectName = await vscode.window.showInputBox({
            prompt: 'Enter the object name',
            placeHolder: 'e.g., List<Object>'
        });
        if (!objectName) {
            vscode.window.showInformationMessage('Object name not provided.');
            return;
        }

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('Workspace folder is not open.');
            return;
        }
        const rootPath = workspaceFolder.uri.fsPath;
        const apiFolderPath = path.join(rootPath, 'lib', 'data', 'api');

        // Ensure the `api` directory exists
        if (!fs.existsSync(apiFolderPath)) {
            fs.mkdirSync(apiFolderPath, { recursive: true });
        }

        // Prompt for folder selection
        const selectedFolder = await vscode.window.showQuickPick(
            getDirectories(apiFolderPath).concat('+ Add Folder'),
            { placeHolder: 'Select a folder to save the API or add a new folder' }
        );

        if (!selectedFolder) {
            vscode.window.showInformationMessage('No folder selected.');
            return;
        }

        let targetFolderPath = apiFolderPath;
        let targetFolder: string;

        if (selectedFolder === '+ Add Folder') {
            // Create new folder
            const newFolderName = await vscode.window.showInputBox({
                prompt: 'Enter the new folder name'
            });
            if (!newFolderName) {
                vscode.window.showInformationMessage('No folder name provided.');
                return;
            }
            targetFolderPath = path.join(apiFolderPath, newFolderName);
            fs.mkdirSync(targetFolderPath, { recursive: true });
            targetFolder = newFolderName;
        } else {
            // Use selected folder
            targetFolderPath = path.join(apiFolderPath, selectedFolder);
            targetFolder = selectedFolder;
        }

        // Define file name and path
        const functionFileName = `${toSnakeCase(targetFolder)}_api.dart`;
        const functionFilePath = path.join(targetFolderPath, functionFileName);
        const functionTemplate = createApiClass(toSnakeCase(targetFolder));

        // Write the template to the file
        fs.writeFileSync(functionFilePath, functionTemplate);
        vscode.window.showInformationMessage(`API class created successfully at '${functionFilePath}'`);
    });

    context.subscriptions.push(initCommand);
}

function createApiClass(nameClass: string): string {
    return `
import 'package:dio/dio.dart';
import '../../../lib.dart';

abstract class ${formatSingleText(nameClass)}Api {}

class ${formatSingleText(nameClass)}ApiImpl implements ${formatSingleText(nameClass)}Api {
  final Dio dio;

  ${formatSingleText(nameClass)}ApiImpl(this.dio);
}
`;
}

function getDirectories(srcPath: string): string[] {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function toSnakeCase(input: string): string {
    return input
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/\s+/g, '_')
        .toLowerCase();
}

function formatSingleText(input: string): string {
    if (input.includes(' ') || input.includes('_')) {
        return input.split(/[\s_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
