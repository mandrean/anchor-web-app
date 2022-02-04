import { bAssetInfoByTokenSymbolQuery } from '@anchor-protocol/app-fns';
import {
  EMPTY_QUERY_RESULT,
  useCW20TokenDisplayInfosQuery,
} from '@libs/app-provider';
import { createQueryFn } from '@libs/react-query-utils';
import { useWallet } from '@terra-money/use-wallet';
import { useMemo } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';
import { BAssetInfoWithDisplay } from './bAssetInfoList';
import { addTokenDisplay } from './utils/symbols';

const queryFn = createQueryFn(bAssetInfoByTokenSymbolQuery);

export function useBAssetInfoByTokenSymbolQuery(
  tokenSymbol: string | undefined,
): UseQueryResult<BAssetInfoWithDisplay | undefined> {
  const { network } = useWallet();
  const tokenDisplayInfos = useCW20TokenDisplayInfosQuery();
  const { queryClient, queryErrorReporter, contractAddress } =
    useAnchorWebapp();

  const bAssetInfo = useQuery(
    [
      ANCHOR_QUERY_KEY.ANCHOR_QUERY_BASSET_INFO_BY_TOKEN_SYMBOL,
      contractAddress.moneyMarket.overseer,
      tokenSymbol,
      queryClient,
    ],
    queryFn,
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return useMemo(() => {
    if (!bAssetInfo.data || !tokenDisplayInfos.data) {
      return EMPTY_QUERY_RESULT;
    }

    return {
      ...bAssetInfo,
      data: addTokenDisplay(
        bAssetInfo.data,
        tokenDisplayInfos.data[network.name],
      ),
    } as UseQueryResult<BAssetInfoWithDisplay | undefined>;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bAssetInfo.data, tokenDisplayInfos.data, network.name]);
}
