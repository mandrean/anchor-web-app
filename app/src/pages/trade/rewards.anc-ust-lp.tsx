import { anc80gif, GifIcon, TokenIcon } from '@anchor-protocol/token-icons';
import { RulerTab } from '@libs/neumorphism-ui/components/RulerTab';
import { Section } from '@libs/neumorphism-ui/components/Section';
import { CenteredLayout } from 'components/layouts/CenteredLayout';
import { Circles } from 'components/primitives/Circles';
import { screen } from 'env';
import { AncUstLpStakeOverview } from 'pages/trade/components/AncUstLpStakeOverview';
import { AncUstLpUnstake } from 'pages/trade/components/AncUstLpUnstake';
import { AncUstLpWithdraw } from 'pages/trade/components/AncUstLpWithdraw';
import { ancUstLpPathname } from 'pages/trade/env';
import React, { ReactNode, useCallback, useMemo } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';

export interface RewardsAncUstLpProps {
  className?: string;
}

interface Item {
  label: string;
  value: string;
  tooltip?: ReactNode;
}

const poolItems: Item[] = [
  {
    label: 'Withdraw',
    value: 'withdraw',
    tooltip: 'Withdraw ANC liquidity provided by burning LP tokens',
  },
  {
    label: 'Unstake',
    value: 'unstake',
    tooltip: 'Unstake LP tokens to withdraw provided liquidity',
  },
];

function RewardsAncUstLpBase({ className }: RewardsAncUstLpProps) {
  const history = useHistory();

  const pageMatch = useRouteMatch<{ view: string }>(
    `/${ancUstLpPathname}/:view`,
  );

  const subTab = useMemo<Item>(() => {
    switch (pageMatch?.params.view) {
      case 'unstake':
        return poolItems[1];
      default:
        return poolItems[0];
    }
  }, [pageMatch?.params.view]);

  const subTabChange = useCallback(
    (nextTab: Item) => {
      history.push({
        pathname: `/${ancUstLpPathname}/${nextTab.value}`,
      });
    },
    [history],
  );

  return (
    <CenteredLayout className={className}>
      <header>
        <h1>
          <Circles radius={24} backgroundColors={['#ffffff', '#2C2C2C']}>
            <TokenIcon token="ust" style={{ fontSize: '1.1em' }} />
            <GifIcon
              src={anc80gif}
              style={{ fontSize: '2em', borderRadius: '50%' }}
            />
          </Circles>
          ANC-UST LP
        </h1>
      </header>

      <Section>
        <RulerTab
          className="subtab"
          items={poolItems}
          selectedItem={subTab}
          onChange={subTabChange}
          labelFunction={({ label }) => label}
          keyFunction={({ value }) => value}
          tooltipFunction={({ tooltip }) => tooltip}
        />

        <div className="form">
          {subTab.value === 'unstake' && <AncUstLpStakeOverview />}

          <Switch>
            <Route
              path={`/${ancUstLpPathname}/withdraw`}
              component={AncUstLpWithdraw}
            />
            <Route
              path={`/${ancUstLpPathname}/unstake`}
              component={AncUstLpUnstake}
            />
            <Redirect
              exact
              path={`/${ancUstLpPathname}`}
              to={`/${ancUstLpPathname}/withdraw`}
            />
            <Redirect
              path={`/${ancUstLpPathname}/*`}
              to={`/${ancUstLpPathname}/withdraw`}
            />
          </Switch>
        </div>
      </Section>
    </CenteredLayout>
  );
}

export const RewardsAncUstLp = styled(RewardsAncUstLpBase)`
  header {
    display: grid;
    grid-template-columns: 1fr 375px;
    align-items: center;

    margin-bottom: 40px;

    h1 {
      font-size: 44px;
      font-weight: 900;
      display: flex;
      align-items: center;

      word-break: keep-all;
      white-space: nowrap;

      > :first-child {
        margin-right: 14px;
      }
    }
  }

  .subtab {
    margin-bottom: 40px;
  }

  .form {
    .description {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 16px;
      color: ${({ theme }) => theme.dimTextColor};

      > :last-child {
        font-size: 12px;
      }

      margin-bottom: 12px;
    }

    .amount {
      width: 100%;

      margin-bottom: 5px;
    }

    .wallet {
      display: flex;
      justify-content: space-between;

      font-size: 12px;
      color: ${({ theme }) => theme.dimTextColor};

      &[aria-invalid='true'] {
        color: ${({ theme }) => theme.colors.negative};
      }
    }

    .separator {
      margin: 10px 0 0 0;
    }

    .receipt {
      margin-top: 30px;
    }

    .submit {
      margin-top: 40px;

      width: 100%;
      height: 60px;
    }
  }

  // under tablet
  @media (max-width: ${screen.tablet.max}px) {
    header {
      h1 {
        font-size: 32px;
      }

      margin-bottom: 20px;

      grid-template-columns: 1fr;
      grid-gap: 20px;
    }

    .subtab {
      margin-bottom: 20px;
    }
  }
`;
