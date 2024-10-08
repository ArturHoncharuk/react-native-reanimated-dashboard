import {StyleSheet} from 'react-native';
import {AVATAR_SIZE} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  score: {
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    color: 'black',
  },
  imageWrapper: {
    width: AVATAR_SIZE,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    borderRadius: AVATAR_SIZE,
  },
});
