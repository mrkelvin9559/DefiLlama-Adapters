const { getLogs } = require('../helper/cache/getLogs')
const ADDRESSES = require('../helper/coreAssets.json')
const { stakings } = require("../helper/staking");
const abi = require("./abi.json");
const { sumTokens2, } = require('../helper/unwrapLPs');

const ichiLegacy = "0x903bEF1736CDdf2A537176cf3C64579C3867A881";
const ichi = "0x111111517e4929D3dcbdfa7CCe55d30d4B6BC4d6";
const xIchi = "0x70605a6457B0A8fBf1EEE896911895296eAB467E";
const farmContract = "0x275dFE03bc036257Cd0a713EE819Dbd4529739c8";
const ichiLending = "0xaFf95ac1b0A78Bd8E4f1a2933E373c66CC89C0Ce";

const poolWithTokens = [
  // BANCOR
  ["0x4a2F0Ca5E03B2cF81AebD936328CF2085037b63B", ["0x903bEF1736CDdf2A537176cf3C64579C3867A881", "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C"]],
  // ONE INCH
  ["0x1dcE26F543E591c27717e25294AEbbF59AD9f3a5", ["0x903bEF1736CDdf2A537176cf3C64579C3867A881", "0x111111111117dC0aa78b770fA6A738034120C302"]],
  // BALANCER
  ["0x58378f5F8Ca85144ebD8e1E5e2ad95B02D29d2BB", ["0x903bEF1736CDdf2A537176cf3C64579C3867A881", ADDRESSES.ethereum.WETH]]
]

module.exports = {
  methodology: "Tokens deposited to mint oneTokens excluding oneTokens , Vault deposits",
  misrepresentedTokens: true,
  doublecounted: true,
} // node test.js projects/ichifarm/index.js

const defaultEvent = 'event ICHIVaultCreated (address indexed sender, address ichiVault, address tokenA, bool allowTokenA, address tokenB, bool allowTokenB, uint24 fee, uint256 count)'
const defaultTopic = '0xde147f43b6837f282eee187234c866cf001806167325f3ea883e36bed0c16a20'
const algebraEvent = 'event ICHIVaultCreated (address indexed sender, address ichiVault, address tokenA, bool allowTokenA, address tokenB, bool allowTokenB, uint256 count)'
const algebraTopic = '0xc40564e4b61a849e6f9fd666c2109aa6ceffc5a019f87d4d3e0eaaf807b0783e'

