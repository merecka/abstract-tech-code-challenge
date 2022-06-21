import React, { useEffect } from 'react';
import { useStorage } from '@abst/storage';
import { fetchData } from '@src/lib';
import moment from 'moment';
import teamColors from '@src/../data/teamColors.json';

export function withData(Composed) {
  return function WithData(props) {
    const DataStore = useStorage('data');
    /*
     * ensure data once on load
     * (data are stored locally, so we don't have to worry about re-refetching)
     *
     * NOTE: state.loading is blacklisted during hydrate, so it resets to true
     *       on every app load.
     */
    useEffect(() => {
      if (DataStore.state.loading) {
        console.info('checking data');
        try {
          const {
            lastFetch,
            players: pPlayers,
            teams: pTeams,
            playerIds: pIds,
            playerCount: pCount
          } = DataStore.state;
          const isCurrent = (
            !!lastFetch && /* has previously fetched */
            !!pPlayers?.length && !!pTeams?.length && /* AND has data */
            !!pIds?.length && (pCount || 0) > 0 && /* AND has secondaries */
            /* AND last fetch was less than 24 hours ago */
            (moment().diff(lastFetch, 'hours') < 24)
          );
          if (!isCurrent) {
            console.info('fetching data');
            (async() => {
              const [players, teams] = await Promise.all([
                fetchData('players'),
                fetchData('teams')
              ]);
              const state = { players };
              state.teams = _.map(teams, (team) => ({
                ...team,
                colors: teamColors[team.tricode]
              }));
              state.playerCount = players.length;
              state.playerIds = _.compact(_.map(players, 'playerId'));
              state.lastFetch = new Date();
              await DataStore.setState(state);
            })();
          }
        } catch(e) {
          console.error(e);
          DataStore.setState({ error: e });
        } finally {
          DataStore.setState({ loading: false });
        }
      }
    }, [DataStore.state.loading]);

    return <Composed { ...props } />;
  };
}
