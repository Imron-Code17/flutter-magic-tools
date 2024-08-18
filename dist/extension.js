/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerInitializeCommand = registerInitializeCommand;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
// Import script files
const build_1 = __importDefault(__webpack_require__(5));
const core_1 = __importDefault(__webpack_require__(6));
const errors_1 = __importDefault(__webpack_require__(7));
const api_exception_1 = __importDefault(__webpack_require__(8));
const failure_1 = __importDefault(__webpack_require__(9));
const network_exception_1 = __importDefault(__webpack_require__(10));
const response_1 = __importDefault(__webpack_require__(11));
const usecase_1 = __importDefault(__webpack_require__(12));
const network_1 = __importDefault(__webpack_require__(13));
const api_response_1 = __importDefault(__webpack_require__(14));
const data_1 = __importDefault(__webpack_require__(15));
const domain_1 = __importDefault(__webpack_require__(16));
const di_1 = __importDefault(__webpack_require__(17));
const app_1 = __importDefault(__webpack_require__(18));
const config_1 = __importDefault(__webpack_require__(19));
const main_1 = __importDefault(__webpack_require__(20));
const lib_1 = __importDefault(__webpack_require__(21));
const utils_1 = __importDefault(__webpack_require__(22));
const app_bottomsheet_1 = __importDefault(__webpack_require__(23));
const app_dialog_1 = __importDefault(__webpack_require__(24));
const dio_token_interceptor_1 = __importDefault(__webpack_require__(25));
const endpoint_1 = __importDefault(__webpack_require__(26));
const parse_int_to_bool_1 = __importDefault(__webpack_require__(27));
const extensions_1 = __importDefault(__webpack_require__(28));
const double_extension_1 = __importDefault(__webpack_require__(29));
const sting_extension_1 = __importDefault(__webpack_require__(30));
const context_extension_1 = __importDefault(__webpack_require__(31));
const themes_1 = __importDefault(__webpack_require__(32));
const primary_theme_1 = __importDefault(__webpack_require__(33));
const router_1 = __importDefault(__webpack_require__(34));
const auth_guard_1 = __importDefault(__webpack_require__(35));
const presentations_1 = __importDefault(__webpack_require__(36));
const auth_1 = __importDefault(__webpack_require__(37));
const auth_view_1 = __importDefault(__webpack_require__(38));
const auth_cubit_1 = __importDefault(__webpack_require__(39));
const auth_state_1 = __importDefault(__webpack_require__(40));
// Function to register initialize command
async function registerInitializeCommand(context) {
    let initCommand = vscode.commands.registerCommand('fluttermagictools.initialize', async () => {
        const selection = await vscode.window.showInformationMessage('Are you sure you want to initialize?', 'Yes', 'No');
        if (selection === 'Yes') {
            try {
                const libPath = path.join(vscode.workspace.rootPath, 'lib');
                const rootPath = vscode.workspace.rootPath;
                fs.writeFileSync(path.join(rootPath, 'build.yml'), build_1.default);
                if (fs.existsSync(libPath)) {
                    fs.rmdirSync(libPath, { recursive: true });
                }
                fs.mkdirSync(libPath);
                const folders = ['core', 'data', 'domain', 'di', 'presentations', 'router'];
                folders.forEach(folder => {
                    fs.mkdirSync(path.join(libPath, folder));
                });
                const files = ['app.dart', 'config.dart', 'lib.dart', 'main.dart'];
                const scriptLibs = [app_1.default, config_1.default, lib_1.default, main_1.default];
                files.forEach((file, index) => {
                    createSubFiles(libPath, file, scriptLibs[index]);
                });
                createCoreFiles(libPath);
                createDataFiles(libPath);
                createDomainFiles(libPath);
                createPresentationFiles(libPath);
                createDiFiles(libPath);
                createRouterFiles(libPath);
                await runTask(`flutter pub add dio auto_route connectivity_plus path_provider collection dartz phosphor_flutter device_info_plus package_info_plus equatable flutter_easy_dialogs flutter_bloc freezed_annotation get_it gap hydrated_bloc json_annotation &&
                    flutter pub add auto_route_generator build_runner freezed json_serializable -d &&
                    flutter pub get &&
                    flutter pub run build_runner build`);
                vscode.window.showInformationMessage('Initialization complete.');
            }
            catch (err) {
                vscode.window.showErrorMessage(`Error during initialization: ${err.message}`);
            }
        }
        else if (selection === 'No') {
            vscode.window.showInformationMessage('Initialization canceled.');
        }
    });
    context.subscriptions.push(initCommand);
}
// Function to create core files
function createCoreFiles(libPath) {
    const corePath = path.join(libPath, 'core');
    fs.writeFileSync(path.join(corePath, 'core.dart'), core_1.default);
    const subFolders = ['errors', 'network', 'response', 'usecase'];
    subFolders.forEach(folder => {
        const folderPath = path.join(corePath, folder);
        fs.mkdirSync(folderPath);
        if (folder === 'errors') {
            const subFileErrors = ['api_exception', 'failure', 'network_exception', 'errors'];
            subFileErrors.forEach(file => {
                createFile(corePath, folder, file);
            });
        }
        else {
            const fileName = folder === 'response' ? 'api_' + folder : folder;
            createFile(corePath, folder, fileName);
        }
    });
}
// Function to create data files
function createDataFiles(libPath) {
    const dataPath = path.join(libPath, 'data');
    fs.writeFileSync(path.join(dataPath, 'data.dart'), data_1.default);
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
function createDomainFiles(libPath) {
    const domainPath = path.join(libPath, 'domain');
    fs.writeFileSync(path.join(domainPath, 'domain.dart'), domain_1.default);
    const subFolders = ['entities', 'repositories', 'usecases'];
    subFolders.forEach(folder => {
        const folderPath = path.join(domainPath, folder);
        fs.mkdirSync(folderPath);
        fs.writeFileSync(path.join(folderPath, `${folder}.dart`), '');
    });
}
// Function to create presentation files
function createPresentationFiles(libPath) {
    const presentationPath = path.join(libPath, 'presentations');
    fs.writeFileSync(path.join(presentationPath, 'presentations.dart'), presentations_1.default);
    createAuthFiles(presentationPath);
}
// Function to create DI files
function createDiFiles(libPath) {
    const diPath = path.join(libPath, 'di');
    fs.writeFileSync(path.join(diPath, 'di.dart'), di_1.default);
}
// Function to create utils files
function createUtilsFiles(libPath) {
    const utilsPath = path.join(libPath, 'utils');
    fs.writeFileSync(path.join(utilsPath, 'utils.dart'), utils_1.default);
    const files = ['app_bottomsheet.dart', 'app_dialog.dart', 'dio_token_interceptor.dart', 'endpoint.dart', 'parse_int_to_bool.dart'];
    const scriptLibs = [app_bottomsheet_1.default, app_dialog_1.default, dio_token_interceptor_1.default, endpoint_1.default, parse_int_to_bool_1.default];
    files.forEach((file, index) => {
        createSubFiles(utilsPath, file, scriptLibs[index]);
    });
    createExtensionFiles(utilsPath);
}
// Function to create extension files
function createExtensionFiles(libPath) {
    const extensionsPath = path.join(libPath, 'extensions');
    if (!fs.existsSync(extensionsPath)) {
        fs.mkdirSync(extensionsPath, { recursive: true });
    }
    fs.writeFileSync(path.join(extensionsPath, 'extensions.dart'), extensions_1.default);
    const extensionFiles = ['context_extension.dart', 'double_extension.dart', 'string_extension.dart'];
    const extensionScripts = [context_extension_1.default, double_extension_1.default, sting_extension_1.default];
    extensionFiles.forEach((file, index) => {
        createSubFiles(extensionsPath, file, extensionScripts[index]);
    });
}
// Function to create themes files
function createThemesFiles(libPath) {
    const themesPath = path.join(libPath, 'themes');
    fs.writeFileSync(path.join(themesPath, 'themes.dart'), themes_1.default);
    const files = ['primary_theme.dart'];
    const scriptTheme = [primary_theme_1.default];
    files.forEach((file, index) => {
        createSubFiles(themesPath, file, scriptTheme[index]);
    });
}
// Function to create router files
function createRouterFiles(libPath) {
    const routerPath = path.join(libPath, 'router');
    fs.writeFileSync(path.join(routerPath, 'router.dart'), router_1.default);
    fs.mkdirSync(path.join(routerPath, 'guards'));
    const guardsPath = path.join(routerPath, 'guards');
    fs.writeFileSync(path.join(guardsPath, 'auth_guard.dart'), auth_guard_1.default);
}
// Function to create auth files
function createAuthFiles(libPath) {
    const authPath = path.join(libPath, 'auth');
    if (!fs.existsSync(authPath)) {
        fs.mkdirSync(authPath);
    }
    fs.writeFileSync(path.join(authPath, 'auth.dart'), auth_1.default);
    const viewPath = path.join(authPath, 'view');
    const cubitPath = path.join(authPath, 'cubit');
    if (!fs.existsSync(viewPath)) {
        fs.mkdirSync(viewPath);
    }
    if (!fs.existsSync(cubitPath)) {
        fs.mkdirSync(cubitPath);
    }
    fs.writeFileSync(path.join(viewPath, 'auth_view.dart'), auth_view_1.default);
    fs.writeFileSync(path.join(cubitPath, 'auth_cubit.dart'), auth_cubit_1.default);
    fs.writeFileSync(path.join(cubitPath, 'auth_state.dart'), auth_state_1.default);
}
// Function to create a file
function createFile(basePath, folder, fileName) {
    const scriptContent = getScriptContent(fileName);
    fs.writeFileSync(path.join(basePath, folder, `${fileName}.dart`), scriptContent);
}
// Function to create sub files
function createSubFiles(basePath, fileName, script) {
    fs.writeFileSync(path.join(basePath, fileName), script);
}
function getScriptContent(fileName) {
    switch (fileName) {
        case 'core':
            return core_1.default;
        case 'errors':
            return errors_1.default;
        case 'api_exception':
            return api_exception_1.default;
        case 'failure':
            return failure_1.default;
        case 'network_exception':
            return network_exception_1.default;
        case 'response':
            return response_1.default;
        case 'usecase':
            return usecase_1.default;
        case 'network':
            return network_1.default;
        case 'api_response':
            return api_response_1.default;
        default:
            return `// Default script content for ${fileName}\n`;
    }
}
// Function to run a shell command
async function runTask(command) {
    const terminal = vscode.window.createTerminal('Flutter Build Runner');
    terminal.show();
    terminal.sendText(command);
}
// Export deactivate function
function deactivate() {
    // Clean-up logic if needed
}


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
targets:
  $default:
    builders:
      json_serializable:
        options:
          explicit_to_json: true
`;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'errors/errors.dart';
export 'network/network.dart';
export 'response/api_response.dart';
export 'usecase/usecase.dart';
  `;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'api_exception.dart';
export 'failure.dart';
export 'network_exception.dart';
`;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
class ApiException implements Exception {
  final String message;
  final int code;

  ApiException(this.message, this.code);

  @override
  String toString() {
    return 'ApiException{message: $message, code: $code}';
  }
}

`;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'dart:developer';

import 'package:dio/dio.dart';

class Failure {
  final String message;
  final FailureType type;

  Failure(this.message, this.type) {
    log('Failure: $message', stackTrace: StackTrace.current, error: message);
  }

  factory Failure.noConnection() {
    return Failure('No internet connection', FailureType.network);
  }

  factory Failure.serverError(String message) {
    return Failure('Server error: $message', FailureType.server);
  }

  factory Failure.unknownError(String message) {
    return Failure('Unknown error: $message', FailureType.unknown);
  }

  static parseFromException(dynamic e) {
    if (e is DioException) {
      if (e.type == DioExceptionType.connectionTimeout ||
          e.type == DioExceptionType.receiveTimeout ||
          e.type == DioExceptionType.sendTimeout) {
        return Failure.noConnection();
      } else if (e.response != null) {
        if (e.response?.data is Map) {
          return Failure.serverError(e.response!.data['message'].toString());
        } else {
          return Failure.serverError(
              e.response?.statusMessage ?? 'Server Error');
        }
      }
    }
    if (e is TypeError) {
      return Failure.unknownError('Parsing Error: \${e.stackTrace.toString()}}');
    }
    return Failure.unknownError(e.toString());
  }

  map<T>({
    required T Function(Failure failure) network,
    required T Function(Failure failure) server,
    required T Function(Failure failure) unknown,
  }) {
    switch (type) {
      case FailureType.network:
        return network(this);
      case FailureType.server:
        return server(this);
      case FailureType.unknown:
        return unknown(this);
    }
  }
}

enum FailureType {
  network,
  server,
  unknown,
}

`;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
class NetworkException implements Exception {
  final String message;
  final int code;

  NetworkException(this.message, this.code);

  @override
  String toString() {
    return 'NetworkException{message: $message, code: $code}';
  }
}
`;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';

class ApiResponse<T> extends Equatable {
  final bool success;
  final String message;
  final T? data;

  const ApiResponse(
      {required this.success, required this.message, required this.data});

  @override
  List<Object> get props => [success, message, data.runtimeType];

  factory ApiResponse.fromResponse(
      Response response, T Function(dynamic json) fromJson) {
    final isSuccess = response.statusCode.toString().startsWith('2');
    return ApiResponse(
      success: isSuccess,
      message: response.data['message'] ?? '',
      data: isSuccess ? fromJson(response.data) : null,
    );
  }
}

`;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../errors/errors.dart';

abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class NoParams extends Equatable {
  @override
  List<Object> get props => [];
}

`;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:connectivity_plus/connectivity_plus.dart';

abstract class NetworkInfo {
  Future<bool> get isConnected;
}

class NetworkInfoImpl implements NetworkInfo {
  final Connectivity connectivity;

  NetworkInfoImpl(this.connectivity);

  @override
  Future<bool> get isConnected =>
      connectivity.checkConnectivity().then((value) {
        if (value.contains(ConnectivityResult.none)) {
          return false;
        } else {
          return true;
        }
      });
}

`;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';

class ApiResponse<T> extends Equatable {
  final bool success;
  final String message;
  final T? data;

  const ApiResponse(
      {required this.success, required this.message, required this.data});

  @override
  List<Object> get props => [success, message, data.runtimeType];

  factory ApiResponse.fromResponse(
      Response response, T Function(dynamic json) fromJson) {
    final isSuccess = response.statusCode.toString().startsWith('2');
    return ApiResponse(
      success: isSuccess,
      message: response.data['message'] ?? '',
      data: isSuccess ? fromJson(response.data) : null,
    );
  }
}

`;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'api/api.dart';
export 'repositories/repositories.dart';
export 'themes/themes.dart';
export 'utils/utils.dart';
export 'widgets/widgets.dart';
  `;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'entities/entities.dart';
export 'repositories/repositories.dart';
export 'usecases/usecases.dart';
  `;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
// ignore_for_file: avoid_print

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

import '../lib.dart';

final di = GetIt.I;

setupInjection() {
  try {
    _utils();
    _datasources();
    _repositories();
    _useCases();
    _cubits();
  } catch (e) {
    print(e);
  }
}

void _datasources() {
 // example : di.registerSingleton<AuthApi>(AuthApiImpl(di()));
}

void _repositories() {
 // example :  di.registerSingleton<AuthRepository>(AuthRepositoryImpl(di(), di()));
}

void _useCases() {
 // example :  di.registerSingleton<LoginUseCase>(LoginUseCase(di()));
}

void _cubits() {
 // example :  di.registerSingleton<AuthCubit>(AuthCubit(di(), di(), di(), di(), di(), di(), di()));
// example :  di.registerFactory(() => HomeCubit(di(), di(), di(), di(), di(), di(), di()));

}

void _utils() {
  di.registerLazySingleton(
    () {
      final dio = Dio();
      dio.options.baseUrl = AppConfig.baseUrl;
      dio.interceptors.add(DioTokenInterceptor(di()));
      dio.interceptors.add(LogInterceptor());
      return dio;
    },
    // instanceName: 'dio_for_api',
  );
  di.registerSingleton(Connectivity());
  di.registerSingleton<AppRouter>(AppRouter());
  di.registerSingleton<NetworkInfo>(NetworkInfoImpl(di()));
}
  `;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_easy_dialogs/flutter_easy_dialogs.dart';
import 'lib.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthCubit>(
          create: (context) => di(),
        ),
      ],
      child: MaterialApp.router(
        title: 'Flutter Magic',
        routerConfig: router.config(),
        theme: primaryTheme,
        builder: FlutterEasyDialogs.builder(),
      ),
    );
  }
}

`;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
// ignore_for_file: unused_import, unused_field

import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:package_info_plus/package_info_plus.dart';

class AppConfig {
  static const String _testEnv = 'dev';
  static const String env =
      String.fromEnvironment('env', defaultValue: _testEnv);

  static _Env get _env => _getEnv(env);

  static _Env _getEnv(String env) {
    switch (env) {
      case 'dev':
        return _Env.dev(_fcmToken);
      case 'prod':
        return _Env.prod(_fcmToken);
      default:
        return _Env.dev(_fcmToken);
    }
  }

  static String _fcmToken = '';
  static String _docPath = '';
  static late PackageInfo _packageInfo;
  static late BaseDeviceInfo _deviceInfo;
  static String get appName => _env.appName;
  static String get baseUrl => _env.baseUrl;
  static String get fcmToken => _env.fcmToken;
  static String get fcmPrefix => _env.fcmPrefix;
  static String get documentPath => _docPath;
  // static PackageInfo get package => _packageInfo;
  // static BaseDeviceInfo get deviceInfo => _deviceInfo;
  // static FirebaseOptions get firebaseOptions =>
  //     Platform.isIOS ? _env.iosFirebaseOptions : _env.androidFirebaseOptions;
  static init(String fcmToken, String documentPath, PackageInfo packageInfo,
      BaseDeviceInfo deviceInfo) {
    _fcmToken = fcmToken;
    _docPath = documentPath;
    _packageInfo = packageInfo;
    _deviceInfo = deviceInfo;
  }
}

class _Env {
  final String appName;
  final String baseUrl;
  final String envName;
  final String fcmToken;
  final String fcmPrefix;
  // final FirebaseOptions androidFirebaseOptions;
  // final FirebaseOptions iosFirebaseOptions;

  _Env({
    required this.appName,
    required this.baseUrl,
    required this.envName,
    required this.fcmToken,
    required this.fcmPrefix,
    // required this.androidFirebaseOptions,
    // required this.iosFirebaseOptions,
  });

  factory _Env.dev(String fcmToken) {
    return _Env(
      appName: 'Dev',
      baseUrl: 'http://',
      envName: 'dev',
      fcmToken: fcmToken,
      fcmPrefix: 'dev',
      // androidFirebaseOptions: const FirebaseOptions(
      //   appId: '',
      //   apiKey: '',
      //   projectId: '',
      //   messagingSenderId: '',
      //   storageBucket: '',
      //   androidClientId:
      //       '',
      // ),
      // iosFirebaseOptions: const FirebaseOptions(
      //   appId: '',
      //   apiKey: '',
      //   projectId: '',
      //   messagingSenderId: '',
      //   storageBucket: '',
      //   iosClientId:'',
      //   iosBundleId: '',
      // ),
    );
  }

  factory _Env.prod(String fcmToken) {
    return _Env(
      appName: 'Prod',
      baseUrl: 'http://',
      envName: 'prod',
      fcmToken: fcmToken,
      fcmPrefix: '',
      // androidFirebaseOptions: const FirebaseOptions(
      //   appId: '',
      //   apiKey: '',
      //   projectId: '',
      //   messagingSenderId: '',
      //   storageBucket: '',
      //   androidClientId:'',
      // ),
      // iosFirebaseOptions: const FirebaseOptions(
      //   appId: '',
      //   apiKey: '',
      //   projectId: '',
      //   messagingSenderId: '',
      //   storageBucket: '',
      //   iosClientId:'',
      //   iosBundleId: '',
      // ),
    );
  }
}


`;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:path_provider/path_provider.dart';

import 'app.dart';
import 'config.dart';
import 'di/di.dart';

void main() async {
  try {
    WidgetsFlutterBinding.ensureInitialized();
    // initialize firebase
    HydratedBloc.storage = await HydratedStorage.build(
        storageDirectory: await getApplicationSupportDirectory());
    AppConfig.init(
      '', //get fcm token
      (await getApplicationSupportDirectory()).path,
      await PackageInfo.fromPlatform(),
      await DeviceInfoPlugin().deviceInfo,
    );
    setupInjection();
    await di.allReady();
    runApp(const App());
  } catch (e) {
    if (kDebugMode) {
      print(e);
    }
  }
}

`;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'config.dart';
export 'core/core.dart';
export 'data/data.dart';
export 'domain/domain.dart';
export 'presentations/presentations.dart';
export 'router/router.dart';
export 'di/di.dart';

`;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'app_bottomsheet.dart';
export 'app_dialog.dart';
export 'dio_token_interceptor.dart';
export 'extensions/extensions.dart';
export 'parse_int_to_bool.dart';
`;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import 'extensions/context_extension.dart';

class AppBottomSheet {
  static Future<void> show(
      {required BuildContext context,
      String? title,
      required Widget child,
      AppBottomsheetType type = AppBottomsheetType.normal,
      bool isFooterActive = false,
      String? textButtonFooter,
      Function()? onPressed}) async {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      useSafeArea: true,
      builder: (context) => Container(
          width: context.mediaQuery.size.width,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
          ),
          child: ConstrainedBox(
              constraints: BoxConstraints(
                  maxHeight: context.mediaQuery.size.height,
                  minHeight: context.mediaQuery.size.height / 10),
              child: Material(
                  color: Colors.transparent,
                  child: Stack(children: [
                    SingleChildScrollView(
                        child: Column(children: [
                      const Gap(6),
                      Padding(
                        padding: const EdgeInsets.all(12),
                        child: child,
                      )
                    ])),
                    _headerAppBottomSheet(type, context, title),
                    Visibility(
                        visible: isFooterActive,
                        child: _footerAppBottomsheet(
                            context, textButtonFooter, onPressed))
                  ])))),
    );
  }

  static Widget _footerAppBottomsheet(
      BuildContext context, String? textButtonFooter, Function()? onPressed) {
    return Positioned(
      bottom: 0,
      left: 0,
      right: 0,
      child: Container(
          padding: const EdgeInsets.all(12),
          height: 62,
          width: context.sizeWidth,
          decoration: const BoxDecoration(color: Colors.white),
          child: ElevatedButton(
              onPressed: onPressed,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xff4E36E2),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12)),
                elevation: 0,
              ),
              child: Text(textButtonFooter ?? '',
                  style: context.textTheme.titleSmall
                      ?.copyWith(color: Colors.white)))),
    );
  }

  static Widget _headerAppBottomSheet(
      AppBottomsheetType type, BuildContext context, String? title) {
    switch (type) {
      case AppBottomsheetType.withCenterLine:
        return _buildWithCenterLine(context, title);
      case AppBottomsheetType.withCloseButton:
        return _buildWithCloseButton(context, title);
      default:
        return _buildNormal(context, title);
    }
  }

  static Widget _buildNormal(BuildContext context, String? title) {
    return Container(
        height: 42,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        width: context.mediaQuery.size.width,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
        ));
  }

  static Widget _buildWithCloseButton(BuildContext context, String? title) {
    return Container(
      height: 42,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      width: context.mediaQuery.size.width,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
      ),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        const SizedBox(),
        Text(title ?? '',
            style: context.textTheme.bodyLarge
                ?.copyWith(fontWeight: FontWeight.bold)),
        GestureDetector(
            onTap: () => Navigator.of(context).pop(),
            child: Image.asset(
              'assets/images/close.png',
              height: 14,
            ))
      ]),
    );
  }

  static Widget _buildWithCenterLine(BuildContext context, String? title) {
    return Container(
        height: 42,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        width: context.mediaQuery.size.width,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
        ),
        child: Center(
            child: Container(
          height: 3,
          width: context.sizeWidth / 8,
          decoration: BoxDecoration(
              color: const Color(0xff9CA3AF),
              borderRadius: BorderRadius.circular(8)),
        )));
  }
}

