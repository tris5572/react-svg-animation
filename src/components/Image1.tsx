import React from "react";
import { useInterval } from "./misc/useInterval";

/** 状況を表す要素の数 */
const ELEMENT_COUNT = 12;
/** 何個分の色を変えるかの数 */
const ACCENT_COUNT = 6;

type Props = {
  width?: number;
  height?: number;
  /** 明るいときの明度(100に近いほど明るい) */
  lightLightness?: number;
  /** 暗いときの明度(0に近いほど暗い) */
  darkLightness?: number;
  /** 色相(0～360[deg]) */
  hue?: number;
  /** 彩度(0～100[%]) */
  saturation?: number;
};

/**
 * スピナーを、1更新ごとに明度を変化させて表示するコンポーネント
 */
export function Image1({
  width = 100,
  height = 100,
  lightLightness = 90,
  darkLightness = 20,
  hue = 0,
  saturation = 0,
}: Props) {
  const [tick, setTick] = React.useState(0);

  useInterval(update, 10);

  /** 要素の番号と経過時間でカウントされる数から計算した明るさを返す */
  function lightness(i: number) {
    const num = (ELEMENT_COUNT - i + tick) % 12;
    if (ELEMENT_COUNT - 1 - ACCENT_COUNT < num) {
      const diff = (lightLightness - darkLightness) / ACCENT_COUNT;
      return darkLightness + diff * (num - ELEMENT_COUNT + ACCENT_COUNT);
    }
    return lightLightness;
  }

  /** 更新処理 */
  function update() {
    setTick((v) => (v + 1) % 12);
  }

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
      }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
        {[...Array(ELEMENT_COUNT)].map((_, i) => {
          return (
            <g transform={`rotate(${(i * 360) / 12}, ${width / 2}, ${width / 2})`} key={i}>
              <rect
                x={width / 2 - 3}
                y={10}
                width={6}
                height={20}
                fill={`hsl(${hue} ${saturation}% ${lightness(i)}%)`}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
