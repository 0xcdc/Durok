/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import NewGame from './NewGame';
import Layout from '../../components/Layout';

async function action({ fetch }) {
/*  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  let { data } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
  */
  const data = [
    { name: "Charlie" },
    { name: "Anna" },
    { name: "Todd" },
    { name: "Santtu" },
    { name: "David" },
    { name: "Seda" },
  ];

  return {
    title: 'Durok',
    chunks: ['newgame'],
    component: (
      <Layout>
        <NewGame players={data} />
      </Layout>
    ),
  };
}

export default action;
