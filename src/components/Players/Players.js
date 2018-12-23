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
import s from './Players.css';
import { Table } from 'react-bootstrap';

class Players extends React.Component {
  static propTypes = {
  };

  render() {
    return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Anna</td>
          <td>&infin;</td>
        </tr>
        <tr>
          <td>Charlie</td>
          <td>-1</td>
        </tr>
      </tbody>
    </Table>
    );
  }
}

export default withStyles(s)(Players);
