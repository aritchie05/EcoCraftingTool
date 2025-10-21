import {Injectable, signal, WritableSignal} from '@angular/core';
import {PREDEFINED_SERVERS, ServerConfig} from '../model/server-config';
import {HttpClient} from '@angular/common/http';
import {ServerItemsResponse} from '../model/server-api/server-api-item';
import {Observable} from 'rxjs';
import {ServerRecipesResponse} from '../model/server-api/server-api-recipe';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorServerService {
  private readonly selectedServer: WritableSignal<ServerConfig> = signal(PREDEFINED_SERVERS[1]);

  private readonly baseUrlPath = '/api/v1/plugins/EcoPriceCalculator';
  private readonly itemsPath = '/allItems';
  private readonly recipesPath = '/recipes';

  constructor(private http: HttpClient) {

  }

  getSelectedServer(): ServerConfig {
    return this.selectedServer();
  }

  setSelectedServer(server: ServerConfig): void {
    this.selectedServer.set(server);
    this.getAllItems().subscribe(response => {
      this.parseNewItems(response);
    });

    this.getAllRecipes().subscribe(response => {
      const newRecipes = this.parseNewRecipes(response);

      console.debug(`New recipes found: ${newRecipes.flatMap(recipe => recipe.Key)}`);
    });
  }

  getSelectedServerSignal(): WritableSignal<ServerConfig> {
    return this.selectedServer;
  }

  getAllItems(): Observable<ServerItemsResponse> {
    const url = this.getSelectedServer().hostname + this.baseUrlPath + this.itemsPath;
    return this.http.get<ServerItemsResponse>(url);
  }

  getAllRecipes(): Observable<ServerRecipesResponse> {
    const url = this.getSelectedServer().hostname + this.baseUrlPath + this.recipesPath;
    return this.http.get<ServerRecipesResponse>(url);
  }

  parseNewItems(response: ServerItemsResponse): ServerApiItem[] {
    const newItems: ServerApiItem[] = [];

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
}
