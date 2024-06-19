import React, {ReactElement} from 'react';
import {
  View,
  Text,
  Animated,
  requireNativeComponent,
  StyleSheet,
  ViewStyle,
  ViewProps,
  StyleProp,
} from 'react-native';

export const NATIVE_MODULE_NAME = 'RCTMLNCallout';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    zIndex: 9999999,
  },
  content: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    borderWidth: 1,
    flex: 1,
    padding: 8,
    position: 'relative',
  },
  tip: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderLeftWidth: 8,
    borderRightColor: 'transparent',
    borderRightWidth: 8,
    borderTopColor: 'white',
    borderTopWidth: 16,
    elevation: 0,
    marginTop: -2,
    zIndex: 1000,
  },
  title: {
    color: 'black',
    textAlign: 'center',
  },
});

interface CalloutProps extends Omit<ViewProps, 'style'> {
  /**
   * String that get's displayed in the default callout.
   */
  title?: string;
  /**
   * Style property for the Animated.View wrapper, apply animations to this
   */
  style?: ViewStyle;
  /**
   * Style property for the native RCTMLNCallout container, set at your own risk.
   */
  containerStyle?: ViewStyle;
  /**
   * Style property for the content bubble.
   */
  contentStyle?: ViewStyle;
  /**
   * Style property for the triangle tip under the content.
   */
  tipStyle?: ViewStyle;
  /**
   * Style property for the title in the content bubble.
   */
  textStyle?: ViewStyle;
}

interface NativeProps extends Omit<CalloutProps, 'style'> {
  style: StyleProp<ViewStyle>;
}

/**
 *  Callout that displays information about a selected annotation near the annotation.
 */
const Callout = (props: CalloutProps): ReactElement => {
  const {
    title,
    style,
    containerStyle,
    contentStyle,
    tipStyle,
    textStyle,
    children,
  } = props;

  const _containerStyle: ViewStyle[] = [
    {
      position: 'absolute',
      zIndex: 999,
      backgroundColor: 'transparent',
      ...containerStyle,
    } as ViewStyle,
  ];

  const _hasChildren = React.Children.count(children) > 0;

  const _renderDefaultCallout = (): ReactElement => {
    return (
      <Animated.View testID="container" style={[styles.container, style]}>
        <View testID="wrapper" style={[styles.content, contentStyle]}>
          <Text testID="title" style={[styles.title, textStyle]}>
            {title}
          </Text>
        </View>
        <View testID="tip" style={[styles.tip, tipStyle]} />
      </Animated.View>
    );
  };

  const _renderCustomCallout = (): ReactElement => {
    return (
      <Animated.View testID="container" {...props} style={style}>
        {children}
      </Animated.View>
    );
  };

  const calloutContent = _hasChildren
    ? _renderCustomCallout()
    : _renderDefaultCallout();

  return (
    <RCTMLNCallout testID="callout" style={_containerStyle}>
      {calloutContent}
    </RCTMLNCallout>
  );
};

const RCTMLNCallout = requireNativeComponent<NativeProps>(NATIVE_MODULE_NAME);

export default Callout;
