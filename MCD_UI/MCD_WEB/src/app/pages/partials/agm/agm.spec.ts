import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AGM } from './agm';

describe('AGM', () => {
  let component: AGM;
  let fixture: ComponentFixture<AGM>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AGM],
    }).compileComponents();

    fixture = TestBed.createComponent(AGM);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
