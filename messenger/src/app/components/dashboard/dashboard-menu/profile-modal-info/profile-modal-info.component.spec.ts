import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalInfoComponent } from './profile-modal-info.component';

describe('ProfileModalInfoComponent', () => {
  let component: ProfileModalInfoComponent;
  let fixture: ComponentFixture<ProfileModalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
