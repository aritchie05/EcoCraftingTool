import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CraftingParentComponent} from './crafting-parent.component';

describe('CraftingParentComponent', () => {
  let component: CraftingParentComponent;
  let fixture: ComponentFixture<CraftingParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CraftingParentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftingParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