enum AppBottomsheetType { normal, withCloseButton, withCenterLine }
`;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_easy_dialogs/flutter_easy_dialogs.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

import '../../../router/router.dart';
import 'extensions/context_extension.dart';

class AppDialog {
  static final ValueNotifier<double> _valueNotifier =
      ValueNotifier<double>(0.0);
  static Future<void> loading({String? message, double? value}) async {
    final context = router.navigatorKey.currentContext!;
    _valueNotifier.value = 0.0;
    if (value != null) {
      _valueNotifier.value = value;
      final contains =
          FlutterEasyDialogs.get(FullScreenDialog.defaultId).isShown;
      if (contains) {
        return;
      }
    }

    FlutterEasyDialogs.show<FullScreenDialog>(
      Container(
        width: context.sizeWidth,
        height: context.sizeHeight,
        color: Colors.black.withOpacity(0.5),
        child: Center(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: context.canvasColor,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ValueListenableBuilder(
                  valueListenable: _valueNotifier,
                  builder: (context, v, child) => CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation(
                      context.textColor ?? Colors.black,
                    ),
                    value: value != null ? v : null,
                  ),
                ),
                if (message != null && message.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Text(
                    message,
                    textAlign: TextAlign.center,
                  ),
                ],
              ],
            ),
          ),
        ),
      )
          .fullScreen(autoHideDuration: null)
          .fade()
          .animatedTap()
          .slideVertical()
          .fadeBackground(),
    );
  }

  static Future<void> hideLoading() async {
    FlutterEasyDialogs.hide(id: FullScreenDialog.defaultId);
  }

  static Future<void> error(String message) async {
    final context = router.navigatorKey.currentContext!;
    FlutterEasyDialogs.show<FullScreenDialog>(EasyDialog.fullScreen(
      content: Container(
        width: context.sizeWidth,
        height: context.sizeHeight,
        color: Colors.black.withOpacity(0.5),
        child: Center(
          child: Container(
            width: double.infinity,
            margin: const EdgeInsets.all(32),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: context.canvasColor,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                PhosphorIcon(
                  PhosphorIcons.xCircle(PhosphorIconsStyle.duotone),
                  size: 24,
                  color: context.colorScheme.error,
                ),
                const SizedBox(height: 16),
                Text(
                  message,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                SizedBox(
                  width: double.infinity,
                  child: TextButton(
                    style: TextButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4),
                      ),
                      // backgroundColor: context.colorScheme.errorContainer,
                      foregroundColor: context.colorScheme.error,
                    ),
                    onPressed: () {
                      FlutterEasyDialogs.hide(id: FullScreenDialog.defaultId);
                    },
                    child: const Text('Close'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    ));
  }

  static Future<void> info(String message, {String? title}) async {
    final context = router.navigatorKey.currentContext!;
    await FlutterEasyDialogs.show<FullScreenDialog>(
      EasyDialog.fullScreen(
              content: _dialogWidget(
        context,
        [
          Text(
            title ?? 'Info',
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(message, textAlign: TextAlign.left),
          const SizedBox(height: 16),
          SizedBox(
            height: 32,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    elevation: 0,
                    padding: EdgeInsets.zero,
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4),
                      side: BorderSide(
                        color: context.textColor ?? Colors.indigo,
                        strokeAlign: BorderSide.strokeAlignInside,
                        width: .5,
                      ),
                    ),
                    foregroundColor: context.textColor,
                    textStyle: const TextStyle(
                      fontSize: 14,
                    ),
                  ),
                  onPressed: () {
                    FlutterEasyDialogs.hide(id: FullScreenDialog.defaultId);
                  },
                  child: const Text('Close'),
                ),
              ],
            ),
          ),
        ],
      ))
          .fade()
          .slideVertical()
          .swipe(direction: DismissDirection.up)
          .fadeBackground(
            backgroundColor: Colors.black.withOpacity(0.5),
            blur: 0.0,
          ),
    );
  }

  static Future<bool?> confirm(String message,
      {String? yesText, String? noText}) async {
    final context = router.navigatorKey.currentContext!;
    return (await FlutterEasyDialogs.show<bool>(
      EasyDialog.fullScreen(
        animationConfiguration: const EasyDialogAnimationConfiguration.bounded(
          duration: Duration(milliseconds: 300),
        ),
        content: _dialogWidget(
          context,
          [
            const Text(
              'Confirm',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Text(message, textAlign: TextAlign.left),
            const SizedBox(height: 16),
            SizedBox(
              height: 32,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    style: TextButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      elevation: 0,
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 4),
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4),
                        side: const BorderSide(
                          color: Colors.indigo,
                          width: .5,
                          strokeAlign: BorderSide.strokeAlignInside,
                        ),
                      ),
                      foregroundColor: Colors.indigo,
                      textStyle: const TextStyle(
                        fontSize: 14,
                      ),
                    ),
                    onPressed: () {
                      FlutterEasyDialogs.hide(
                          id: FullScreenDialog.defaultId, result: false);
                    },
                    child: Text(noText ?? 'No'),
                  ),
                  const SizedBox(width: 8),
                  TextButton(
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 4),
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      backgroundColor: Colors.indigo,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4),
                      ),
                      foregroundColor: Colors.white,
                      elevation: 0,
                      textStyle: const TextStyle(
                        fontSize: 14,
                      ),
                    ),
                    onPressed: () {
                      FlutterEasyDialogs.hide(
                          id: FullScreenDialog.defaultId, result: true);
                    },
                    child: Text(yesText ?? 'Yes'),
                  ),
                ],
              ),
            ),
          ],
        ),
      )
          .fade(
            curve: Curves.easeInOut,
          )
          .fadeBackground(
            backgroundColor: Colors.black.withOpacity(0.5),
            curve: Curves.easeInOut,
            blur: 0.0,
          ),
    ));
  }

  static Widget _dialogWidget(BuildContext context, List<Widget> contents) {
    return GestureDetector(
      onTap: () {
        FlutterEasyDialogs.hide(id: FullScreenDialog.defaultId);
      },
      child: Container(
        width: context.sizeWidth,
        height: context.sizeHeight,
        color: Colors.transparent,
        child: Center(
          child: Container(
            // little bit to the top like .4 of the screen
            margin: EdgeInsets.only(bottom: context.sizeHeight * .2),
            child: GestureDetector(
              onTap: () {
                /// jangan dihilangkan untuk disable click disini
              },
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                margin: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: context.canvasColor,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ...contents,
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  static Future<void> showAlert(String title, String content,
      {Map<String, Function> listAction = const {}}) {
    final context = router.navigatorKey.currentContext!;
    List<Widget> lstAction = [];
    if (listAction.keys.toList().isEmpty) {
      lstAction.add(MaterialButton(
        child: const Text('Close'),
        onPressed: () {
          try {
            Navigator.of(context).pop();
          } catch (ex) {
            log(ex.toString());
          }
        },
      ));
    } else {
      listAction.forEach((key, value) {
        lstAction.add(MaterialButton(
          child: Text(key),
          onPressed: () {
            value.call();
          },
        ));
      });
    }
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        // return object of type Dialog
        return MediaQuery(
          data: const MediaQueryData(textScaler: TextScaler.linear(1)),
          child: AlertDialog(
            title: Text(title),
            content: Text(content),
            actions: lstAction,
          ),
        );
      },
    );
  }
}

`;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'dart:io';
import 'package:dio/dio.dart';
import '../../router/router.dart';

