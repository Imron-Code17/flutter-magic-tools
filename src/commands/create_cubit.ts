import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerCreateCubitCommand(context: vscode.ExtensionContext): void {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.createCubit', () => { });
    context.subscriptions.push(initCommand);
}
