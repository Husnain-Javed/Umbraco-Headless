import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lenders } from './lenders';

describe('Lenders', () => {
  let component: Lenders;
  let fixture: ComponentFixture<Lenders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lenders],
    }).compileComponents();

    fixture = TestBed.createComponent(Lenders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
