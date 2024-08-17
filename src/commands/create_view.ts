import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { viewScript } from '../script/view/view';

// Register command for creating view
export function registerCreateViewCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.createView', async () => {
        const viewName = await vscode.window.showInputBox({
            prompt: 'Enter the view name',
            placeHolder: 'e.g., MyView'
        });

        if (!viewName) {
            vscode.window.showInformationMessage('View creation canceled or no input provided.');
            return;
        }

        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('Workspace folder is not open.');
            return;
        }
        const presentationFolderPath = path.join(rootPath, 'lib', 'presentations');

        if (!fs.existsSync(presentationFolderPath)) {
            fs.mkdirSync(presentationFolderPath, { recursive: true });
        }

        const selectedFolder = await vscode.window.showQuickPick(
            getDirectories(presentationFolderPath).concat('+ Add Folder'),
            { placeHolder: 'Select a folder to save the view or add a new folder' }
        );

        if (!selectedFolder) {
            vscode.window.showInformationMessage('No folder selected.');
            return;
        }

        let targetFolderPath = presentationFolderPath;
        let targetFolder: string;
        let selectFilePath: string;

        if (selectedFolder === '+ Add Folder') {
            const newFolderName = await vscode.window.showInputBox({
                prompt: 'Enter the new folder name'
            });

            if (newFolderName) {
                targetFolderPath = path.join(presentationFolderPath, newFolderName, 'view');
                fs.mkdirSync(targetFolderPath, { recursive: true });
                selectFilePath = path.join(presentationFolderPath, newFolderName, `${newFolderName}.dart`);
                targetFolder = newFolderName;
            } else {
                vscode.window.showInformationMessage('Folder creation canceled or no input provided.');
                return;
            }
        } else {
            targetFolderPath = path.join(presentationFolderPath, selectedFolder, 'view');
            selectFilePath = path.join(presentationFolderPath, selectedFolder, `${selectedFolder}.dart`);
            targetFolder = selectedFolder;
        }

        const viewFileName = `${toSnakeCase(viewName)}_view.dart`;
        const viewFilePath = path.join(targetFolderPath, viewFileName);
        const exportStatement = `export 'view/${viewFileName}';\n`;
        const exportPresentationStatement = `export '${targetFolder}/${targetFolder}.dart';\n`;

        const presentationFilePath = path.join(presentationFolderPath, 'presentations.dart');

        if (!fs.existsSync(viewFilePath)) {
            fs.writeFileSync(viewFilePath, viewScript(convertToCapitalized(viewName)));
        } else {
            const currentContent = fs.readFileSync(viewFilePath, 'utf-8');
            if (!currentContent.includes(viewScript(convertToCapitalized(viewName)))) {
                fs.appendFileSync(viewFilePath, viewScript(convertToCapitalized(viewName)));
            }
        }

        if (!fs.existsSync(selectFilePath)) {
            fs.writeFileSync(selectFilePath, exportStatement);
        } else {
            const currentContent = fs.readFileSync(selectFilePath, 'utf-8');
            if (!currentContent.includes(exportStatement)) {
                fs.appendFileSync(selectFilePath, exportStatement);
            }
        }

        if (!fs.existsSync(presentationFilePath)) {
            fs.writeFileSync(presentationFilePath, exportPresentationStatement);
        } else {
            const currentContent = fs.readFileSync(presentationFilePath, 'utf-8');
            if (!currentContent.includes(exportPresentationStatement)) {
                fs.appendFileSync(presentationFilePath, exportPresentationStatement);
            }
        }

        await createRouter(viewName);
    });

    context.subscriptions.push(initCommand);
}

// Create router entry
async function createRouter(viewName: string): Promise<void> {
    const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!rootPath) {
        vscode.window.showErrorMessage('Workspace folder is not open.');
        return;
    }

    const routerFilePath = path.join(rootPath, 'lib', 'router', 'router.dart');
    const routeName = convertToCapitalized(viewName) + 'Route';
    const newRoute =
        `   AutoRoute(
          page: ${routeName}.page,
        ),\n`;

    if (fs.existsSync(routerFilePath)) {
        let routerContent = fs.readFileSync(routerFilePath, 'utf-8');
        const marker = '];';

        if (routerContent.includes(marker)) {
            const newContent = routerContent.replace(marker, newRoute + marker);
            fs.writeFileSync(routerFilePath, newContent, 'utf-8');
            vscode.window.showInformationMessage(`Route for ${viewName} added to router.dart.`);
        } else {
            vscode.window.showErrorMessage(`Marker '${marker}' not found in router.dart.`);
        }

        vscode.window.showInformationMessage(`View '${viewName}' created successfully.`);
        const shouldRunBuild = await vscode.window.showInformationMessage(
            'Do you want to run `flutter pub run build_runner build` now?',
            'Yes',
            'No'
        );

        if (shouldRunBuild === 'Yes') {
            runBuildRunnerCommand();
        }
    } else {
        vscode.window.showErrorMessage('router.dart file not found.');
    }
}

// Get directories in a path
function getDirectories(srcPath: string): string[] {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

// Convert a string to snake case
function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
}

// Convert a string to capitalized form
function convertToCapitalized(str: string): string {
    return str
        .toLowerCase()
        .split(/[_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

// Run build runner command
function runBuildRunnerCommand(): void {
    const terminal = vscode.window.createTerminal('Flutter Build Runner');
    terminal.show();
    terminal.sendText('flutter pub run build_runner build');
}
