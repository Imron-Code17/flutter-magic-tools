import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function registerCreateCubitCommand(context: vscode.ExtensionContext): Promise<void> {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.createCubit', async () => {
        const cubit = await vscode.window.showInputBox({
            prompt: 'Enter the cubit name',
            placeHolder: 'e.g., Transaction'
        });

        if (!cubit) {
            vscode.window.showInformationMessage('Cubit creation canceled or no input provided.');
            return;
        }

        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('Unable to determine the workspace root path.');
            return;
        }

        const presentationFolderPath = path.join(rootPath, 'lib', 'presentations');

        const selectedFolder = await vscode.window.showQuickPick(
            getDirectories(presentationFolderPath),
            { placeHolder: 'Select a folder for the cubit' }
        );

        if (!selectedFolder) {
            vscode.window.showInformationMessage('No folder selected. Operation canceled.');
            return;
        }

        const cubitFileName = `${toSnakeCase(cubit)}_cubit.dart`;
        const stateFileName = `${toSnakeCase(cubit)}_state.dart`;

        const cubitFilePath = path.join(presentationFolderPath, selectedFolder, 'cubit', cubitFileName);
        const stateFilePath = path.join(presentationFolderPath, selectedFolder, 'cubit', stateFileName);

        const generatedCubit = generateCubit(cubit);
        const generatedState = generateState(cubit);

        fs.mkdirSync(path.dirname(cubitFilePath), { recursive: true });

        fs.writeFileSync(cubitFilePath, generatedCubit);
        fs.writeFileSync(stateFilePath, generatedState);

        addExportToFile(selectedFolder, toSnakeCase(cubit));

        vscode.window.showInformationMessage(`Cubit '${cubit}' created successfully`);
        const shouldRunBuild = await vscode.window.showInformationMessage(
            'Do you want to run `flutter pub run build_runner build` now?',
            'Yes',
            'No'
        );

        if (shouldRunBuild === 'Yes') {
            runBuildRunnerCommand();
        }
    });

    context.subscriptions.push(initCommand);
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

function addExportToFile(view: string, name: string): void {
    const viewPath = path.join(vscode.workspace.rootPath ?? '', 'lib', 'presentations', view);
    const viewFilePath = path.join(viewPath, `${view}.dart`);

    const exportCubitStatement = `export 'cubit/${name}_cubit.dart';\n`;

    if (!fs.existsSync(viewFilePath)) {
        fs.writeFileSync(viewFilePath, exportCubitStatement);
    } else {
        const currentContent = fs.readFileSync(viewFilePath, 'utf-8');
        if (!currentContent.includes(exportCubitStatement)) {
            fs.appendFileSync(viewFilePath, exportCubitStatement);
        }
    }
}

function generateCubit(name: string): string {
    const cubitName = toPascalCase(name);
    return `import 'package:hydrated_bloc/hydrated_bloc.dart';
import '../../../lib.dart';
export '${name}_state.dart';

class ${cubitName}Cubit extends HydratedCubit<${cubitName}State> {
  ${cubitName}Cubit() : super(${cubitName}State()) {
  }

  @override
  ${cubitName}State? fromJson(Map<String, dynamic> json) {
    return ${cubitName}State.fromJson(json);
  }

  @override
  Map<String, dynamic>? toJson(${cubitName}State state) {
    return state.toJson();
  }
}
`;
}

function generateState(name: string): string {
    const stateName = toPascalCase(name);
    return `import 'package:freezed_annotation/freezed_annotation.dart';
part '${name}_state.freezed.dart';
part '${name}_state.g.dart';

@freezed
class ${stateName}State with _$${stateName}State {
  const ${stateName}State._();
  factory ${stateName}State({
    String? user,
  }) = _${stateName}State;

  factory ${stateName}State.fromJson(Map<String, dynamic> json) =>
      _$${stateName}StateFromJson(json);
}
`;
}

function toPascalCase(input: string): string {
    return input
        .replace(/(^\w|_\w)/g, match => match.replace('_', '').toUpperCase());
}


function runBuildRunnerCommand(): void {
    const terminalName = 'Flutter Magic';
    let terminal = vscode.window.terminals.find(t => t.name === terminalName);

    if (!terminal) {
        terminal = vscode.window.createTerminal(terminalName);
    }

    terminal.show();
    terminal.sendText('flutter pub run build_runner build');
}
