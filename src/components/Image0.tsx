import { useState } from "react";
import { useInterval } from "./misc/useInterval";

/**
 * 更新のテスト
 */
export function Image0() {
  const [latests] = useState<number[]>([]);
  const [latestFps, setLatestFps] = useState(0);

  function update() {
    setLatestFps(getLatestFPS(latests));
  }

  useInterval(update);

  return <div>{latestFps}</div>;
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

  return (latests.length / (end - start)) * 1000;
}
