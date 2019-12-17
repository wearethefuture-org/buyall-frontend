import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubcategoriesPageComponent } from './manage-subcategories-page.component';

describe('ManageSubcategoriesPageComponent', () => {
  let component: ManageSubcategoriesPageComponent;
  let fixture: ComponentFixture<ManageSubcategoriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSubcategoriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubcategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
