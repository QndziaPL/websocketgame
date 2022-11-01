import React, { useEffect, useLayoutEffect, useRef, VFC } from "react";
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
  update: () => void;
}

const FRAMERATE = 60;

const GameCanvas: VFC<Props> = ({
  canvasContext,
  setCanvasContext,
  draw,
  size,
  setSize,
  update,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef(0);
  const lastFrameTimestamp = useRef(0);

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

  useEffect(() => {
    const render = (timestamp = 0) => {
      if (timestamp > lastFrameTimestamp.current - 1000 / FRAMERATE) {
        draw(canvasContext!);
        animationFrameId.current = requestAnimationFrame(render);
        lastFrameTimestamp.current = timestamp;
        update();
      }
    };
    if (canvasContext) {
      animationFrameId.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [draw, canvasContext]);

  return (
    <canvas
      id="gameCanvas"
      width={size.width}
      height={size.height}
      data-testid="gameCanvas"
      ref={canvasRef}
    />
  );
};

export default GameCanvas;
