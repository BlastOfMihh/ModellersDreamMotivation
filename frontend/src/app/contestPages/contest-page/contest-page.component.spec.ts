import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageComponent } from './contest-page.component';

// for testss

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

/// just for tests ... can be deleted later

describe('ContestPageComponent', () => {
  let component: ContestPageComponent;
  let fixture: ComponentFixture<ContestPageComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ContestPageComponent]
  //   })
  //   .compileComponents();
    
  //   fixture = TestBed.createComponent(ContestPageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // JUST FOR TEST
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ContestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   /// just for tests ... can be deleted later

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
