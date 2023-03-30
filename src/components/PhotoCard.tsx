import { StyleSheet, Image, Dimensions, View } from "react-native";
import React from "react";
import Card from "./Card";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

const { width } = Dimensions.get("window");

const IMG_WIDTH = width / 1.5;
const IMG_HEIGHT = (IMG_WIDTH * 16) / 9;

const CARD_WIDTH = IMG_WIDTH + 40;

const side = (width + CARD_WIDTH + 30) / 2;

const SNAP_POINTS = [-side, 0, side];

type PhotoCardProps = {
  source: ReturnType<typeof require>;
};

const PhotoCard: React.FC<PhotoCardProps> = ({ source }) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const rotateZ = useSharedValue(Math.random() * 10 - 5);
  const rotateX = useSharedValue(30);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX;
      y.value = ctx.y + translationY;
      rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
      // rotateX.value = withTiming(0, { easing: Easing.inOut(Easing.bounce) });
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
      x.value = withSpring(dest, { velocity: velocityX });
      y.value = withSpring(0, { velocity: velocityY });
      // rotateX.value = withSpring(30);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { translateX: x.value },
      { translateY: y.value },
      { rotateX: `${rotateX.value}deg` },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, style]}>
          <Card>
            <Image
              source={source}
              resizeMode="cover"
              style={{ width: IMG_WIDTH, height: IMG_HEIGHT }}
            />
          </Card>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default PhotoCard;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: CARD_WIDTH,
  },
});
