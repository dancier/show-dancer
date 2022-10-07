import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileImageComponent } from './edit-profile-image.component';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditProfileImageComponent', () => {
  let component: EditProfileImageComponent;
  let fixture: ComponentFixture<EditProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileImageComponent],
      imports: [HttpClientTestingModule, MatIconModule, ImageCropperModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