const config = {
  ethereum: {
    vaultConfigs: [
      { factory: '0x5a40DFaF8C1115196A1CDF529F97122030F26112', fromBlock: 13671610, isAlgebra: false, },
      { factory: '0x8Dd50926e12BD71904bCCc6D86DFA55D42715094', fromBlock: 18754139, isAlgebra: false, }, //PancakeSwap
      { factory: '0xEAeC81F0eD4F622D4b389672d9859166C0832b3E', fromBlock: 18870610, isAlgebra: false, }, //Blueprint
    ],
    oneFactory: '0xD0092632B9Ac5A7856664eeC1abb6E3403a6A36a',
  },
  arbitrum: {
    vaultConfigs: [
      { factory: '0xfBf38920cCbCFF7268Ad714ae5F9Fad6dF607065', fromBlock: 102858581, isAlgebra: false, },
      { factory: '0x0aC9e4a0423eec93357e2B0F83ef8c6469FD47F7', fromBlock: 254452080, isAlgebra: false, }, // Pancakeswap
      { factory: '0xedAc86bc526557c422AB1F6BF848bF0da9fB44A6', fromBlock: 140300509, isAlgebra: false, }, // Ramses
      { factory: '0x1Cc05B01f2e52ae3bb29F7A0059Fe112C60aA3f4', fromBlock: 147199960, isAlgebra: false, }, // Horiza
    ],
  },
  base: {
    vaultConfigs: [
      { factory: '0xfBf38920cCbCFF7268Ad714ae5F9Fad6dF607065', fromBlock: 10607512, isAlgebra: false, }, // Equalizer
      { factory: '0x51a0D74e1791399cE02aafD9a21dc4637Fe57959', fromBlock: 24832870, isAlgebra: true, }, // Henjin
      { factory: '0x2b52c416F723F16e883E53f3f16435B51300280a', fromBlock: 24832870, isAlgebra: true, }, // Hydrex
      { factory: '0x28cF3b462a1ADdE87fe7144d110BcF0D464C97b7', fromBlock: 22972345, isAlgebra: true, }, // Kim
      { factory: '0x24430E837efB64EF87bb32be03437fc6005EEF74', fromBlock: 22095330, isAlgebra: false, }, // PancakeSwap
      { factory: '0xbA096706A850caF1cADAEfE7529Db1343a0c187E', fromBlock: 25174764, isAlgebra: true, }, // Trebleswap 
      { factory: '0xaBe5B5AC472Ead17B4B4CaC7fAF42430748ab3b3', fromBlock: 12978552, isAlgebra: false, }, // Uniswap 
    ]
  },
  blast: {
    vaultConfigs: [
      { factory: '0xb42D5956cDe4386B65C087CfCD16910aB6114F15', fromBlock: 2247439, isAlgebra: true, }, // Fenix
      { factory: '0x9FAb4bdD4E05f5C023CCC85D2071b49791D7418F', fromBlock: 1630201, isAlgebra: false, }, // Uni v3
    ],
  },
  bsc: {
    vaultConfigs: [
      { factory: '0x131c03ca881B7cC66d7a5120A9273ebf675C241D', fromBlock: 29702590, isAlgebra: false, },
      { factory: '0xAc93148e93d1C49D89b1166BFd74942E80F5D501', fromBlock: 32489803, isAlgebra: true, }, // Thena
      { factory: '0x076e46A317DfAE50eEF30dca94Ff41A63118948D', fromBlock: 48359303, isAlgebra: true, }, // Thena V3
      { factory: '0x065356d9f628cDd1bb9F2384E2972CdAC50f51b7', fromBlock: 34595133, isAlgebra: false, }, // Uni v3
    ],
  },
  celo: {
    vaultConfigs: [
      { factory: '0x9FAb4bdD4E05f5C023CCC85D2071b49791D7418F', fromBlock: 24256269, isAlgebra: false, }, // Uniswap v3
      { factory: '0x8D05f6870106707BaeCFCf5C0570DB7a583eb92A', fromBlock: 27821113, isAlgebra: false, }, // Ubeswap 
    ]
  },
  eon: {
    vaultConfigs: [
      { factory: '0x242cd12579467983dc521D8aC46EB13936ab65De', fromBlock: 638510, isAlgebra: false, }, // Ascent
    ]
  },
  era: {
    vaultConfigs: [
      { factory: '0x8a76c26E0089111989C14EF56b9733aa38B94148', fromBlock: 20999423, isAlgebra: false, }, // zkSync Era
    ]
  },
  /* europa: {
    vaultConfigs: [
      { factory: '0x1B0ef045830466171D617dD0F1142aD699A4Cd63', fromBlock: 5607229, isAlgebra: false, }, // Sushi
    ]
  }, */
  evmos: {
    vaultConfigs: [
      { factory: '0x7c6389714719c68caac8ae06bae6e878b3605f6d', fromBlock: 19029984, isAlgebra: false, }, // Forge
    ]
  },
  fantom: {
    vaultConfigs: [
      { factory: '0x932E1908461De58b0891E5022431dc995Cb95C5E', fromBlock: 74304207, isAlgebra: false, }, // Equalizer
      { factory: '0x89FFdaa18b296d9F0CF02fBD88e5c633FEFA5f34', fromBlock: 79156621, isAlgebra: true, }, // Spiritswap 
    ]
  },
  flare: {
    vaultConfigs: [
      { factory: '0x85a4dd4ed356A7976a8302b1b690202d58583c55', fromBlock: 30879155, isAlgebra: false, }, // SparkDex
    ]
  },
  fuse: {
    vaultConfigs: [
      { factory: '0xfBf38920cCbCFF7268Ad714ae5F9Fad6dF607065', fromBlock: 30026180, isAlgebra: false, }, // Voltage
    ]
  },
  hedera: {
    vaultConfigs: [
      { factory: '0xb62399d23d1c81f08ea445a42d7f15cc12090a71', fromBlock: 59010832, isAlgebra: false, }, // Saucerswap
    ]
  }, 
  kava: {
    vaultConfigs: [
      { factory: '0x2d2c72C4dC71AA32D64e5142e336741131A73fc0', fromBlock: 8864638, isAlgebra: false, }, // Kinetix 
    ]
  },
  linea: {
    vaultConfigs: [
      { factory: '0xb0e7871d53BE1b1d746bBfD9511e2eF3cD70a6E7', fromBlock: 4722347, isAlgebra: false, }, // Linehub
      { factory: '0x0248b992ac2a75294b05286E9DD3A2bD3C9CFE4B', fromBlock: 1599561, isAlgebra: true, }, // Lynex
      { factory: '0x2592686212C164C1851dF2f62c5d5EC50600195E', fromBlock: 4148753, isAlgebra: false, }, // Metavault 
      { factory: '0xa29F3D5403D50Ea1BF597E2Ef01791A1Ce4F544E', fromBlock: 5033991, isAlgebra: false, }, // Nile
      { factory: '0x6E3eB904966B0158833852cAFD1200c171772b53', fromBlock: 3976012, isAlgebra: false, }, // Uniswap 
    ]
  },
  mantle: {
    vaultConfigs: [
      { factory: '0xbBB97d634460DACCA0d41E249510Bb741ef46ad3', fromBlock: 39366721, isAlgebra: false, }, // Cleo
      { factory: '0x797ebB6A84367B0409094FEA0D10aC7516432433', fromBlock: 65385973, isAlgebra: false, }, // Crust
    ]
  },
  mode: {
    vaultConfigs: [
      { factory: '0x9FAb4bdD4E05f5C023CCC85D2071b49791D7418F', fromBlock: 12395812, isAlgebra: true, }, // Kim
    ]
  },
  op_bnb: {
    vaultConfigs: [
      { factory: '0xADDA3A15EA71c223a82Af86d4578EF2B076035F1', fromBlock: 13911597, isAlgebra: true, }, // Thena
    ]
  },
  polygon: {
    vaultConfigs: [
      { factory: '0x2d2c72c4dc71aa32d64e5142e336741131a73fc0', fromBlock: 25697834, isAlgebra: false, },
      { factory: '0xb2f44D8545315cDd0bAaB4AC7233218b932a5dA7', fromBlock: 44370370, isAlgebra: false, }, // v2-retro
      { factory: '0x11700544C577Cb543a498B27B4F0f7018BDb6E8a', fromBlock: 49227783, isAlgebra: true, }, // QuickSwap
    ],
    oneFactory: '0x101eB16BdbA37979a771c86e1CAAfbaDbABfc879',
  },
  polygon_zkevm: {
    vaultConfigs: [
      { factory: '0xe8532Db60408f2d47693dA5b9093D71580B8C23F', fromBlock: 10890417, isAlgebra: false, }, // PancakeSwap
      { factory: '0x1721cB3ff3cAF70a79bDE9d771B27646ed8115b1', fromBlock: 11102475, isAlgebra: true, }, // QuickSwap
    ]
  },
  nibiru: {
    vaultConfigs: [
      { factory: '0x63703A4DdFA51B6CffC1Bb40cc73912dF62535FA', fromBlock: 24151937, isAlgebra: false, }, // Uniswap
    ]
  },
  real: {
    vaultConfigs: [
      { factory: '0x860F3881aCBbF05D48a324C5b8ca9004D31A146C', fromBlock: 599247, isAlgebra: false, }, // Pearl
    ]
  },
  rsk: {
    vaultConfigs: [
      { factory: '0x8cCd02E769e6A668a447Bd15e134C31bEccd8182', fromBlock: 6753128, isAlgebra: false, }, // Uniswap
    ]
  },
  scroll: {
    vaultConfigs: [
      { factory: '0xb42D5956cDe4386B65C087CfCD16910aB6114F15', fromBlock: 5264782, isAlgebra: false, }, // Metavault
      { factory: '0x9FAb4bdD4E05f5C023CCC85D2071b49791D7418F', fromBlock: 4728729, isAlgebra: false, }, // Uniswap
    ]
  },
  sonic: {
    vaultConfigs: [
      { factory: '0x7D18F2D60E4fd6F485419727515807d09A542eb9', fromBlock: 1971740, isAlgebra: false, }, // Equalizer
      { factory: '0x34513e8A327987Bb44acF5A925a7f3b4092d8b5F', fromBlock: 1476044, isAlgebra: true, }, // SwapX
    ]
  },
  taiko: {
    vaultConfigs: [
      { factory: '0x9FAb4bdD4E05f5C023CCC85D2071b49791D7418F', fromBlock: 11578, isAlgebra: true, }, // Henjin
    ]
  },
  zircuit: {
    vaultConfigs: [
      { factory: '0x1A58D4CFF22C7E2e0c4cCf4a0010b87822d024A1', fromBlock: 5104000, isAlgebra: true, }, // Ocelex
    ]
  },
  hemi: {
    vaultConfigs: [
      { factory: '0x8cCd02E769e6A668a447Bd15e134C31bEccd8182', fromBlock: 1684964, isAlgebra: false, }, // OKU
    ],
  },
}

