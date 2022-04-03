import {UpgradeModule} from './upgrade-module';

export class CraftingTable {
  name: string;
  nameID: string;
  upgradeModuleType: string;
  hidden: boolean;
  selectedUpgrade?: UpgradeModule;
  availableUpgrades?: UpgradeModule[];
}

