import { Test, TestingModule } from '@nestjs/testing';
import { AditionalService } from './aditional.service';

describe('AditionalService', () => {
  let service: AditionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AditionalService],
    }).compile();

    service = module.get<AditionalService>(AditionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
