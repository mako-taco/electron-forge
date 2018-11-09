"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const maker_base_1 = __importDefault(require("@electron-forge/maker-base"));
const path_1 = __importDefault(require("path"));
const author_name_1 = __importDefault(require("./util/author-name"));
const creator_1 = require("electron-wix-msi/lib/creator");
class MakerWix extends maker_base_1.default {
    constructor() {
        super(...arguments);
        this.name = "wix";
        this.defaultPlatforms = ["win32"];
    }
    isSupportedOnCurrentPlatform() {
        return process.platform === "win32";
    }
    make({ dir, makeDir, targetArch, packageJSON, appName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const outPath = path_1.default.resolve(makeDir, `./wix/${targetArch}`);
            yield this.ensureDirectory(outPath);
            const creator = new creator_1.MSICreator(Object.assign({
                description: packageJSON.description,
                name: appName,
                version: packageJSON.version,
                manufacturer: author_name_1.default(packageJSON.author),
                exe: `${appName}.exe`
            }, this.config, {
                appDirectory: dir,
                outputDirectory: outPath
            }));
            if (this.config.beforeCreate) {
                yield Promise.resolve(this.config.beforeCreate(creator));
            }
            yield creator.create();
            const { msiFile } = yield creator.compile();
            return [msiFile];
        });
    }
}
exports.default = MakerWix;
//# sourceMappingURL=MakerWix.js.map