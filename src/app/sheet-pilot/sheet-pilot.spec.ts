import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetPilot } from './sheet-pilot';

describe('SheetPilot', () => {
  let component: SheetPilot;
  let fixture: ComponentFixture<SheetPilot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetPilot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetPilot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
