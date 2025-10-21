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
}
