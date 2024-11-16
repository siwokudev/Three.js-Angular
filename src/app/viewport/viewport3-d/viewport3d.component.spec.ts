import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewport3DComponent } from './viewport3d.component';

describe('Viewport3DComponent', () => {
  let component: Viewport3DComponent;
  let fixture: ComponentFixture<Viewport3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewport3DComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewport3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