class DioTokenInterceptor implements InterceptorsWrapper {
  final AppRouter router;

  DioTokenInterceptor(this.router);
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == HttpStatus.unauthorized) {
      // Refresh Token
    }
    return handler.next(err);
  }

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    return handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) async {
    return handler.next(response);
  }
}
`;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
class Endpoint {
}
`;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
bool parseIntToBool(int? map) {
  return map == 1 ? true : false;
}

int parseBoolToInt(bool map) {
  return map ? 1 : 0;
}

`;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'context_extension.dart';
export 'double_extension.dart';
export 'string_extension.dart';
`;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
extension NumExt on num {}
`;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
extension StringExt on String {
  String replacePercentage(int newPercentage) {
    return replaceAll('{percentage}', '$newPercentage%');
  }

  String getFutureDate() {
    final now = DateTime.now();
    final futureDate = now.add(Duration(days: int.parse(this)));
    final monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    final month = monthNames[futureDate.month - 1];
    final day = futureDate.day;
    final year = futureDate.year;
    return '$month $day, $year';
  }
}
`;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:flutter/material.dart';

extension ContextExt on BuildContext {
  MediaQueryData get mediaQuery => MediaQuery.of(this);
  bool get isLandscape => mediaQuery.orientation == Orientation.landscape;
  // Size related shortcuts
  Size get size => mediaQuery.size;
  double get sizeWidth => size.width;
  double get sizeHeight => size.height;
  EdgeInsets get padding => mediaQuery.padding;
  double get paddingTop => padding.top;

