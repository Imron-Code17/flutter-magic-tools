import * as vscode from 'vscode';
import { registerInitializeCommand } from './commands/initialize';
import { registerMenuCommand } from './commands/menu';
import { registerCreateRequestCommand } from './commands/create_request';
import { registerCreateModelCommand } from './commands/create_model';
import { registerCreateViewCommand } from './commands/create_view';
import { registerCreateCubitCommand } from './commands/create_cubit';
import { registerCreateEndpointCommand } from './commands/create_endpoint';
import { registerGenerateCommand } from './commands/generate';
import { registerCleanGetCommand } from './commands/clean_get';
import { registerDartFixCommand } from './commands/dart_fix';




/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context - The context in which the extension is activated.
 */
export function activate(context: vscode.ExtensionContext): void {
	console.log('FlutterMagicTools is now active!');

	// Register commands
	registerInitializeCommand(context);
	registerMenuCommand(context);
	registerCreateRequestCommand(context);
	registerCreateModelCommand(context);
	registerCreateViewCommand(context);
	registerCreateCubitCommand(context);
	registerCreateEndpointCommand(context);
	registerGenerateCommand(context);
	registerCleanGetCommand(context);
	registerDartFixCommand(context);



	// Register webview provider
	// Register other commands
	// registerCreateFeatureCommand(context);
}

export function deactivate(): void { }



