import { useEffect, useRef } from "react";

/**
 * 一定間隔で実行する間隔を登録するカスタムフック。
 *
 * @param callback 一定間隔で呼び出す関数
 * @param fps (およそ)この間隔で実行する frame per seconds の値
 */
export function useInterval(callback: () => void, fps = 10) {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  useEffect(() => {
    const fn = () => {
      ref.current();
    };
    const id = setInterval(fn, 1000 / fps);
    return () => {
      clearInterval(id);
    };
  }, [fps]);
}
