import { Test, TestingModule } from '@nestjs/testing';
import { ERC20Controller } from './erc20.controller';

describe('ERC20Controller', () => {
  let controller: ERC20Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ERC20Controller],
    }).compile();

    controller = module.get<ERC20Controller>(ERC20Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
