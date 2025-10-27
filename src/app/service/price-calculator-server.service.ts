import {Injectable, signal, WritableSignal} from '@angular/core';
import {PREDEFINED_SERVERS, ServerConfig, serverGroups} from '../model/server-api/server-config';
import {HttpClient} from '@angular/common/http';
import {ServerItem, ServerItemsResponse} from '../model/server-api/server-item';
import {Observable} from 'rxjs';
import {ServerRecipe, ServerRecipesResponse} from '../model/server-api/server-recipe';
import {items} from '../../assets/data/items';
import {recipesArray} from '../../assets/data/recipes';
import {environment} from '../../environments/environment';
import {CraftingDataService} from './crafting-data.service';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorServerService {
  private readonly selectedServer: WritableSignal<ServerConfig> = signal(PREDEFINED_SERVERS.servers()[0]);

  private readonly baseUrlPath = environment.serverBasePath;
  private readonly itemsPath = environment.serverItemsPath;
  private readonly recipesPath = environment.serverRecipesPath;

  constructor(private http: HttpClient, private craftingDataService: CraftingDataService) {

  }

  getSelectedServer(): ServerConfig {
    return this.selectedServer();
  }

  setSelectedServer(server: ServerConfig): void {
    if (server.id === 'white-tiger' && environment.whiteTigerHostName) {
      server.hostname = environment.whiteTigerHostName;
    }
    this.selectedServer.set(server);
    this.getAllItems().subscribe(response => {
      const newServerItems = this.parseNewItems(response);
      this.craftingDataService.processNewItems(newServerItems);
    });

    this.getAllRecipes().subscribe(response => {
      const newRecipes = this.parseNewRecipes(response);
      this.craftingDataService.processNewRecipes(newRecipes);

      console.debug(`New recipes found: ${newRecipes.flatMap(recipe => recipe.Key)}`);
    });
  }

  getSelectedServerSignal(): WritableSignal<ServerConfig> {
    return this.selectedServer;
  }

  getAllItems(): Observable<ServerItemsResponse> {
    const url = 'https://' + this.getSelectedServer().hostname + this.baseUrlPath + this.itemsPath;
    return this.http.get<ServerItemsResponse>(url);
  }

  getAllRecipes(): Observable<ServerRecipesResponse> {
    const url = 'https://' + this.getSelectedServer().hostname + this.baseUrlPath + this.recipesPath;
    return this.http.get<ServerRecipesResponse>(url);
  }

  parseNewItems(response: ServerItemsResponse): ServerItem[] {
    const newItems: ServerItem[] = [];

    Object.values(response.AllItems).forEach((item) => {
      const id = item.PropertyInfos.Name.String;
      if (!items.has(id)) {
        console.debug(`New item found: ${id}`);
        newItems.push(item);
      }
    });

    return newItems;
  }

  parseNewRecipes(response: ServerRecipesResponse): ServerRecipe[] {
    return response.Recipes.filter(recipe =>
      !recipesArray.some(r => r.name === recipe.Key)
    );
  }

  getServerById(serverId: string): ServerConfig | undefined {
    let server: ServerConfig | undefined;
    for (let group of serverGroups()) {
      server = group.servers().find(server => server.id === serverId);
      if (server) {
        break;
      }
    }
    return server;
  }
}
