import React, { ReactNode, useEffect, useState } from "react";

type InteractiveElementProps = {
  id: string;
  children: ReactNode;
  intensity?: number;
};

export const InteractiveElement: React.FC<InteractiveElementProps> = (
  props
) => {
  const [hoverWeight, setHoverWeight] = useState<{ x: number; y: number }>();
  const [glarePoint, setGlarePoint] = useState<{ x: number; y: number }>();
  const [centerPoint, setCenterPoint] = useState<{ x: number; y: number }>();

  const intensity = props.intensity ?? 10;

  useEffect(() => {
    const element = document.getElementById(props.id);
    const elementBox = element!.getBoundingClientRect();

    if (!centerPoint) {
      setCenterPoint({
        x: elementBox.left + elementBox.width / 2,
        y: elementBox.top + elementBox.height / 2,
      });
    }

    const onMouseMove = (event: any) => {
      if (
        event.clientX > elementBox.left &&
        event.clientX < elementBox.right &&
        event.clientY > elementBox.top &&
        event.clientY < elementBox.bottom
      ) {
        const xRatio = (event.clientX - elementBox.left) / elementBox.width;
        const yRatio = (event.clientY - elementBox.top) / elementBox.height;
        setHoverWeight({ x: (xRatio - 0.5) * 2, y: (0.5 - yRatio) * 2 });
        setGlarePoint({ x: (0.75 - xRatio) * 100, y: (1 - yRatio) * 100 });
      } else {
        setHoverWeight(undefined);
        setGlarePoint(undefined);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      id={props.id}
      style={{
        position: "relative",
        perspective: 800,
        perspectiveOrigin: "center center",
        padding: 16,
        width: "fit-content",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: 1,
          background:
            glarePoint &&
            `radial-gradient(circle at ${glarePoint.x}% ${glarePoint.y}%, rgba(255, 255, 255, 0.05) 25%, transparent 75%)`,
        }}
      />
      <div
        style={{
          transform: hoverWeight
            ? `scale(1.1) rotateY(${hoverWeight.x * intensity}deg) rotateX(${
                hoverWeight.y * intensity
              }deg)`
            : "scale(1) rotateY(0) rotateX(0)",
          transition: !hoverWeight ? "transform 150ms ease" : undefined,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
