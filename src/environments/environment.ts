// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  releasesUrl: 'https://api.github.com/repos/aritchie05/EcoCraftingTool/releases',
  imageBaseUrl: 'http://localhost:4200/assets/img/',
  mockServersResponse: false,
  serverBasePath: '/api/v1/plugins/EcoPriceCalculator',
  serverItemsPath: '/allItems',
  serverRecipesPath: '/recipes',
  whiteTigerHostName: 'https://white-tiger.play.eco'
};
