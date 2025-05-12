import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// ERC721TokenFactory 모듈 정의
const ERC721TokenFactoryModule = buildModule("ERC721TokenFactoryModule", (m) => {
  // 'ERC721TokenFactory' 스마트 계약 배포 (매개변수 없이)
  const ERC721TokenFactory = m.contract("ERC721TokenFactory");

  // 팩토리 계약만 배포하고 반환
  return { ERC721TokenFactory };
});

export default ERC721TokenFactoryModule;
