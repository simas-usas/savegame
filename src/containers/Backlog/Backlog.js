import React from 'react';
import { connect } from 'react-redux';

import GameList from 'containers/GameList/GameList';

const Backlog = ({ backlog, navigation }) => <GameList gameData={backlog} navigation={navigation} />;

const mapStateToProps = ({ user: { backlog } }) => ({
  backlog,
});

export default connect(mapStateToProps)(Backlog);
