import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
} from 'react-native';

interface Props extends TouchableOpacityProps, TouchableNativeFeedbackProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TouchableComponent: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const { children, style, ...restOfProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let TouchableCmp: any = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp style={[styles.wrapper, style]} {...restOfProps}>
      {children}
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

export default TouchableComponent;
