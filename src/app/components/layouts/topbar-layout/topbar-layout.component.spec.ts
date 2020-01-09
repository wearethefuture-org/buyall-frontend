import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarLayoutComponent } from './topbar-layout.component';

describe('TopbarLayoutComponent', () => {
  let component: TopbarLayoutComponent;
  let fixture: ComponentFixture<TopbarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
