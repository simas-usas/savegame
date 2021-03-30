import React from 'react';
import { connect } from 'react-redux';
import { orderBy, map, filter, includes } from 'lodash';

import GameList from 'containers/GameList/GameList';

import data from '../../data';

const getRatedGames = ratings =>
  orderBy(
    filter(data, game =>
      includes(
        map(ratings, rating => rating.id),
        game.id,
      ),
    ),
    ['year'],
    ['desc'],
  );

const UserProfile = ({ ratings, navigation }) => (
  <GameList gameData={map(getRatedGames(ratings), ({ id }) => id)} navigation={navigation} showRating />
);

const mapStateToProps = ({ user: { ratings } }) => ({
  ratings,
});

export default connect(mapStateToProps)(UserProfile);
