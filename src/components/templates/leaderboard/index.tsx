import {View} from 'react-native';
import {styles} from './styles';
import {_users} from '@/constants';
import {Profile} from '@/components/composite';
import {useSharedValue} from 'react-native-reanimated';
import {useCallback} from 'react';

export function Leaderboard() {
  const _anim = useSharedValue(0);

  const onAnimationFinished = useCallback(
    (index: number) => {
      if (index === _users.length - 1) {
        _anim.value = 1;
      }
    },
    [_anim],
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {_users.map((user, index) => (
          <Profile
            key={index}
            user={user}
            index={index}
            anim={_anim}
            onAnimationFinished={() => onAnimationFinished(index)}
          />
        ))}
      </View>
    </View>
  );
}
