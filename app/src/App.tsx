import { useChainOptions } from '@terra-money/wallet-provider';
import { GlobalStyle } from 'components/GlobalStyle';
import { Header } from 'components/Header';
import { MessageBox } from 'components/MessageBox';
import { AppProviders } from 'configurations/app';
import { NotificationProvider } from 'contexts/notification';
import { JobsProvider } from 'jobs/Jobs';
import { TermsOfService } from 'pages/terms';
import { ancUstLpPathname } from 'pages/trade/env';
import { RewardsAncUstLp } from 'pages/trade/rewards.anc-ust-lp';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './configurations/chartjs';

export function App() {
  const chainOptions = useChainOptions();

  return (
    chainOptions && (
      <AppProviders {...chainOptions}>
        <NotificationProvider>
          <JobsProvider>
            <div>
              <GlobalStyle />
              <Header />
              <MessageBox level="info" style={{ margin: '20px 50px' }}>
                This is the version of the webapp to interact with Terraswap and
                the deprecated staking LP contract, Unstake LP tokens / Withdraw
                ANC UST liquidity and move them to Astroport to earn rewards.
              </MessageBox>
              <Switch>
                <Route
                  path={`/${ancUstLpPathname}`}
                  component={RewardsAncUstLp}
                />

                {/* TOS */}
                <Route path="/terms" component={TermsOfService} />

                <Redirect to={`/${ancUstLpPathname}`} />
              </Switch>
            </div>
          </JobsProvider>
        </NotificationProvider>
      </AppProviders>
    )
  );
}
