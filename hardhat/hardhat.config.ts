import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";  // npx hhardhat-deploy 플러그인 추가

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localNet: {
      url: "http://localhost:8545",
      chainId: 1337,
      accounts: [
        "0x15f72a469978347c42d90804fee46d73ae5a6bcf3a8512e8bc6a48f129d96e57",
      ],
    },
    metanet: {
      url: "http://meta-net.hanati.co.kr:8545",
      chainId: 22742,
      accounts: [
        "0x15f72a469978347c42d90804fee46d73ae5a6bcf3a8512e8bc6a48f129d96e57",
      ],
    }
  },
};

export default config;
