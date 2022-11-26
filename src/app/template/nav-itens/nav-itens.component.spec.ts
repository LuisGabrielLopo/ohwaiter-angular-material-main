import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItensComponent } from './nav-itens.component';

describe('NavItensComponent', () => {
  let component: NavItensComponent;
  let fixture: ComponentFixture<NavItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavItensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