Object.keys(config).forEach(chain => {
  const { vaultConfigs = [], oneFactory } = config[chain]
  module.exports[chain] = {
    tvl: async (api) => {
      const blacklistedTokens = []
      if (oneFactory) {
        const oneTokens = await api.fetchList({ lengthAbi: abi.oneTokenCount, itemAbi: abi.oneTokenAtIndex, target: oneFactory })
        const oneTokenOwners = await api.multiCall({ abi: abi.owner, calls: oneTokens })
        const foreignTokens = await api.fetchList({ lengthAbi: abi.foreignTokenCount, itemAbi: abi.foreignTokenAtIndex, target: oneFactory })
        const modulesList = await api.fetchList({ lengthAbi: abi.moduleCount, itemAbi: abi.moduleAtIndex, target: oneFactory })
        const moduleDetails = await api.multiCall({ abi: abi.modules, calls: modulesList, target: oneFactory })

        const strategiesList = []
        moduleDetails.forEach((data, i) => {
          if (data.moduleType == 2) { //modeuleType 2 are strategies
            strategiesList.push(modulesList[i])
          }
        })
        if (api.chain === 'polygon') {
          foreignTokens.push(ichi)
        }

        blacklistedTokens.push(...oneTokens.map(i => i.toLowerCase()))
        await sumTokens2({ api, tokens: foreignTokens, owners: [oneTokens, strategiesList].flat(), blacklistedTokens })
        const uniV3NFTHolders = [...strategiesList, ...oneTokenOwners]

        await sumTokens2({ api, owners: uniV3NFTHolders, resolveUniV3: true, blacklistedTokens, })
      }

      for (const {
        factory,
        fromBlock,
        isAlgebra,
      } of vaultConfigs) {
        const topic = isAlgebra ? algebraTopic : defaultTopic
        const eventAbi = isAlgebra ? algebraEvent : defaultEvent
        const logs = await getLogs({
          api,
          target: factory,
          topics: [topic],
          eventAbi: eventAbi,
          onlyArgs: true,
          fromBlock,
        })
        const vaultBalances = await api.multiCall({ abi: abi.getTotalAmounts, calls: logs.map(l => l.ichiVault), permitFailure: true })
        vaultBalances.forEach((b, i) => {
          if (!b) return
          const { tokenA, tokenB } = logs[i]
          if (!blacklistedTokens.includes(tokenA.toLowerCase())) api.add(tokenA, b.total0)
          if (!blacklistedTokens.includes(tokenB.toLowerCase())) api.add(tokenB, b.total1)
        })
      }

      return api.getBalances()
    }
  }
})

module.exports.ethereum.pool2 = async (_, block) => {
  const toa = [
    ['0x9cd028b1287803250b1e226f0180eb725428d069', farmContract],
    ['0xd07d430db20d2d7e0c4c11759256adbcc355b20c', farmContract],
  ]
  poolWithTokens.forEach(([o, tokens]) => tokens.forEach(t => toa.push([t, o])))
  return sumTokens2({ tokensAndOwners: toa, block, })
}

module.exports.ethereum.staking = stakings([xIchi, ichiLending], ichiLegacy)
