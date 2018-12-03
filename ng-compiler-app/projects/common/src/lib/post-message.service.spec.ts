import { TestBed } from '@angular/core/testing';

import { PostMessageService } from './post-message.service';

describe('PostMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostMessageService = TestBed.get(PostMessageService);
    expect(service).toBeTruthy();
  });
});