  // Theme related shortcuts
  ThemeData get theme => Theme.of(this);
  // AppColor get appColor => theme.appColor;
  ColorScheme get colorScheme => theme.colorScheme;

  // Accessing specific colors from the theme
  Color get primaryColor => theme.primaryColor;
  Color get canvasColor => theme.canvasColor;
  Color get scaffoldBackgroundColor => theme.scaffoldBackgroundColor;
  TextTheme get textTheme => theme.textTheme;
  Color? get textColor => theme.textTheme.bodyMedium?.color;
  Color get cardColor => theme.cardColor;
  Color? get iconThemeColor => theme.iconTheme.color;
  Color get disabledColor => theme.disabledColor;

  Color getChangeColor(double baseVal, double curVal) {
    if (curVal == baseVal) {
      return const Color.fromARGB(255, 215, 100, 12);
    } else if (curVal > baseVal) {
      return const Color.fromARGB(255, 0, 170, 102);
    } else {
      return const Color.fromARGB(255, 224, 62, 33);
    }
  }
}

`;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'primary_theme.dart';
`;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:flutter/material.dart';

ThemeData get primaryTheme {
  final base = ThemeData.light(useMaterial3: true);
  final primaryColor = createMaterialColor(const Color(0xff4E36E2));
  return base.copyWith(
    scaffoldBackgroundColor: Colors.white,
    primaryColor: primaryColor,
    textTheme: base.textTheme.apply(fontFamily: 'Poppins'),
    appBarTheme: AppBarTheme(
      backgroundColor: primaryColor,
      foregroundColor: Colors.white,
      centerTitle: true,
      titleTextStyle: const TextStyle(
        color: Colors.white,
        fontSize: 16,
        fontWeight: FontWeight.w600,
        fontFamily: 'Poppins',
      ),
    ),
    colorScheme: ColorScheme.fromSwatch(
      primarySwatch: primaryColor,
      brightness: Brightness.light,
      backgroundColor: Colors.white,
      errorColor: Colors.red.shade400,
      accentColor: Colors.indigoAccent,
      cardColor: Colors.white,
    ),
    dividerColor: const Color(0xffF2F2F2),
    dividerTheme: const DividerThemeData(
      color: Color(0xffF2F2F2),
      space: 0,
      thickness: 1,
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 0),
        minimumSize: Size.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        textStyle: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
    // actionIconTheme: ActionIconThemeData(
    //   backButtonIconBuilder: (context) => const Icon(Icons.arrow_back_ios_new),
    // ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        side: BorderSide(
          color: Colors.grey.shade200,
          width: 1,
        ),
        textStyle: const TextStyle(
          fontFamily: 'Poppins',
          fontWeight: FontWeight.w500,
        ),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        textStyle: const TextStyle(
          fontWeight: FontWeight.w500,
          fontFamily: 'Poppins',
        ),
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        overlayColor: Colors.black,
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      contentPadding: const EdgeInsets.symmetric(
        vertical: 8,
        horizontal: 16,
      ),
      alignLabelWithHint: true,
      filled: true,
      fillColor: Colors.grey.shade50,
      floatingLabelBehavior: FloatingLabelBehavior.always,
      labelStyle: const TextStyle(
        fontSize: 16,
        color: Colors.black,
        fontWeight: FontWeight.bold,
      ),
      floatingLabelStyle: TextStyle(
        fontSize: 16,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      hintStyle: TextStyle(
        fontSize: 14,
        color: Colors.grey.shade400,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: Colors.grey.shade200,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: primaryColor,
        ),
      ),
    ),
  );
}

