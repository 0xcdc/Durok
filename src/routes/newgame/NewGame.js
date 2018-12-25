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
    news: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      players: {
        'Anna': false,
        'Charlie': false,
      },
    };
  }

  handleOnClick(name) {
    let players = this.state.players
    players[name] = !players[name];
    this.setState( {players} );
  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          Players
          <ListGroup>
            { Object.entries(this.state.players).map( e => {
              let [name, active] = e;
              return (
                <ListGroupItem key={name} active={active} onClick={ (e) => {
                  this.handleOnClick(name);} }>{name}</ListGroupItem>
              );})
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NewGame);
