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
import s from './Games.css';
import { Button, Table } from 'react-bootstrap';

class Games extends React.Component {
  static propTypes = {
  };

  render() {
    return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Durok</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2018-12-24</td>
          <td><Button>pick the durok</Button></td>
          <td><Button>cancel game</Button></td>
        </tr>
        <tr>
          <td>2018-12-23</td>
          <td><Button>pick the durok</Button></td>
          <td><Button>cancel game</Button></td>
        </tr>
      </tbody>
    </Table>
    );
  }
}

export default withStyles(s)(Games);