MaterialColor createMaterialColor(Color color) {
  return MaterialColor(color.value, _getSwatch(color));
}

Map<int, Color> _getSwatch(Color color) {
  return {
    50: _tintColor(color, 0.9),
    100: _tintColor(color, 0.8),
    200: _tintColor(color, 0.6),
    300: _tintColor(color, 0.4),
    400: _tintColor(color, 0.2),
    500: color,
    600: _shadeColor(color, 0.1),
    700: _shadeColor(color, 0.2),
    800: _shadeColor(color, 0.3),
    900: _shadeColor(color, 0.4),
  };
}

Color _tintColor(Color color, double factor) {
  return Color.fromRGBO(
    color.red + ((255 - color.red) * factor).round(),
    color.green + ((255 - color.green) * factor).round(),
    color.blue + ((255 - color.blue) * factor).round(),
    1,
  );
}

Color _shadeColor(Color color, double factor) {
  return Color.fromRGBO(
    (color.red * (1 - factor)).round(),
    (color.green * (1 - factor)).round(),
    (color.blue * (1 - factor)).round(),
    1,
  );
}

`;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:auto_route/auto_route.dart';
import '../di/di.dart';
import '../presentations/presentations.dart';

part 'router.gr.dart';

AppRouter router = di();

@AutoRouterConfig(
  replaceInRouteName: 'View,Route',
)
class AppRouter extends RootStackRouter {
  @override
  List<AutoRoute> get routes => [
        AutoRoute(
          page: AuthRoute.page,
          children: const [
            // AutoRoute(
            //   page: LoginRoute.page,
            //   guards: const [
            //     // GuestGuard(),
            //   ],
            // )
          ],
        ),
      ];

  @override
  RouteType get defaultRouteType => const RouteType.cupertino();
}
`;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:auto_route/auto_route.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../presentations/auth/cubit/auth_cubit.dart';

