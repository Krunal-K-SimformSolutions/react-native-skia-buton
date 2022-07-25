import type {
  BlendMode,
  Color,
  PaintStyle,
  SkEnum,
  StrokeCap,
  StrokeJoin,
  TileMode,
} from '@shopify/react-native-skia';
import type { ReactNode } from 'react';

export type GradientDataType = {
  name: string;
  angle: number;
  colors: Color[];
  positions: number[];
};

export type GradientNameType =
  | 'Warm Flame'
  | 'Night Fade'
  | 'Spring Warmth'
  | 'Juicy Peach'
  | 'Young Passion'
  | 'Lady Lips'
  | 'Sunny Morning'
  | 'Rainy Ashville'
  | 'Frozen Dreams'
  | 'Winter Neva'
  | 'Dusty Grass'
  | 'Tempting Azure'
  | 'Heavy Rain'
  | 'Amy Crisp'
  | 'Mean Fruit'
  | 'Deep Blue'
  | 'Ripe Malinka'
  | 'Cloudy Knoxville'
  | 'Malibu Beach'
  | 'New Life'
  | 'True Sunset'
  | 'Morpheus Den'
  | 'Rare Wind'
  | 'Near Moon'
  | 'Wild Apple'
  | 'Saint Petersburg'
  | 'Plum Plate'
  | 'Everlasting Sky'
  | 'Happy Fisher'
  | 'Blessing'
  | 'Sharpeye Eagle'
  | 'Ladoga Bottom'
  | 'Lemon Gate'
  | 'Itmeo Branding'
  | 'Zeus Miracle'
  | 'Old Hat'
  | 'Star Wine'
  | 'Happy Acid'
  | 'Awesome Pine'
  | 'New York'
  | 'Shy Rainbow'
  | 'Mixed Hopes'
  | 'Fly High'
  | 'Strong Bliss'
  | 'Fresh Milk'
  | 'Snow Again'
  | 'February Ink'
  | 'Kind Steel'
  | 'Soft Grass'
  | 'Grown Early'
  | 'Sharp Blues'
  | 'Shady Water'
  | 'Dirty Beauty'
  | 'Great Whale'
  | 'Teen Notebook'
  | 'Polite Rumors'
  | 'Sweet Period'
  | 'Wide Matrix'
  | 'Soft Cherish'
  | 'Red Salvation'
  | 'Burning Spring'
  | 'Night Party'
  | 'Sky Glider'
  | 'Heaven Peach'
  | 'Purple Division'
  | 'Aqua Splash'
  | 'Spiky Naga'
  | 'Love Kiss'
  | 'Clean Mirror'
  | 'Premium Dark'
  | 'Cold Evening'
  | 'Cochiti Lake'
  | 'Summer Games'
  | 'Passionate Bed'
  | 'Mountain Rock'
  | 'Desert Hump'
  | 'Jungle Day'
  | 'Phoenix Start'
  | 'October Silence'
  | 'Faraway River'
  | 'Alchemist Lab'
  | 'Over Sun'
  | 'Premium White'
  | 'Mars Party'
  | 'Eternal Constance'
  | 'Japan Blush'
  | 'Smiling Rain'
  | 'Cloudy Apple'
  | 'Big Mango'
  | 'Healthy Water'
  | 'Amour Amour'
  | 'Risky Concrete'
  | 'Strong Stick'
  | 'Vicious Stance'
  | 'Palo Alto'
  | 'Happy Memories'
  | 'Midnight Bloom'
  | 'Crystalline'
  | 'Party Bliss'
  | 'Confident Cloud'
  | 'Le Cocktail'
  | 'River City'
  | 'Frozen Berry'
  | 'Child Care'
  | 'Flying Lemon'
  | 'New Retrowave'
  | 'Hidden Jaguar'
  | 'Above The Sky'
  | 'Nega'
  | 'Dense Water'
  | 'Seashore'
  | 'Marble Wall'
  | 'Cheerful Caramel'
  | 'Night Sky'
  | 'Magic Lake'
  | 'Young Grass'
  | 'Colorful Peach'
  | 'Gentle Care'
  | 'Plum Bath'
  | 'Happy Unicorn'
  | 'African Field'
  | 'Solid Stone'
  | 'Orange Juice'
  | 'Glass Water'
  | 'North Miracle'
  | 'Fruit Blend'
  | 'Millennium Pine'
  | 'High Flight'
  | 'Mole Hall'
  | 'Space Shift'
  | 'Forest Inei'
  | 'Royal Garden'
  | 'Rich Metal'
  | 'Juicy Cake'
  | 'Smart Indigo'
  | 'Sand Strike'
  | 'Norse Beauty'
  | 'Aqua Guidance'
  | 'Sun Veggie'
  | 'Sea Lord'
  | 'Black Sea'
  | 'Grass Shampoo'
  | 'Landing Aircraft'
  | 'Witch Dance'
  | 'Sleepless Night'
  | 'Angel Care'
  | 'Crystal River'
  | 'Soft Lipstick'
  | 'Salt Mountain'
  | 'Perfect White'
  | 'Fresh Oasis'
  | 'Strict November'
  | 'Morning Salad'
  | 'Deep Relief'
  | 'Sea Strike'
  | 'Night Call'
  | 'Supreme Sky'
  | 'Light Blue'
  | 'Mind Crawl'
  | 'Lily Meadow'
  | 'Sugar Lollipop'
  | 'Sweet Dessert'
  | 'Magic Ray'
  | 'Teen Party'
  | 'Frozen Heat'
  | 'Gagarin View'
  | 'Fabled Sunset'
  | 'Perfect Blue';

type GradientCommonType = {
  colors?: Color[];
  positions?: number[];
  mode?: SkEnum<typeof TileMode>;
};

type LinearGradientType = GradientCommonType & {
  type: 'linear';
  start?: [number, number];
  end?: [number, number];
};

type RadialGradientType = GradientCommonType & {
  type: 'radial';
  center: [number, number];
  radius: number;
};

type ConicalGradientType = GradientCommonType & {
  type: 'conical';
  start?: [number, number];
  startRadius: number;
  end?: [number, number];
  endRadius: number;
};

type SweepGradientType = GradientCommonType & {
  type: 'sweep';
  center: [number, number];
  startAngle?: number;
  endAngle?: number;
};

export type GradientType =
  | LinearGradientType
  | RadialGradientType
  | ConicalGradientType
  | SweepGradientType;

export type BackgroundType =
  | { color: Color; gradient?: never; gradientName?: never }
  | { color?: never; gradient: GradientType; gradientName?: GradientNameType };

export type SkiaBackgroundPropsType = {
  width: number;
  height: number;
  color?: Color;
  gradient?: GradientType;
  gradientName?: GradientNameType;

  strokeWidth?: number;
  blendMode?: SkEnum<typeof BlendMode>;
  style?: SkEnum<typeof PaintStyle>;
  strokeJoin?: SkEnum<typeof StrokeJoin>;
  strokeCap?: SkEnum<typeof StrokeCap>;
  strokeMiter?: number;
  opacity?: number;
  antiAlias?: boolean;
  children?: ReactNode | ReactNode[];
};
