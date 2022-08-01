import { interpolate, rect, rrect, SkRRect } from '@shopify/react-native-skia';
import type { ImageType, TextType } from '../TextWithImage';
import type { BackgroundType } from '../Background';
import type { ShadowType } from '../Shadow';
import type { StrokeType } from '../Stroke';
import type { SkiaButtonPropsType } from './SkiaButtonType';

export const isNotEmpty = (value?: number): boolean => {
  return value !== null && value !== undefined && value > 0;
};

export const animRRectValue = (
  animCurrentProgress: number,
  width: number,
  height: number,
  radius: number,
  horizontalMargin: number,
  verticalMargin: number,
  strokeWidth: number,
  isDashed: boolean
): SkRRect => {
  const newHeight: number = height + 2 * verticalMargin;
  const newWidth: number = width + 2 * horizontalMargin;
  const animSize = Math.min(newWidth, newHeight) - 5;
  const stroke: number = isDashed ? strokeWidth / 2 : 0;
  const strokeDouble: number = 2 * stroke;
  const radiusOutput: [number, number] = [radius, animSize / 2];

  return rrect(
    rect(
      interpolate(
        animCurrentProgress,
        [0, 1],
        [horizontalMargin + stroke, newWidth / 2 - animSize / 2 + stroke]
      ),
      interpolate(
        animCurrentProgress,
        [0, 1],
        [verticalMargin + stroke, newHeight / 2 - animSize / 2 + stroke]
      ),
      interpolate(
        animCurrentProgress,
        [0, 1],
        [width - strokeDouble, animSize - strokeDouble]
      ),
      interpolate(
        animCurrentProgress,
        [0, 1],
        [height - strokeDouble, animSize - strokeDouble]
      )
    ),
    interpolate(animCurrentProgress, [0, 1], radiusOutput),
    interpolate(animCurrentProgress, [0, 1], radiusOutput)
  );
};

export type GetSkiaButtonPropsReturnType = {
  width: number;
  height: number;
  borderRadius: number;
  horizontalMargin: number;
  verticalMargin: number;
  background: BackgroundType | undefined;
  shadow: ShadowType | undefined;
  text: TextType | undefined;
  stroke: StrokeType | undefined;
  image: ImageType | undefined;
  isDashed: boolean;
  imageDirection: 'left' | 'right' | 'top' | 'bottom' | undefined;
  isRevetSize: boolean;
};

const getKeyValue = (
  key: string,
  perticular: Record<string, any>,
  idle: Record<string, any>,
  def: Record<string, any>
): number => {
  return (perticular[key] ?? idle[key] ?? def[key] ?? 0) as number;
};

const keys = [
  'width',
  'height',
  'borderRadius',
  'horizontalMargin',
  'verticalMargin',
];
export const getSkiaButtonProps = ({
  currentState,
  state,
  ...Other
}: SkiaButtonPropsType): GetSkiaButtonPropsReturnType => {
  const localState = state === undefined ? undefined : currentState;
  const otherObject: Record<string, any> = { ...Other };
  let object: GetSkiaButtonPropsReturnType = {
    width: 0,
    height: 0,
    borderRadius: 0,
    horizontalMargin: 0,
    verticalMargin: 0,
    background: { color: 'transparent' },
    shadow: undefined,
    text: undefined,
    stroke: undefined,
    image: undefined,
    imageDirection: undefined,
    isDashed: false,
    isRevetSize: true,
  };

  switch (localState) {
    case 'idle':
      keys.forEach((key) => {
        // @ts-ignore
        object[key] = getKeyValue(
          key,
          state?.idle ?? {},
          state?.idle ?? {},
          otherObject
        );
      });
      object.background = state?.idle?.background;
      object.shadow = state?.idle?.shadow;
      object.text = state?.idle?.text;
      object.stroke = state?.idle?.stroke;
      object.image = state?.idle?.image;
      object.imageDirection = state?.idle?.imageDirection;
      object.isRevetSize = true;
      break;
    case 'disable':
      keys.forEach((key) => {
        // @ts-ignore
        object[key] = getKeyValue(
          key,
          state?.disable ?? {},
          state?.idle ?? {},
          otherObject
        );
      });
      object.background = state?.disable?.background;
      object.shadow = state?.disable?.shadow;
      object.text = state?.disable?.text;
      object.stroke = state?.disable?.stroke;
      object.image = state?.disable?.image;
      object.imageDirection = state?.disable?.imageDirection;
      object.isRevetSize = true;
      break;
    case 'loading':
      keys.forEach((key) => {
        // @ts-ignore
        object[key] = getKeyValue(
          key,
          state?.loading ?? {},
          state?.idle ?? {},
          otherObject
        );
      });
      object.background = state?.loading?.background;
      object.shadow = state?.loading?.shadow;
      object.stroke = state?.loading?.stroke;
      object.isRevetSize = true;
      break;
    case 'succeeded':
      keys.forEach((key) => {
        // @ts-ignore
        object[key] = getKeyValue(
          key,
          state?.succeeded ?? {},
          state?.idle ?? {},
          otherObject
        );
      });
      object.background = state?.succeeded?.background;
      object.shadow = state?.succeeded?.shadow;
      object.text = state?.succeeded?.text;
      object.stroke = state?.succeeded?.stroke;
      object.image = state?.succeeded?.image;
      object.imageDirection = state?.succeeded?.imageDirection;
      object.isRevetSize = state?.succeeded?.isRevetSize ?? true;
      break;
    case 'failed':
      keys.forEach((key) => {
        // @ts-ignore
        object[key] = getKeyValue(
          key,
          state?.failed ?? {},
          state?.idle ?? {},
          otherObject
        );
      });
      object.background = state?.failed?.background;
      object.shadow = state?.failed?.shadow;
      object.text = state?.failed?.text;
      object.stroke = state?.failed?.stroke;
      object.image = state?.failed?.image;
      object.imageDirection = state?.failed?.imageDirection;
      object.isRevetSize = state?.failed?.isRevetSize ?? true;
      break;
    default:
      keys.forEach((key) => {
        // @ts-ignore
        object[key] = getKeyValue(
          key,
          otherObject,
          state?.idle ?? {},
          otherObject
        );
      });
      object.background = otherObject?.background;
      object.shadow = otherObject?.shadow;
      object.text = otherObject?.text;
      object.stroke = otherObject?.stroke;
      object.image = otherObject?.image;
      object.imageDirection = otherObject?.imageDirection;
      object.isRevetSize = true;
      break;
  }

  object.isDashed =
    isNotEmpty(object?.stroke?.dashWidth) &&
    isNotEmpty(object?.stroke?.dashGap);

  return object;
};
