import {Recipe} from '../../../app/interface/recipe';
import {getCraftingTableByNameID, getItemByNameID, getSkillByNameID} from '../util/data-utils';

export let whiteTigerRecipes: Recipe[] = [
  {
    'name': 'Basic Upgrade 1',
    'nameID': 'BasicUpgradeLvl1',
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
        'item': getItemByNameID('CottonLintItem'),
        'quantity': 5,
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
        'item': getItemByNameID('LinenFabricItem'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
    'level': 0,
    'labor': 400,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('FurPeltItem'),
        'quantity': 8,
        'reducible': false
      },
      {
        'item': getItemByNameID('LeatherHideItem'),
        'quantity': 2,
        'reducible': false
      },
      {
        'item': getItemByNameID('CottonFabricItem'),
        'quantity': 10,
        'reducible': false
      },
      {
        'item': getItemByNameID('BeanPasteItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('OilPaintItem'),
        'quantity': 5,
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
        'item': getItemByNameID('CanvasItem'),
        'quantity': 2,
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
    'level': 0,
    'labor': 400,
    'craftingTable': getCraftingTableByNameID('ResearchTableObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('GlassLensItem'),
        'quantity': 10,
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
    'skill': getSkillByNameID('SelfImprovementSkill'),
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
  {
    'name': 'Agriculture Research Paper Modern',
    'nameID': 'AgricultureResearchPaperModern',
    'skill': getSkillByNameID('SelfImprovementSkill'),
    'level': 0,
    'labor': 600,
    'craftingTable': getCraftingTableByNameID('LaboratoryObject'),
    'hidden': false,
    'ingredients': [
      {
        'item': getItemByNameID('BerryExtractFertilizerItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('BloodMealFertilizerItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('HideAshFertilizerItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('PeltFertilizerItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('PaperItem'),
        'quantity': 5,
        'reducible': false
      },
      {
        'item': getItemByNameID('RawFood'),
        'quantity': 200,
        'reducible': false
      }
    ],
    'outputs': [
      {
        'item': getItemByNameID('AgricultureResearchPaperModernItem'),
        'quantity': 1,
        'reducible': false,
        'primary': true
      }
    ]
  },
];
