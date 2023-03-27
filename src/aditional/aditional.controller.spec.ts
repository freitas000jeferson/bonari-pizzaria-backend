import { Test, TestingModule } from '@nestjs/testing';
import { AditionalController } from './aditional.controller';
import { AditionalService } from './aditional.service';

describe('AditionalController', () => {
  let controller: AditionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AditionalController],
      providers: [AditionalService],
    }).compile();

    controller = module.get<AditionalController>(AditionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
