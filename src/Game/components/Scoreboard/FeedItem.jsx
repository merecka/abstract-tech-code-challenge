import React, { createRef, Component } from 'react';
import { Text, View } from '@abst/web-components';


/*
 * NOTE: props.score should be displayed via an internal value instead of using
 * the passed prop directly. Eventually, when the round is complete and the
 * score updates, we'll animate the value change, so we're handling the first
 * part of that process (storing the score as an internal, independent value)
 * now to minimize the technical debt we'll incur later on when we implement the
 * animation, which will rely on the internal value.
 *
 *
 * REFACTOR HINT: several hooks within `@abst/hooks` use this basic pattern
 * (store ref value -> assign changes to ref.current -> manually update)
 * internally, so the refactored function component should be relatively simple.
 */
export class FeedItem extends Component {
  constructor(props) {
    super(props);

    this.Score = createRef(this.getScore(props.core));
  }

  /* normalizes the score value */
  getScore = (score) => _.isFinite(score) ? _.round(score) : 0;

  componentDidUpdate(prevProps) {
    /* only update when score changes */
    if (!_.isEqual(this.props.score, prevProps.score)) {
      /* update ref value with normalized, updated score */
      /* TODO: (low-priority/future): call animation fn here */
      this.Score.current = this.getScore(this.props.score);
      /*
       * manually update the component, since changing the value of ref.current
       * won't automatically trigger a secondary render.
       */
      this.forceUpdate();
    }
  }

  render() {
    const {
      jerseyNumber,
      name,
      positionCode,
      teamName
    } = this.props;

    return (
      <View className='list-item' xs={ 12 }>
        <View className='data-wpr'>
          <View className='player-num-wpr'>
            <Text className='player-num' t={ jerseyNumber || '--' } />
          </View>
          <View className='data-ctr'>
            <View className='primary'>
              <Text className='player-name' t={ name || 'N/A' } />
            </View>
            <View className='secondary'>
              <Text className='position' t={ `${positionCode},` } />
              <Text className='team' t={ teamName } />
            </View>
          </View>
        </View>
        <View className='score-wpr'>
          <Text className='score' t={ this.Score.current } />
        </View>
      </View>
    );
  }
}
