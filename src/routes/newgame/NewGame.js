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
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);

    this.state = {
      players:
        this.props.players.map( p => {
          let o = new Object();
          Object.assign(o, p);
          o.selected = 0;
          o.histogram = this.buildLetterHistogram(p.name);
          return o;
        }),
      filter: "",
    };
  }

  buildLetterHistogram(value) {
    let arr = new Array(27);
    arr.fill(0);
    value = value.toLowerCase();
    let littleA = "a".charCodeAt(0);
    for(var i = 0; i < value.length; i++) {
      let v = value.charCodeAt(i) - littleA;
      if((v < 0) || v >=26) {
        v = 26;
      }
      arr[v]++;
    }

    return arr;
  }

  handleOnClick(name) {
    let players = this.state.players.map( p => {
      if(p.name == name) {
        p.selected = 1 - p.selected; //xor for ints
      }
      return p;
    });
    this.setState( {players} );
  }

  handleSearchBoxChange(e) {
    let filter = event.target.value;

    this.setState({filter});
  }

  getFilterScore(player, filterHist) {
    let missing = 0;
    let extra = 0;
    let matched = 0;

    //we want to do a merge join of chars and the filter string
    //and calculate count of extra and missing characters

    for(let i = 0; i < filterHist.length; i++) {
      let v = filterHist[i] - player.histogram[i];
      if(v > 0) {
        //there are more of the given letter in the search string
        //than there are in the players name
        //
        //this is bad because i've typed a character that cannot
        //be matched against the player's name
        //
        //ex. character that doesn't exist - x for charlie
        //or extra character - two a's for charlie
        extra += v;
        matched += player.histogram[i];
      } else {
        //there are extra characters in the name that don't exist
        //in the search string
        //
        //this is weak negative signal b/c the it indicates search string
        //is "less" of a match for the name vs. one with fewer extra
        //characters
        //
        //ex. bi is a closer match for bill than for billy
        missing += -v; //invert v to make missing a positive count
        matched += filterHist[i];
      }
    }

    return {
        matched,
        extra,
        missing,
    };
  }

  orderPlayers(p1, p2) {
    let cmp = 0;

    //selected come before not selected
    if(p2.selected ^ p1.selected) {
      cmp = (p2.selected - p1.selected);
      return cmp;
    }


    //only go into this section if they've both got filterScores
    if(p2.filterScore && p1.filterScore) {

      let a = p1.filterScore;
      let b = p2.filterScore;

      //exact match takes precedence
      cmp = (b.exactMatch - a.exactMatch);
      if(cmp != 0) return cmp;

      //matched characters are good
      cmp = (b.matched - a.matched);
      if(cmp != 0) return cmp;

      //extra characters are bad
      cmp = (b.extra - a.extra);
      if(cmp != 0) return -cmp;

      //missing charactes are bad
      cmp = (b.missing - a.missing);
      if(cmp != 0) return -cmp;
    }

    //finally, just sort by name
    cmp = p1.name.toLowerCase().localeCompare(p2.name.toLowerCase());
    return cmp;
  }

  getSortedPlayers() {
    let filter = this.state.filter;

    let players = this.state.players.map( p => {
      let o = new Object();
      Object.assign(o, p);
      return o;
    });


    if(filter.localeCompare("") != 0) {

      let filterHistogram = this.buildLetterHistogram(filter);

      players = players.map( p => {
        if(p.selected) return p;

        p.filterScore = this.getFilterScore(p, filterHistogram);

        p.filterScore.exactMatch =
          (p.name.toLowerCase().startsWith(filter.toLowerCase()) ?
            filter.length :
            0
          );

        return p;
      });
    }

    return players.sort(this.orderPlayers);
  }



  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <input
              className={s.searchBar}
              type="text"
              onChange={this.handleSearchBoxChange}
              autoFocus
              placeholder="Enter any part of the players name to filter"/>
          <ListGroup>
            { this.getSortedPlayers().map( p => {
              return (
                <ListGroupItem
                  key={p.name}
                  active={p.selected == 1}
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
