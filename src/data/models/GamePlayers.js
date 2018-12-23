/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import Player from './Player.js';
import Game from './Game.js';

const GamePlayers = Model.define('GamePlayers', {
  isDurok: {
    type: DataType.BOOLEAN,
  },
});

Player.belongsToMany(Game, { through: GamePlayers});
Game.belongsToMany(Player, { through: GamePlayers});

export default GamePlayers;
