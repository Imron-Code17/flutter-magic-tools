import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Import script files
import buildScript from '../script/build';
import coreScript from '../script/lib/core/core';
import errorsScript from '../script/lib/core/errors';
import apiExceptionsScript from '../script/lib/core/api_exception';
import failureScript from '../script/lib/core/failure';
import networkExceptionsScript from '../script/lib/core/network_exception';
import responseScript from '../script/lib/core/response';
import usecaseScript from '../script/lib/core/usecase';
import networkScript from '../script/lib/core/network';
import apiResponseScript from '../script/lib/core/api_response';
import dataScript from '../script/lib/data/data';
import domainScript from '../script/lib/domain/domain';
import diScript from '../script/lib/di/di';
import appScript from '../script/lib/app';
import configScript from '../script/lib/config';
import mainScript from '../script/lib/main';
import libScript from '../script/lib/lib';
import utilsScript from '../script/lib/data/utils/utils';
import appBottomsheetScript from '../script/lib/data/utils/app_bottomsheet';
import appDialogScript from '../script/lib/data/utils/app_dialog';
import dioTokenInterceptorScript from '../script/lib/data/utils/dio_token_interceptor';
import endpointScript from '../script/lib/data/utils/endpoint';
import parseIntToBoolScript from '../script/lib/data/utils/parse_int_to_bool';
import extensionsScript from '../script/lib/data/utils/extensions/extensions';
import doubleExtensionScript from '../script/lib/data/utils/extensions/double_extension';
import stringExtensionScript from '../script/lib/data/utils/extensions/sting_extension';
import contextExtensionScript from '../script/lib/data/utils/extensions/context_extension';
import themeScript from '../script/lib/data/themes/themes';
import themePrimaryScript from '../script/lib/data/themes/primary_theme';
import routerScript from '../script/lib/router/router';
import authGuardScript from '../script/lib/router/guards/auth_guard';
import presentationsScript from '../script/lib/presentations/presentations';
import authScript from '../script/lib/presentations/auth/auth';
import authViewScript from '../script/lib/presentations/auth/view/auth_view';
import authCubitScript from '../script/lib/presentations/auth/cubit/auth_cubit';
import authStateScript from '../script/lib/presentations/auth/cubit/auth_state';

// Function to register initialize command
export async function registerInitializeCommand(context: vscode.ExtensionContext): Promise<void> {
    let initCommand = vscode.commands.registerCommand('fluttermagictools.initialize', async () => {
        const selection = await vscode.window.showInformationMessage('Are you sure you want to initialize?', 'Yes', 'No');

        if (selection === 'Yes') {
            try {
                const libPath = path.join(vscode.workspace.rootPath!, 'lib');
                const rootPath = vscode.workspace.rootPath!;
                fs.writeFileSync(path.join(rootPath, 'build.yml'), buildScript);

                if (fs.existsSync(libPath)) {
                    fs.rmdirSync(libPath, { recursive: true });
                }

                fs.mkdirSync(libPath);
                const folders = ['core', 'data', 'domain', 'di', 'presentations', 'router'];
                folders.forEach(folder => {
                    fs.mkdirSync(path.join(libPath, folder));
                });

                const files = ['app.dart', 'config.dart', 'lib.dart', 'main.dart'];
                const scriptLibs = [appScript, configScript, libScript, mainScript];
                files.forEach((file, index) => {
                    createSubFiles(libPath, file, scriptLibs[index]);
                });

                createCoreFiles(libPath);
                createDataFiles(libPath);
                createDomainFiles(libPath);
                createPresentationFiles(libPath);
                createDiFiles(libPath);
                createRouterFiles(libPath);

                await runTask();
                vscode.window.showInformationMessage('Initialization complete.');
            } catch (err) {
                vscode.window.showErrorMessage(`Error during initialization: ${(err as Error).message}`);
            }
        } else if (selection === 'No') {
            vscode.window.showInformationMessage('Initialization canceled.');
        }
    });

    context.subscriptions.push(initCommand);
}

// Function to create core files
function createCoreFiles(libPath: string): void {
    const corePath = path.join(libPath, 'core');
    fs.writeFileSync(path.join(corePath, 'core.dart'), coreScript);
    const subFolders = ['errors', 'network', 'response', 'usecase'];
    subFolders.forEach(folder => {
        const folderPath = path.join(corePath, folder);
        fs.mkdirSync(folderPath);

        if (folder === 'errors') {
            const subFileErrors = ['api_exception', 'failure', 'network_exception', 'errors'];
            subFileErrors.forEach(file => {
                createFile(corePath, folder, file);
            });
        } else {
            const fileName = folder === 'response' ? 'api_' + folder : folder;
            createFile(corePath, folder, fileName);
        }
    });
}

// Function to create data files
function createDataFiles(libPath: string): void {
    const dataPath = path.join(libPath, 'data');
    fs.writeFileSync(path.join(dataPath, 'data.dart'), dataScript);
    const subFolders = ['api', 'repositories', 'themes', 'utils', 'widgets'];
    subFolders.forEach(folder => {
        const folderPath = path.join(dataPath, folder);
        fs.mkdirSync(folderPath);
        createFile(dataPath, folder, folder);
    });
    createUtilsFiles(dataPath);
    createThemesFiles(dataPath);
}

