import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContestPageComponent } from './create-contest-page.component';

describe('CreateContestPageComponent', () => {
  let component: CreateContestPageComponent;
  let fixture: ComponentFixture<CreateContestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateContestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
