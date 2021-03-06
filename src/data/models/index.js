/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Game from './Game';
import Player from './Player';
import GamePlayers from './GamePlayers';

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { Game, GamePlayers, Player }
