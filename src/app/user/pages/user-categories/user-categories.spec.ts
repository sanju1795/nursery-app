import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoriesComponent } from './user-categories';

describe('UserCategoriesComponent', () => {
  let component: UserCategoriesComponent;
  let fixture: ComponentFixture<UserCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCategoriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
