import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";

interface MouseState {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  velocityX: number;
  velocityY: number;
  speed: number;
}

const defaultState: MouseState = { x: 0, y: 0, normalizedX: 0, normalizedY: 0, velocityX: 0, velocityY: 0, speed: 0 };

const MouseContext = createContext<MouseState>(defaultState);

export const useMousePosition = () => useContext(MouseContext);

export const MouseProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<MouseState>(defaultState);
  const prev = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - prev.current.time, 1);
      const vx = (e.clientX - prev.current.x) / dt * 16;
      const vy = (e.clientY - prev.current.y) / dt * 16;
      prev.current = { x: e.clientX, y: e.clientY, time: now };
      setState({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
        velocityX: vx,
        velocityY: vy,
        speed: Math.sqrt(vx * vx + vy * vy),
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return <MouseContext.Provider value={state}>{children}</MouseContext.Provider>;
};
