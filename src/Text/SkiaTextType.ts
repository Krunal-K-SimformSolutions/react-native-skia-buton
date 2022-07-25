import type { SkiaMutableValue } from "@shopify/react-native-skia";

export type SkiaTextPropsType = {
  scale: number;
  width: number;
  height: number;
  font?: string;
  size: number;
  text: string;
  color: string;
  opacity: SkiaMutableValue<number>
}