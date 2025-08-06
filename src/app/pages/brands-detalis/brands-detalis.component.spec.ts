import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDetalisComponent } from './brands-detalis.component';

describe('BrandsDetalisComponent', () => {
  let component: BrandsDetalisComponent;
  let fixture: ComponentFixture<BrandsDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsDetalisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
