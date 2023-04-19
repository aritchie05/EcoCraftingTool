import {Recipe} from '../../../app/interface/recipe';
import {getCraftingTableByNameID, getItemByNameID, getSkillByNameID} from '../util/data-utils';

export let whiteTigerRecipes: Recipe[] = [
  {
    'name': 'Basic Upgrade 1',
    'nameID': 'BasicUpgradeLvl1',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 200,
    'craftingTable': getCraftingTableByNameID('WorkbenchObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('GatheringResearchPaperBasicItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('DendrologyResearchPaperBasicItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('CulinaryResearchPaperBasicItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 10,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('BasicUpgradeLvl1Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Basic Upgrade 2',
    'nameID': 'BasicUpgradeLvl2',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 200,
    'craftingTable': getCraftingTableByNameID('WorkbenchObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('MortarItem'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('GeologyResearchPaperBasicItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('GeologyResearchPaperAdvancedItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('MortaredStone'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('BasicUpgradeLvl1Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('BasicUpgradeLvl2Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Basic Upgrade 3',
    'nameID': 'BasicUpgradeLvl3',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 200,
    'craftingTable': getCraftingTableByNameID('WorkbenchObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('CrabPotItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('AgricultureResearchPaperAdvancedItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('CottonFabricItem'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('BasicUpgradeLvl2Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('BasicUpgradeLvl3Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Basic Upgrade 4',
    'nameID': 'BasicUpgradeLvl4',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 200,
    'craftingTable': getCraftingTableByNameID('WorkbenchObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('DendrologyResearchPaperAdvancedItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('WoodenWheelItem'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('WoodBoard'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('BasicUpgradeLvl3Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('BasicUpgradeLvl4Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Advanced Upgrade 1',
    'nameID': 'AdvancedUpgradeLvl1',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 400,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('FurPeltItem'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('LeatherHideItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('BeanPasteItem'),
        'quantity': 10,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('AdvancedUpgradeLvl1Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Advanced Upgrade 2',
    'nameID': 'AdvancedUpgradeLvl2',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 400,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('BrickItem'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('CulinaryResearchPaperAdvancedItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('AdvancedUpgradeLvl1Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('AdvancedUpgradeLvl2Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Advanced Upgrade 3',
    'nameID': 'AdvancedUpgradeLvl3',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 400,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('CopperBarItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('AgricultureResearchPaperModernItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('AdvancedUpgradeLvl2Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('AdvancedUpgradeLvl3Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Advanced Upgrade 4',
    'nameID': 'AdvancedUpgradeLvl4',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 400,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('GlassItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('IronPlateItem'),
        'quantity': 6,
        'reducible': false
      },
      {
        'item': getItemByNameID('PistonItem'),
        'quantity': 4,
        'reducible': false
      },
      {
        'item': getItemByNameID('CopperPlateItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('AdvancedUpgradeLvl3Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('AdvancedUpgradeLvl4Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Modern Upgrade 1',
    'nameID': 'ModernUpgradeLvl1',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 600,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('SteelPlateItem'),
        'quantity': 4,
        'reducible': false
      },
      {
        'item': getItemByNameID('SteelAxleItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('PlasticItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('EpoxyItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('SyntheticRubberItem'),
        'quantity': 2,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('ModernUpgradeLvl1Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Modern Upgrade 2',
    'nameID': 'ModernUpgradeLvl2',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 600,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('CulinaryResearchPaperAdvancedItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('CulinaryResearchPaperModernItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('ModernUpgradeLvl1Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('ModernUpgradeLvl2Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Modern Upgrade 3',
    'nameID': 'ModernUpgradeLvl3',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 600,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('RivetItem'),
        'quantity': 12,
        'reducible': false
      },
      {
        'item': getItemByNameID('AshlarStone'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('ModernUpgradeLvl2Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('ModernUpgradeLvl3Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Modern Upgrade 4',
    'nameID': 'ModernUpgradeLvl4',
    'skill': getSkillByNameID('NoSkill'),
    'level': 0,
    'labor': 600,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('BasicCircuitItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('ElectricMotorItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('SubstrateItem'),
        'quantity': 4,
        'reducible': false
      },
      {
        'item': getItemByNameID('CompositeLumber'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('ModernUpgradeLvl3Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('ModernUpgradeLvl4Item'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  //START 10.0 RECIPES
  {
    'name': 'Decorative Hanging Buoy',
    'nameID': 'DecorativeHangingBuoy',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 4,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('PlasticItem'),
        'quantity': 5,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('DecorativeHangingBuoyItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Decorative Life Preserver',
    'nameID': 'DecorativeLifePreserver',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 2,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('PlasticItem'),
        'quantity': 5,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('DecorativeLifePreserverItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Glass Lens',
    'nameID': 'GlassLens',
    'skill': getSkillByNameID('GlassworkingSkill'),
    'level': 1,
    'labor': 30,
    'craftingTable': getCraftingTableByNameID('GlassworksObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('GlassItem'),
        'quantity': 6,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('GlassLensItem'),
        'quantity': 2,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Handheld Camera',
    'nameID': 'HandheldCamera',
    'skill': getSkillByNameID('ElectronicsSkill'),
    'level': 3,
    'labor': 250,
    'craftingTable': getCraftingTableByNameID('ElectronicsAssemblyObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('FiberglassItem'),
        'quantity': 10,
        'reducible': true
      },
      {
        'item': getItemByNameID('PlasticItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('GlassLensItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('LightBulbItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('BasicCircuitItem'),
        'quantity': 2,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('HandheldCameraItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Hemp Mooring Rope',
    'nameID': 'HempMooringRope',
    'skill': getSkillByNameID('TailoringSkill'),
    'level': 1,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('TailoringTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('LinenYarnItem'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('HempMooringRopeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Industrial Barge',
    'nameID': 'IndustrialBarge',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 6,
    'labor': 2500,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronHullSheetItem'),
        'quantity': 18,
        'reducible': true
      },
      {
        'item': getItemByNameID('NylonMooringRopeItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('MetalRudderItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('SteelAxleItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('IronAnchorItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('CombustionEngineItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('LargeMetalShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('IndustrialBargeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Iron Anchor',
    'nameID': 'IronAnchor',
    'skill': getSkillByNameID('SmeltingSkill'),
    'level': 2,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('AnvilObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 16,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('IronAnchorItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Iron Hull Sheet',
    'nameID': 'IronHullSheet',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 4,
    'labor': 60,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronPlateItem'),
        'quantity': 2,
        'reducible': true
      },
      {
        'item': getItemByNameID('ScrewsItem'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('IronHullSheetItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Large Canoe',
    'nameID': 'LargeCanoe',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 2,
    'labor': 360,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodenOarItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('SmallWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('LargeCanoeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Large Metal Ship Frame',
    'nameID': 'LargeMetalShipFrame',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 5,
    'labor': 240,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('SteelBarItem'),
        'quantity': 12,
        'reducible': true
      },
      {
        'item': getItemByNameID('RivetItem'),
        'quantity': 12,
        'reducible': true
      },
      {
        'item': getItemByNameID('MetalKeelItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('LargeMetalShipFrameItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Large Wooden Ship Frame',
    'nameID': 'LargeWoodenShipFrame',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 5,
    'labor': 200,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenKeelItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 24,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('LargeWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Linen Yarn',
    'nameID': 'LinenYarn',
    'skill': getSkillByNameID('TailoringSkill'),
    'level': 1,
    'labor': 30,
    'craftingTable': getCraftingTableByNameID('TailoringTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('PlantFibersItem'),
        'quantity': 20,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('LinenYarnItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Medium Fishing Trawler',
    'nameID': 'MediumFishingTrawler',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 3,
    'labor': 1200,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronHullSheetItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('HempMooringRopeItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('MetalRudderItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('IronAxleItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('IronAnchorItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('PortableSteamEngineItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('MediumMetalShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('MediumFishingTrawlerItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Medium Metal Ship Frame',
    'nameID': 'MediumMetalShipFrame',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 4,
    'labor': 160,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 12,
        'reducible': true
      },
      {
        'item': getItemByNameID('ScrewsItem'),
        'quantity': 12,
        'reducible': true
      },
      {
        'item': getItemByNameID('MetalKeelItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('MediumMetalShipFrameItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Medium Shipyard',
    'nameID': 'MediumShipyard',
    'skill': getSkillByNameID('MechanicsSkill'),
    'level': 1,
    'labor': 800,
    'craftingTable': getCraftingTableByNameID('MachinistTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('Lumber'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('MediumShipyardItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Medium Wooden Ship Frame',
    'nameID': 'MediumWoodenShipFrame',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 4,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenKeelItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 16,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('MediumWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Metal Keel',
    'nameID': 'MetalKeel',
    'skill': getSkillByNameID('MechanicsSkill'),
    'level': 4,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('ShaperObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('MetalKeelItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Metal Rudder',
    'nameID': 'MetalRudder',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 4,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronPlateItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('ScrewsItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('IronGearItem'),
        'quantity': 2,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('MetalRudderItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Nylon Mooring Rope',
    'nameID': 'NylonMooringRope',
    'skill': getSkillByNameID('TailoringSkill'),
    'level': 3,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('AdvancedTailoringTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('NylonThreadItem'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('NylonMooringRopeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Outpost Netting',
    'nameID': 'OutpostNetting',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 1,
    'labor': 180,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('HempMooringRopeItem'),
        'quantity': 6,
        'reducible': true
      },
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('OutpostNettingItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Shipwright Advanced Upgrade',
    'nameID': 'ShipwrightAdvancedUpgrade',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 7,
    'labor': 6000,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('AdvancedUpgradeLvl4Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('ShipwrightAdvancedUpgradeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Shipwright Basic Upgrade',
    'nameID': 'ShipwrightBasicUpgrade',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 7,
    'labor': 3000,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('BasicUpgradeLvl4Item'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('ShipwrightBasicUpgradeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Small Canoe',
    'nameID': 'SmallCanoe',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 1,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodenOarItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('SmallWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('SmallCanoeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Small Shipyard',
    'nameID': 'SmallShipyard',
    'skill': getSkillByNameID('LoggingSkill'),
    'level': 1,
    'labor': 360,
    'craftingTable': getCraftingTableByNameID('CarpentryTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 10,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodBoard'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('SmallShipyardItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Small Wooden Boat',
    'nameID': 'SmallWoodenBoat',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 3,
    'labor': 680,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodenWheelItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('GearboxItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('MediumWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('SmallWoodenBoatItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Small Wooden Ship Frame',
    'nameID': 'SmallWoodenShipFrame',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 1,
    'labor': 60,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenKeelItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('SmallWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Steel Moorage Post',
    'nameID': 'SteelMooragePost',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 3,
    'labor': 240,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('SteelBarItem'),
        'quantity': 12,
        'reducible': true
      },
      {
        'item': getItemByNameID('RivetItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('NylonMooringRopeItem'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('SteelMooragePostItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Tripod Camera',
    'nameID': 'TripodCamera',
    'skill': getSkillByNameID('MechanicsSkill'),
    'level': 3,
    'labor': 250,
    'craftingTable': getCraftingTableByNameID('MachinistTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('CopperBarItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('LeatherHideItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('GlassLensItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('LightBulbItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('WoodBoard'),
        'quantity': 16,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('TripodCameraItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Barge',
    'nameID': 'WoodenBarge',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 4,
    'labor': 800,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 18,
        'reducible': true
      },
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('HempMooringRopeItem'),
        'quantity': 8,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodenWheelItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('GearboxItem'),
        'quantity': 4,
        'reducible': false
      },
      {
        'item': getItemByNameID('LargeWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenBargeItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Hull Planks',
    'nameID': 'WoodenHullPlanks',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 1,
    'labor': 60,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Keel',
    'nameID': 'WoodenKeel',
    'skill': getSkillByNameID('LoggingSkill'),
    'level': 2,
    'labor': 60,
    'craftingTable': getCraftingTableByNameID('CarpentryTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('Wood'),
        'quantity': 8,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenKeelItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Moorage Post',
    'nameID': 'WoodenMooragePost',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 1,
    'labor': 120,
    'craftingTable': getCraftingTableByNameID('SmallShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('HempMooringRopeItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 12,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodBoard'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenMooragePostItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Oar',
    'nameID': 'WoodenOar',
    'skill': getSkillByNameID('LoggingSkill'),
    'level': 2,
    'labor': 60,
    'craftingTable': getCraftingTableByNameID('CarpentryTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('HewnLog'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenOarItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Rudder',
    'nameID': 'WoodenRudder',
    'skill': getSkillByNameID('CarpentrySkill'),
    'level': 4,
    'labor': 40,
    'craftingTable': getCraftingTableByNameID('SawmillObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('IronGearItem'),
        'quantity': 2,
        'reducible': true
      },
      {
        'item': getItemByNameID('Lumber'),
        'quantity': 4,
        'reducible': true
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenRudderItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
  {
    'name': 'Wooden Transport Ship',
    'nameID': 'WoodenTransportShip',
    'skill': getSkillByNameID('ShipwrightSkill'),
    'level': 1,
    'labor': 1000,
    'craftingTable': getCraftingTableByNameID('MediumShipyardObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('WoodenHullPlanksItem'),
        'quantity': 18,
        'reducible': true
      },
      {
        'item': getItemByNameID('IronBarItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('HempMooringRopeItem'),
        'quantity': 4,
        'reducible': true
      },
      {
        'item': getItemByNameID('WoodenRudderItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('IronAxleItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('PortableSteamEngineItem'),
        'quantity': 1,
        'reducible': false
      },
      {
        'item': getItemByNameID('LargeWoodenShipFrameItem'),
        'quantity': 1,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('WoodenTransportShipItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  }
];
