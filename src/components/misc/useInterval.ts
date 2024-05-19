import { useEffect, useRef } from "react";

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
