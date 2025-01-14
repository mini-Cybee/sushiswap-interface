import { ChainId, Currency, Percent } from '@sushiswap/sdk'
import React, { FC, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

import Gas from '../../components/Gas'
import Settings from '../../components/Settings'
import { useActiveWeb3React } from '../../hooks'
import Web3Network from '../../components/Web3Network'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'

const getQuery = (input, output) => {
  if (!input && !output) return

  if (input && !output) {
    return { inputCurrency: input.address || 'ETH' }
  } else if (input && output) {
    return { inputCurrency: input.address, outputCurrency: output.address }
  }
}

interface ExchangeHeaderProps {
  input?: Currency
  output?: Currency
  allowedSlippage?: Percent
}

const ExchangeHeader: FC<ExchangeHeaderProps> = ({ input, output, allowedSlippage }) => {
  const { i18n } = useLingui()
  const { chainId, library } = useActiveWeb3React()
  const router = useRouter()
  const [animateWallet, setAnimateWallet] = useState(false)
  const isRemove = router.asPath.startsWith('/remove')
  const isLimitOrder = router.asPath.startsWith('/limit-order')

  return (
    <div className="flex items-center justify-between p-2 space-x-2">
      <div className="flex items-center space-x-2">
        <h1 className="flex items-center font-bold text-white h-[46px] text-xl">Sushiswap</h1>
        <div className="relative flex items-center w-full h-full rounded hover:bg-dark-800">
          <Settings placeholderSlippage={allowedSlippage} />
        </div>
        {library && library.provider.isMetaMask && (
          <div className="hidden sm:inline-block">
            <Web3Network />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <div className="grid grid-flow-col gap-1">
          {chainId === ChainId.MAINNET && (
            <div className="flex items-center w-full h-full px-3 space-x-1 rounded cursor-pointer text-green text-opacity-80 hover:text-opacity-100 hover:bg-dark-800">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.5215 0.618164L12.6818 1.57302L15.933 4.37393V13.2435C15.9114 13.6891 15.5239 14.0498 15.0502 14.0286C14.6196 14.0074 14.2751 13.6679 14.2536 13.2435V7.28093C14.2536 6.21998 13.3923 5.37122 12.3158 5.37122H11.8421V2.67641C11.8421 1.61546 10.9808 0.766697 9.90428 0.766697H1.93779C0.861242 0.766697 0 1.61546 0 2.67641V18.4421C0 18.9089 0.387559 19.2909 0.861242 19.2909H10.9808C11.4545 19.2909 11.8421 18.9089 11.8421 18.4421V6.64436H12.3158C12.6818 6.64436 12.9617 6.92021 12.9617 7.28093V13.2435C13.0048 14.4105 13.9737 15.3017 15.1579 15.2805C16.2775 15.2381 17.1818 14.3469 17.2248 13.2435V3.80102L13.5215 0.618164ZM9.66744 8.89358H2.17464V3.10079H9.66744V8.89358Z"
                  fill="#7CFF6B"
                />
              </svg>

              <div className="text-baseline">
                <Gas />
              </div>

            </div>
          )}
        </div>
        <div
          className="flex items-center justify-center w-6 h-6 text-white cursor-pointer hover:text-high-emphesis"
          onClick={() => window.parent.postMessage({ name: 'sushiswap', type: 'modal', data: { open: false } }, '*')}
        >
          <XIcon width={24} height={24} />
        </div>
      </div>
    </div>
  )
}

export default ExchangeHeader
