import {UpgradeModule} from './upgrade-module';

export class CraftingTable {
  name: string;
  nameID: string;
  upgradeModuleType: string;
  selectedUpgrade?: UpgradeModule;
  availableUpgrades?: UpgradeModule[];
}

