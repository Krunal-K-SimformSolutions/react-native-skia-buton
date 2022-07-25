import type { SkiaMutableValue } from "@shopify/react-native-skia";

export type SkiaCircleProgressPropsType = {
  width: number;
  height: number;
  color: string | string[],
  opacity: SkiaMutableValue<number>
}