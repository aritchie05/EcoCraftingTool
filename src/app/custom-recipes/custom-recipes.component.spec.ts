import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRecipesComponent } from './custom-recipes.component';

describe('CustomRecipesComponent', () => {
  let component: CustomRecipesComponent;
  let fixture: ComponentFixture<CustomRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRecipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
