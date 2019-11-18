import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoriesPageComponent } from './manage-categories-page.component';

describe('ManageCategoriesPageComponent', () => {
  let component: ManageCategoriesPageComponent;
  let fixture: ComponentFixture<ManageCategoriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCategoriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
