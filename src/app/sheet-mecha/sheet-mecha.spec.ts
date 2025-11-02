import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetMecha } from './sheet-mecha';

describe('SheetMecha', () => {
  let component: SheetMecha;
  let fixture: ComponentFixture<SheetMecha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetMecha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetMecha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
