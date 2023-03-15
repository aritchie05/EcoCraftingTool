import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeModalComponent } from './recipe-modal.component';

describe('RecipeModalComponent', () => {
  let component: RecipeModalComponent;
  let fixture: ComponentFixture<RecipeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
