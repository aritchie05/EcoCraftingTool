# Eco Crafting Tool

Crafting calculator for Eco Global Survival by Strange Loop Games located at https://eco-calc.com. Computes production
costs for in-game items based on labor, materials, and crafting table upgrades.

## Workspace Setup

To run this project locally, you will want to use an IDE with support for [npm](https://www.npmjs.com/) projects. The recommended Node.js version to work with Angular 12.0.0 is [v14.21.3](https://nodejs.org/download/release/v14.21.3/). Note that this version comes bundled with npm v6.14.18.
As a small note, I actually run this project locally on Node.js v16.20.1 with no issues, other than some Unsupported engine warnings in the Terminal. Make of that what you will.

Once you have the project cloned in your IDE, run `npm install` to download all the dependencies. Then, run `npm start` to start a local server at http://localhost:4200.

## Dev Workflow

To edit the repository, create a feature branch like `recipe-updates-9.6` and push the changes to that feature branch. Then, open a pull request into the `develop` branch. Verify and test the changes using the develop domain at https://eco-crafting-tool.vercel.app. Once the changes are confirmed, create a GitHub release and merge `develop` into `master`. This will deploy the changes to https://eco-calc.com.

## Editing Recipes and Items

Recipes and items are stored at `src/assets/data` in various TypeScript files. When viewing these files in an IDE, it is recommended to disable inspections and highlighting for performance reasons, particularly `recipes.ts` and `items.ts`. For example, this can be done in IntelliJ IDEA by clicking the top right corner of the editor pane and selecting Highlight: None.

### White Tiger Recipes

Recipes for White Tiger are stored at `src/assets/data/white-tiger/white-tiger-recipes.ts`. These recipes will be added to the master recipe list if the checkbox is enabled in the settings menu. If the `nameID` on the WT recipe matches an existing recipe in `recipes.ts`, it will replace the existing recipe. Otherwise, it will be added as a separate recipe. 
At this point, White Tiger custom items, crafting tables, and skills need to be added to the main data files. 
When editing or adding WT recipes, make sure the `nameIDs` match the corresponding base file - `skills.ts` for `skillNameID`, `items.ts` for `itemNameID`, etc. They should also match the name IDs from the game files.

## Translations

Translations are provided by [Crowdin](https://crowdin.com/project/eco-by-strange-loop-games) from `defaultstrings.csv` and stored at `src/assets/data/locale-data.ts`.

## Deploying to a Server

To deploy to a web server, run the Angular build command `ng build --prod`. This will build the source files to the `dist` folder in a folder called `EcoCraftingTool`. These files should then be deployed to a web server, like nginx or Apache.

## Angular Details

This project was built with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will not automatically reload if you change
any of the source files due to node memory issues. The equivalent command is `ng serve --watch=false`.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
