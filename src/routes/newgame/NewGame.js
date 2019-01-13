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
import s from './NewGame.css';
import { Button, Col, Grid, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';
import Players from '../../components/Players';
import Link from '../../components/Link';

class NewGame extends React.Component {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      players:
        this.props.players.map( p => {
          p.selected = false;
          return p;
        }),
      filter: "",
    };
 }

  handleOnClick(name) {
    let players = this.state.players.map( p => {
      if(p.name == name) {
        p.selected ^= true;
      }
      return p;
    });
    this.setState( {players} );
  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <input
              ref="clientFilterText"
              className={s.searchBar}
              type="text"
              onChange={this.handleSeachBoxChange}
              autoFocus
              onKeyDown={this.handleOnKeyDown}
              placeholder="Enter any part of the players name to filter"/>
          <ListGroup>
            { this.state.players.map( p => {
              return (
                <ListGroupItem
                  key={p.name}
                  active={p.selected}
                  onClick={(e) => {this.handleOnClick(p.name)}}>
                  {p.name}
                </ListGroupItem>
              );})
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NewGame);
