# Eco Crafting Tool

Crafting calculator for Eco Global Survival by Strange Loop Games located at https://eco-calc.com. Computes production
costs for in-game items based on labor, materials, and crafting table upgrades.

**Are you here to see if the app has been updated for the last Eco game version? You may be able to help if you are a developer. See [Editing Recipes and Items](#editing-recipes-and-items) and use this project to generate the new entries: [EcoDataReader](https://github.com/aritchie05/EcoDataReader).**

## Workspace Setup

To run this project locally, you will want to use an IDE with support for [npm](https://www.npmjs.com/) projects. The recommended Node.js version to work with Angular 17.0.0 is [v20.9.0](https://nodejs.org/download/release/v20.9.0/).

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

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
