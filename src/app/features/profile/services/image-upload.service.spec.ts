import { TestBed } from '@angular/core/testing';

import { ImageUploadService } from './image-upload.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImageUploadService', () => {
  let service: ImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
