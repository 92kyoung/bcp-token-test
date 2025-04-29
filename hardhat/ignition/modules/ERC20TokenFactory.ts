import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// ERC20TokenFactory 모듈 정의
const ERC20TokenFactoryModule = buildModule("ERC20TokenFactoryModule", (m) => {
  // 'ERC20TokenFactory' 스마트 계약 배포 (매개변수 없이)
  const ERC20TokenFactory = m.contract("ERC20TokenFactory");

  // 팩토리 계약만 배포하고 반환
  return { ERC20TokenFactory };
});

export default ERC20TokenFactoryModule;
