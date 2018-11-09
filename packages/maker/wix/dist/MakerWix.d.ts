import MakerBase, { MakerOptions } from "@electron-forge/maker-base";
import { ForgePlatform } from "@electron-forge/shared-types";
import { MakerWixConfig } from "./Config";
export default class MakerWix extends MakerBase<MakerWixConfig> {
    name: string;
    defaultPlatforms: ForgePlatform[];
    isSupportedOnCurrentPlatform(): boolean;
    make({ dir, makeDir, targetArch, packageJSON, appName }: MakerOptions): Promise<string[]>;
}
