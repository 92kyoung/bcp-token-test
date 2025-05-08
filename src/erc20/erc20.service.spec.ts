import { Test, TestingModule } from '@nestjs/testing';
import { ERC20Service } from './erc20.service';

describe('ERC20Service', () => {
  let service: ERC20Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ERC20Service],
    }).compile();

    service = module.get<ERC20Service>(ERC20Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
