import {useMemo} from 'react';
import {Image, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import Animated, {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {styles} from './styles';
import {_users, AVATAR_SIZE, STAGGER} from '@/constants';

interface ProfileProps {
  user: (typeof _users)[0];
  index: number;
  onAnimationFinished?: () => void;
  anim: SharedValue<number>;
}

export function Profile({
  user,
  index,
  onAnimationFinished,
  anim,
}: ProfileProps) {
  const _anim = useDerivedValue(() => {
    return withDelay(
      STAGGER * index,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200,
      }),
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        _anim.value,
        [0, 1],
        [AVATAR_SIZE, Math.max(user.score * 3), AVATAR_SIZE],
      ),
      backgroundColor:
        index % 2 === 0
          ? interpolateColor(
              _anim.value,
              [0, 1],
              ['rgba(0, 0, 0, 0.1)', 'turquoise'],
            )
          : 'rgba(0, 0, 0, 0.1)',
    };
  });

  const httpsImageUri = useMemo(() => {
    return {uri: `https://i.pravatar.cc/150?u=user_${user.name}`};
  }, [user.name]);

  const entering = useMemo(
    () =>
      FadeInRight.delay(STAGGER * index)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback(finished => {
          if (finished && onAnimationFinished) {
            runOnJS(onAnimationFinished)();
          }
        }),
    [index, onAnimationFinished],
  );

  const baseLineStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      height: AVATAR_SIZE,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: AVATAR_SIZE,
      paddingHorizontal: 1.5,
    };
  }, []);

  const scoreStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0.5, 1], [0, 0, 1]),
      marginBottom: interpolate(_anim.value, [0, 0.5, 1], [0, 4, 8]),
    };
  });

  const lineCombinedStyle: StyleProp<ViewStyle> = useMemo(
    () => [baseLineStyle, animatedStyle],
    [animatedStyle, baseLineStyle],
  );

  const scoreCombinedStyle: StyleProp<TextStyle> = useMemo(() => {
    return [styles.score, scoreStyle];
  }, [scoreStyle]);

  return (
    <Animated.View style={styles.container} entering={entering}>
      <Animated.Text style={scoreCombinedStyle}>{user.score}</Animated.Text>
      <Animated.View style={lineCombinedStyle}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={httpsImageUri} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