// Function to create domain files
function createDomainFiles(libPath: string): void {
    const domainPath = path.join(libPath, 'domain');
    fs.writeFileSync(path.join(domainPath, 'domain.dart'), domainScript);
    const subFolders = ['entities', 'repositories', 'usecases'];
    subFolders.forEach(folder => {
        const folderPath = path.join(domainPath, folder);
        fs.mkdirSync(folderPath);
        fs.writeFileSync(path.join(folderPath, `${folder}.dart`), '');
    });
}

// Function to create presentation files
function createPresentationFiles(libPath: string): void {
    const presentationPath = path.join(libPath, 'presentations');
    fs.writeFileSync(path.join(presentationPath, 'presentations.dart'), presentationsScript);
    createAuthFiles(presentationPath);
}

// Function to create DI files
function createDiFiles(libPath: string): void {
    const diPath = path.join(libPath, 'di');
    fs.writeFileSync(path.join(diPath, 'di.dart'), diScript);
}

// Function to create utils files
function createUtilsFiles(libPath: string): void {
    const utilsPath = path.join(libPath, 'utils');
    fs.writeFileSync(path.join(utilsPath, 'utils.dart'), utilsScript);
    const files = ['app_bottomsheet.dart', 'app_dialog.dart', 'dio_token_interceptor.dart', 'endpoint.dart', 'parse_int_to_bool.dart'];
    const scriptLibs = [appBottomsheetScript, appDialogScript, dioTokenInterceptorScript, endpointScript, parseIntToBoolScript];
    files.forEach((file, index) => {
        createSubFiles(utilsPath, file, scriptLibs[index]);
    });
    createExtensionFiles(utilsPath);
}

// Function to create extension files
function createExtensionFiles(libPath: string): void {
    const extensionsPath = path.join(libPath, 'extensions');
    if (!fs.existsSync(extensionsPath)) {
        fs.mkdirSync(extensionsPath, { recursive: true });
    }

    fs.writeFileSync(path.join(extensionsPath, 'extensions.dart'), extensionsScript);

    const extensionFiles = ['context_extension.dart', 'double_extension.dart', 'string_extension.dart'];
    const extensionScripts = [contextExtensionScript, doubleExtensionScript, stringExtensionScript];

    extensionFiles.forEach((file, index) => {
        createSubFiles(extensionsPath, file, extensionScripts[index]);
    });
}

// Function to create themes files
function createThemesFiles(libPath: string): void {
    const themesPath = path.join(libPath, 'themes');
    fs.writeFileSync(path.join(themesPath, 'themes.dart'), themeScript);
    const files = ['primary_theme.dart'];
    const scriptTheme = [themePrimaryScript];
    files.forEach((file, index) => {
        createSubFiles(themesPath, file, scriptTheme[index]);
    });
}

// Function to create router files
function createRouterFiles(libPath: string): void {
    const routerPath = path.join(libPath, 'router');
    fs.writeFileSync(path.join(routerPath, 'router.dart'), routerScript);
    fs.mkdirSync(path.join(routerPath, 'guards'));
    const guardsPath = path.join(routerPath, 'guards');
    fs.writeFileSync(path.join(guardsPath, 'auth_guard.dart'), authGuardScript);
}

// Function to create auth files
function createAuthFiles(libPath: string): void {
    const authPath = path.join(libPath, 'auth');
    if (!fs.existsSync(authPath)) {
        fs.mkdirSync(authPath);
    }

    fs.writeFileSync(path.join(authPath, 'auth.dart'), authScript);

    const viewPath = path.join(authPath, 'view');
    const cubitPath = path.join(authPath, 'cubit');
    if (!fs.existsSync(viewPath)) {
        fs.mkdirSync(viewPath);
    }
    if (!fs.existsSync(cubitPath)) {
        fs.mkdirSync(cubitPath);
    }
    fs.writeFileSync(path.join(viewPath, 'auth_view.dart'), authViewScript);

    fs.writeFileSync(path.join(cubitPath, 'auth_cubit.dart'), authCubitScript);
    fs.writeFileSync(path.join(cubitPath, 'auth_state.dart'), authStateScript);
}

// Function to create a file
function createFile(basePath: string, folder: string, fileName: string): void {
    const scriptContent = getScriptContent(fileName);
    fs.writeFileSync(path.join(basePath, folder, `${fileName}.dart`), scriptContent);
}

// Function to create sub files
function createSubFiles(basePath: string, fileName: string, script: string): void {
    fs.writeFileSync(path.join(basePath, fileName), script);
}

function getScriptContent(fileName: string) {
    switch (fileName) {
        case 'core':
            return coreScript;
        case 'errors':
            return errorsScript;
        case 'api_exception':
            return apiExceptionsScript;
        case 'failure':
            return failureScript;
        case 'network_exception':
            return networkExceptionsScript;
        case 'response':
            return responseScript;
        case 'usecase':
            return usecaseScript;
        case 'network':
            return networkScript;
        case 'api_response':
            return apiResponseScript;
        default:
            return `// Default script content for ${fileName}\n`;
    }
}




function runTask(): void {
    const terminalName = 'Flutter Magic';
    let terminal = vscode.window.terminals.find(t => t.name === terminalName);

    if (!terminal) {
        terminal = vscode.window.createTerminal(terminalName);
    }

    terminal.show();
    terminal.sendText(`flutter pub add dio auto_route connectivity_plus path_provider collection dartz phosphor_flutter device_info_plus package_info_plus equatable flutter_easy_dialogs flutter_bloc freezed_annotation get_it gap hydrated_bloc json_annotation &&
                    flutter pub add auto_route_generator build_runner freezed json_serializable -d &&
                    flutter pub get &&
                    flutter pub run build_runner build`);
}

