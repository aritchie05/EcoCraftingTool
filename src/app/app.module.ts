import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {SkillsComponent} from './skills/skills.component';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {OutputsComponent} from './outputs/outputs.component';
import {HttpClientModule} from '@angular/common/http';
import {CraftingParentComponent} from './crafting-parent/crafting-parent.component';
import {CookieService} from 'ngx-cookie-service';
import {ReleaseNotesComponent} from './release-notes/release-notes.component';
import { CustomRecipesComponent } from './custom-recipes/custom-recipes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SkillsComponent,
    IngredientsComponent,
    OutputsComponent,
    CraftingParentComponent,
    ReleaseNotesComponent,
    CustomRecipesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'custom-recipes', component: CustomRecipesComponent},
      {path: 'calculator', component: CraftingParentComponent},
      {path: '', redirectTo: '/calculator', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    HttpClientModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
