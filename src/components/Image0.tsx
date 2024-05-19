import { useState } from "react";
import { useInterval } from "./misc/useInterval";

const WIDTH = 100;
const HEIGHT = 100;
const MARGIN = 8;
const COLOR = "hsl(0 0% 60%)";
const MAX_FPS = 60;

/**
 * 更新のテスト
 */
export function Image0() {
  const [latests] = useState<number[]>([]);
  const [latestFps, setLatestFps] = useState(0);

  function update() {
    setLatestFps(getLatestFPS(latests));
  }

  useInterval(update, 10);

  return (
    <div style={{ width: `${WIDTH}px`, height: `${HEIGHT}px`, flexShrink: 0 }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        fill={COLOR}
      >
        <text
          x={WIDTH / 2}
          y={50}
          style={{ fontSize: "36px", textAnchor: "middle" }}
        >
          {latestFps.toFixed(1).padStart(4, "0")}
        </text>
        <rect
          x={MARGIN}
          y={70}
          width={(latestFps / MAX_FPS) * (WIDTH - MARGIN * 2)}
          height={10}
        />
        <rect
          x={MARGIN}
          y={80}
          width={WIDTH - MARGIN * 2}
          height={2}
          fill="hsl(0 0% 90%)"
        />
      </svg>
    </div>
  );
}

/**
 * 直近10フレームのFPSを返す。
 * 副作用として、渡した配列を操作する。
 */
function getLatestFPS(latests: number[]) {
  if (10 < latests.length) {
    latests.shift();
  }
  latests.push(Date.now());

  if (latests.length <= 1) {
    return 0;
  }

  const start = latests[0];
  const end = latests[latests.length - 1];

  return ((latests.length - 1) / (end - start)) * 1000;
}
