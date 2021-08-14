/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage';
import ExcelToTable from '../ExcelToTable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - ExcelToTable" defaultTitle="ExcelToTable">
        <meta name="description" content="" />
      </Helmet>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ExcelToTable} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </AppWrapper>
  );
}