class AuthGuard extends AutoRouteGuard {
  @override
  void onNavigation(NavigationResolver resolver, StackRouter router) {
    final context = router.navigatorKey.currentContext;
    if (context == null) {
      resolver.next(false);
      return;
    }
    final authenticated = context.read<AuthCubit>().state.isAuthenticated;
    if (authenticated) {
      resolver.next(true);
    } else {
      // resolver.redirect(const LoginRoute());
    }
  }
}
`;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'auth/auth.dart';
`;


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
export 'cubit/auth_cubit.dart';
export 'view/auth_view.dart';
`;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';

@RoutePage()
class AuthView extends StatelessWidget {
  const AuthView({super.key});

  @override
  Widget build(BuildContext context) {
    return const AutoRouter();
  }
}
`;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:hydrated_bloc/hydrated_bloc.dart';
import '../../../lib.dart';
export 'auth_state.dart';

class AuthCubit extends HydratedCubit<AuthState> {
  AuthCubit(
    //   this._loginUseCase
      )
      : super(AuthState()) {
    //   execuite get data
  }
//   final LoginUseCase _loginUseCase;

  @override
  AuthState? fromJson(Map<String, dynamic> json) {
    return AuthState.fromJson(json);
  }

  @override
  Map<String, dynamic>? toJson(AuthState state) {
    return state.toJson();
  }


//   login(String email, String password) async {
//     AppDialog.loading(message: 'Logging in...');
//     final result =
//         await _loginUseCase(LoginParam(email: email, password: password));
//     AppDialog.hideLoading();
//     result.fold(
//       (l) {
//         AppDialog.error(l.message);
//         emit(state.copyWith(user: null));
//       },
//       (r) => emit(state.copyWith(user: r)),
//     );
//     router.reevaluateGuards();
//   }

}
`;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
import 'package:freezed_annotation/freezed_annotation.dart';
part 'auth_state.freezed.dart';
part 'auth_state.g.dart';

@freezed
class AuthState with _$AuthState {
  const AuthState._();
  factory AuthState({
    String? user
  }) = _AuthState;

  factory AuthState.fromJson(Map<String, dynamic> json) =>
      _$AuthStateFromJson(json);

  bool get isAuthenticated => user != null;
}
`;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCreateRequestCommand = registerCreateRequestCommand;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
function registerCreateRequestCommand(context) {
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
        const selectedFolder = await vscode.window.showQuickPick(getDirectories(apiFolderPath).concat('+ Add Folder'), { placeHolder: 'Select a folder to save the API or add a new folder' });
        if (!selectedFolder) {
            vscode.window.showInformationMessage('No folder selected.');
            return;
        }
        let targetFolderPath = apiFolderPath;
        let targetFolder;
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
        }
        else {
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
function createApiClass(nameClass) {
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
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}
function toSnakeCase(input) {
    return input
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/\s+/g, '_')
        .toLowerCase();
}
function formatSingleText(input) {
    if (input.includes(' ') || input.includes('_')) {
        return input.split(/[\s_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCreateModelCommand = registerCreateModelCommand;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
function registerCreateModelCommand(context) {
    const createModelCommand = vscode.commands.registerCommand('fluttermagictools.createModel', async () => {
        // Step 1: Prompt for the model name
        const modelName = await vscode.window.showInputBox({
            prompt: 'Enter the model name',
            placeHolder: 'e.g., MyModel'
        });
        if (!modelName) {
            vscode.window.showInformationMessage('Model creation canceled or no input provided.');
            return;
        }
        // Step 2: Prompt for the JSON data
        const jsonData = await vscode.window.showInputBox({
            prompt: 'Paste the JSON response to generate the model',
            placeHolder: 'e.g., {"id": "123", "name": "Sample"}',
            value: '',
            ignoreFocusOut: true
        });
        if (!jsonData) {
            vscode.window.showInformationMessage('Model creation canceled or no JSON provided.');
            return;
        }
        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('Unable to determine the workspace root path.');
            return;
        }
        const entitiesFolderPath = path.join(rootPath, 'lib', 'domain', 'entities');
        // Ensure the `entities` directory exists
        if (!fs.existsSync(entitiesFolderPath)) {
            fs.mkdirSync(entitiesFolderPath, { recursive: true });
        }
        const selectedFolder = await vscode.window.showQuickPick(getDirectories(entitiesFolderPath).concat('+ Add Folder'), { placeHolder: 'Select a folder to save the model or add a new folder' });
        let targetFolderPath = entitiesFolderPath;
        if (selectedFolder === '+ Add Folder') {
            const newFolderName = await vscode.window.showInputBox({
                prompt: 'Enter the new folder name'
            });
            if (newFolderName) {
                targetFolderPath = path.join(entitiesFolderPath, newFolderName);
                fs.mkdirSync(targetFolderPath, { recursive: true });
            }
        }
        else if (selectedFolder) {
            targetFolderPath = path.join(entitiesFolderPath, selectedFolder);
        }
        // Step 4: Generate the model file name from the model name
        const modelFileName = `${toSnakeCase(modelName)}.dart`;
        // Step 5: Create the model file with the JSON content
        const modelFilePath = path.join(targetFolderPath, modelFileName);
        const modelTemplate = generateModelTemplate(modelName, jsonData);
        fs.writeFileSync(modelFilePath, modelTemplate);
        addExportToDomainFile(modelFilePath);
        vscode.window.showInformationMessage(`Model '${modelName}' created successfully at '${modelFilePath}'`);
        const shouldRunBuild = await vscode.window.showInformationMessage('Do you want to run `flutter pub run build_runner build` now?', 'Yes', 'No');
        if (shouldRunBuild === 'Yes') {
            runBuildRunnerCommand();
        }
    });
    context.subscriptions.push(createModelCommand);
}
function addExportToDomainFile(modelFilePath) {
    const libPath = path.join(vscode.workspace.rootPath ?? '', 'lib', 'domain', 'entities');
    const domainFilePath = path.join(libPath, 'entities.dart');
    // Get folderName and fileName from the model file path
    const folderName = path.relative(libPath, path.dirname(modelFilePath)).replace(/\\/g, '/');
    const fileName = path.basename(modelFilePath, '.dart');
    const exportStatement = `export '${folderName}/${fileName}.dart';\n`;
    // Check if the domain.dart file already exists
    if (!fs.existsSync(domainFilePath)) {
        // If not, create it
        fs.writeFileSync(domainFilePath, exportStatement);
    }
    else {
        // If it exists, append the export statement if it's not already in the file
        const currentContent = fs.readFileSync(domainFilePath, 'utf-8');
        if (!currentContent.includes(exportStatement)) {
            fs.appendFileSync(domainFilePath, exportStatement);
        }
    }
}
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}
function generateModelTemplate(modelName, jsonData) {
    const parsedJson = JSON.parse(jsonData);
    const { mainModel, nestedModels } = generateModels(parsedJson, modelName);
    // Combine all models into a single string, with a single header
    return [
        "// ignore_for_file: invalid_annotation_target",
        "import 'package:freezed_annotation/freezed_annotation.dart';",
        `part '${toSnakeCase(modelName)}.freezed.dart';`,
        `part '${toSnakeCase(modelName)}.g.dart';`,
        "",
        mainModel,
        ...nestedModels
    ].join('\n');
}
function generateModels(json, modelName, parentModelName = '') {
    let mainModel = generateSingleModel(json, modelName);
    let nestedModels = [];
    // Generate models for nested objects
    for (const key in json) {
        if (json[key] && typeof json[key] === 'object') {
            if (Array.isArray(json[key])) {
                // If it's an array, check if it contains objects
                if (json[key].length > 0 && typeof json[key][0] === 'object') {
                    const nestedModelName = capitalizeFirstLetter(singularize(key));
                    const result = generateModels(json[key][0], nestedModelName);
                    mainModel += result.mainModel;
                    nestedModels = [...nestedModels, ...result.nestedModels];
                }
            }
            else {
                // If it's a nested object, generate a model for it
                const nestedModelName = capitalizeFirstLetter(key);
                const result = generateModels(json[key], nestedModelName);
                nestedModels.push(result.mainModel);
                nestedModels = [...nestedModels, ...result.nestedModels];
            }
        }
    }
    return { mainModel, nestedModels };
}
function generateSingleModel(json, modelName) {
    let fields = '';
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const type = getDartType(json[key], key);
            fields += `    @JsonKey(name: '${key}') ${type} ${toCamelCaseFirstLetter(key)},\n`;
        }
    }
    const template = `
@freezed
class ${formatSingleText(modelName)} with _\$${formatSingleText(modelName)} {
    const factory ${formatSingleText(modelName)}({
${fields.trimEnd()}
    }) = _${formatSingleText(modelName)};

    factory ${formatSingleText(modelName)}.fromJson(Map<String, dynamic> json) => _\$${formatSingleText(modelName)}FromJson(json);
}
`;
    return template;
}
function getDartType(value, key) {
    if (value === null)
        return 'dynamic?';
    if (typeof value === 'string')
        return 'String?';
    if (typeof value === 'number')
        return value % 1 === 0 ? 'int?' : 'double?';
    if (typeof value === 'boolean')
        return 'bool?';
    if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
            return `List<${capitalizeFirstLetter(singularize(key))}>?`;
        }
        return 'List<dynamic>?';
    }
    if (typeof value === 'object')
        return `${capitalizeFirstLetter(key)}?`;
    return 'dynamic?';
}
function toCamelCaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1).replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function singularize(str) {
    return str.replace(/s$/, '');
}
function toSnakeCase(input) {
    return input
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/\s+/g, '_')
        .toLowerCase();
}
function formatSingleText(input) {
    if (input.includes(' ') || input.includes('_')) {
        return input.split(/[\s_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
function runBuildRunnerCommand() {
    const terminal = vscode.window.createTerminal('Flutter Build Runner');
    terminal.show();
    terminal.sendText('flutter pub run build_runner build');
}


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCreateViewCommand = registerCreateViewCommand;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
const view_1 = __webpack_require__(44);
// Register command for creating view
function registerCreateViewCommand(context) {
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
        const selectedFolder = await vscode.window.showQuickPick(getDirectories(presentationFolderPath).concat('+ Add Folder'), { placeHolder: 'Select a folder to save the view or add a new folder' });
        if (!selectedFolder) {
            vscode.window.showInformationMessage('No folder selected.');
            return;
        }
        let targetFolderPath = presentationFolderPath;
        let targetFolder;
        let selectFilePath;
        if (selectedFolder === '+ Add Folder') {
            const newFolderName = await vscode.window.showInputBox({
                prompt: 'Enter the new folder name'
            });
            if (newFolderName) {
                targetFolderPath = path.join(presentationFolderPath, newFolderName, 'view');
                fs.mkdirSync(targetFolderPath, { recursive: true });
                selectFilePath = path.join(presentationFolderPath, newFolderName, `${newFolderName}.dart`);
                targetFolder = newFolderName;
            }
            else {
                vscode.window.showInformationMessage('Folder creation canceled or no input provided.');
                return;
            }
        }
        else {
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
            fs.writeFileSync(viewFilePath, (0, view_1.viewScript)(convertToCapitalized(viewName)));
        }
        else {
            const currentContent = fs.readFileSync(viewFilePath, 'utf-8');
            if (!currentContent.includes((0, view_1.viewScript)(convertToCapitalized(viewName)))) {
                fs.appendFileSync(viewFilePath, (0, view_1.viewScript)(convertToCapitalized(viewName)));
            }
        }
        if (!fs.existsSync(selectFilePath)) {
            fs.writeFileSync(selectFilePath, exportStatement);
        }
        else {
            const currentContent = fs.readFileSync(selectFilePath, 'utf-8');
            if (!currentContent.includes(exportStatement)) {
                fs.appendFileSync(selectFilePath, exportStatement);
            }
        }
        if (!fs.existsSync(presentationFilePath)) {
            fs.writeFileSync(presentationFilePath, exportPresentationStatement);
        }
        else {
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
async function createRouter(viewName) {
    const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!rootPath) {
        vscode.window.showErrorMessage('Workspace folder is not open.');
        return;
    }
    const routerFilePath = path.join(rootPath, 'lib', 'router', 'router.dart');
    const routeName = convertToCapitalized(viewName) + 'Route';
    const newRoute = `   AutoRoute(
          page: ${routeName}.page,
        ),\n`;
    if (fs.existsSync(routerFilePath)) {
        let routerContent = fs.readFileSync(routerFilePath, 'utf-8');
        const marker = '];';
        if (routerContent.includes(marker)) {
            const newContent = routerContent.replace(marker, newRoute + marker);
            fs.writeFileSync(routerFilePath, newContent, 'utf-8');
            vscode.window.showInformationMessage(`Route for ${viewName} added to router.dart.`);
        }
        else {
            vscode.window.showErrorMessage(`Marker '${marker}' not found in router.dart.`);
        }
        vscode.window.showInformationMessage(`View '${viewName}' created successfully.`);
        const shouldRunBuild = await vscode.window.showInformationMessage('Do you want to run `flutter pub run build_runner build` now?', 'Yes', 'No');
        if (shouldRunBuild === 'Yes') {
            runBuildRunnerCommand();
        }
    }
    else {
        vscode.window.showErrorMessage('router.dart file not found.');
    }
}
// Get directories in a path
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}
// Convert a string to snake case
function toSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
}
// Convert a string to capitalized form
function convertToCapitalized(str) {
    return str
        .toLowerCase()
        .split(/[_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
// Run build runner command
function runBuildRunnerCommand() {
    const terminal = vscode.window.createTerminal('Flutter Build Runner');
    terminal.show();
    terminal.sendText('flutter pub run build_runner build');
}


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viewScript = viewScript;
function viewScript(viewName) {
    return `
  import 'package:auto_route/auto_route.dart';
  import 'package:flutter/material.dart';
  
  @RoutePage()
  class ${viewName}View extends StatelessWidget {
    const ${viewName}View({super.key});
  
    @override
    Widget build(BuildContext context) {
      return const Scaffold(
        body: Center(
          child: Text('${viewName} View'),
        ),
      );
    }
  }
    `.trim();
}


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCreateCubitCommand = registerCreateCubitCommand;
const vscode = __importStar(__webpack_require__(2));
function registerCreateCubitCommand(context) {
    const initCommand = vscode.commands.registerCommand('fluttermagictools.createCubit', () => { });
    context.subscriptions.push(initCommand);
}


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCreateEndpointCommand = registerCreateEndpointCommand;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
function registerCreateEndpointCommand(context) {
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
            }
            else {
                vscode.window.showErrorMessage(`Marker '${marker}' not found in endpoint.dart.`);
            }
        }
        else {
            vscode.window.showErrorMessage('endpoint.dart file not found.');
        }
    });
    context.subscriptions.push(initCommand);
}
function convertToCamelCase(input) {
    return input
        .split('/')
        .map((part, index) => index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');
}


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerMenuCommand = registerMenuCommand;
const vscode = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
function registerMenuCommand(context) {
    let menuCommand = vscode.commands.registerCommand('fluttermagictools.menu', async () => {
        const panel = vscode.window.createWebviewPanel('fluttermagictools', 'Flutter Magic Tools', vscode.ViewColumn.Beside, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src', 'menu'))]
        });
        const cssUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'src', 'menu', 'css', 'index.css')));
        const jsUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'src', 'menu', 'js', 'index.js')));
        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
        const entitiesFolderPath = path.join(rootPath, 'lib', 'domain', 'entities');
        const htmlPath = path.join(context.extensionPath, 'src', 'menu', 'index.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        htmlContent = htmlContent.replace('{{cssUri}}', cssUri.toString());
        htmlContent = htmlContent.replace('{{jsUri}}', jsUri.toString());
        panel.webview.html = htmlContent;
        panel.webview.onDidReceiveMessage(async (message) => {
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
                        console.log(`Folders: ${folders}`); // Debugging output
                        panel.webview.postMessage({ command: 'loadFolders', folders });
                    }
                    catch (error) {
                        console.error('Error reading folders:', error);
                        panel.webview.postMessage({ command: 'loadFolders', folders: [] });
                    }
                    break;
            }
        });
    });
    context.subscriptions.push(menuCommand);
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const initialize_1 = __webpack_require__(1);
const menu_1 = __webpack_require__(47);
const create_request_1 = __webpack_require__(41);
const create_model_1 = __webpack_require__(42);
const create_view_1 = __webpack_require__(43);
const create_cubit_1 = __webpack_require__(45);
const create_endpoint_1 = __webpack_require__(46);
/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context - The context in which the extension is activated.
 */
function activate(context) {
    console.log('FlutterMagicTools is now active!');
    // Register commands
    (0, initialize_1.registerInitializeCommand)(context);
    (0, menu_1.registerMenuCommand)(context);
    (0, create_request_1.registerCreateRequestCommand)(context);
    (0, create_model_1.registerCreateModelCommand)(context);
    (0, create_view_1.registerCreateViewCommand)(context);
    (0, create_cubit_1.registerCreateCubitCommand)(context);
    (0, create_endpoint_1.registerCreateEndpointCommand)(context);
    // Register webview provider
    // Register other commands
    // registerCreateFeatureCommand(context);
}
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map