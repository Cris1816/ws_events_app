"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const rimraf_1 = __importDefault(require("rimraf"));
const bootstrap_service_1 = __importDefault(require("../services/bootstrap.service"));
/*
 * We need to mock all calls to path so that it will be redirected to the root dir,
 * E.g `some_module` => `react-native-ui-kitten/some_module`
 */
jest.mock('path', () => {
    const ActualPath = jest.requireActual('path');
    return {
        ...ActualPath,
        resolve: (...pathSegments) => {
            const lastPathSegment = pathSegments[pathSegments.length - 1];
            return ActualPath.resolve(lastPathSegment);
        },
    };
});
describe('@bootstrap-service: instance checks', () => {
    const evaConfig = {
        evaPackage: '@eva-design/eva',
    };
    afterAll(() => {
        const evaPackageIndexPath = path_1.default.resolve(`node_modules/${evaConfig.evaPackage}/index.js`);
        const generatedFilePath = path_1.default.resolve(`node_modules/${evaConfig.evaPackage}/generated.json`);
        const currentExports = fs_1.default.readFileSync(evaPackageIndexPath, { encoding: 'utf8' });
        const [originalExports] = currentExports.split('exports.styles');
        fs_1.default.writeFileSync(evaPackageIndexPath, originalExports);
        rimraf_1.default.sync(generatedFilePath);
        jest.resetAllMocks();
    });
    it('should bootstrap @eva-design/eva package', () => {
        bootstrap_service_1.default.run(evaConfig);
        const outputString = fs_1.default.readFileSync(`node_modules/${evaConfig.evaPackage}/generated.json`).toString();
        const outputAsObject = JSON.parse(outputString);
        expect(outputAsObject.checksum).toBeTruthy();
        expect(outputAsObject.checksum).toEqual('default');
        expect(outputAsObject.styles).toBeTruthy();
    });
    it('should bootstrap @eva-design/eva package with custom styles', () => {
        bootstrap_service_1.default.run({ ...evaConfig, customMappingPath: 'src/metro-config/tests/custom-mapping.json' });
        const outputString = fs_1.default.readFileSync(`node_modules/${evaConfig.evaPackage}/generated.json`).toString();
        const outputAsObject = JSON.parse(outputString);
        expect(outputAsObject.checksum).toBeTruthy();
        expect(outputAsObject.checksum).not.toEqual('default');
        expect(outputAsObject.styles.StatusBar).toBeTruthy();
    });
});
//# sourceMappingURL=bootstrap.service.spec.js.map