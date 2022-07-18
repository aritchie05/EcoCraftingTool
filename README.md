# Eco Crafting Tool

Crafting calculator for Eco Global Survival by Strange Loop Games located at https://eco-calc.com. Computes production
costs for in-game items based on labor, materials, and crafting table upgrades.

## Editing Recipes and Items

Recipes and items are stored at `src/assets/data` in various TypeScript files. When viewing these files in an IDE, it is recommended to disable inspections and highlighting for performance reasons, particularly `recipes.ts` and `items.ts`. For example, this can be done in IntelliJ IDEA by clicking the top right corner of the editor pane and selecting Highlight: None.

## Translations

Translations are provided by [Google Translate API](https://cloud.google.com/translate/docs/basic/translate-text-basic) and stored
at `src/assets/data/locale-data.ts`.

## Deploying to a Server

To deploy to a web server, run the Angular build command `ng build --prod`. This will build the source files to the `dist` folder in a folder called `EcoCraftingTool`. These files should then be deployed to a web server, like nginx or Apache.

## Angular Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

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
