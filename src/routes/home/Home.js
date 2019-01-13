/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import { Button, Panel } from 'react-bootstrap';
import Players from '../../components/Players';
import Games from '../../components/Games';
import Link from '../../components/Link';

class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link to='/newgame'><Button>Start new game</Button></Link>
          <br/>
          <br/>
          <Panel bsStyle="primary">
            <Panel.Heading><h4>Standings</h4></Panel.Heading>
            <Players />
          </Panel>
          <Panel bsStyle="primary">
            <Panel.Heading><h4>Current Games</h4></Panel.Heading>
            <Games />
          </Panel>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
