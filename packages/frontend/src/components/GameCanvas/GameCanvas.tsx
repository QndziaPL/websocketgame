import React, { useEffect, useLayoutEffect, useMemo, useRef, VFC } from "react";
import "./GameCanvas.css";

interface Props {
  canvasContext: CanvasRenderingContext2D | null;
  setCanvasContext: React.Dispatch<
    React.SetStateAction<CanvasRenderingContext2D | null>
  >;
  draw: (ctx: CanvasRenderingContext2D) => void;
  size: { width: number; height: number };
  setSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
}

const GameCanvas: VFC<Props> = ({
  canvasContext,
  setCanvasContext,
  draw,
  size,
  setSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      setCanvasContext(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef, setCanvasContext]);

  if (canvasContext) {
    draw(canvasContext);
  }

  return useMemo(
    () => (
      <canvas
        id="gameCanvas"
        width={size.width}
        height={size.height}
        data-testid="gameCanvas"
        ref={canvasRef}
      />
    ),
    [canvasContext, setCanvasContext, size, setSize]
  );
};

export default GameCanvas;
