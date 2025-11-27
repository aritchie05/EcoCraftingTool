import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeDialogComponent} from './recipe-dialog.component';
import {provideDialogTestingDependencies} from '../../test-utils.spec';
import {recipes} from '../../../assets/data/recipes';

describe('RecipeDialogComponent', () => {
  let component: RecipeDialogComponent;
  let fixture: ComponentFixture<RecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDialogComponent],
      providers: provideDialogTestingDependencies({
        recipe: recipes.get('AcornPowder')
      })
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
