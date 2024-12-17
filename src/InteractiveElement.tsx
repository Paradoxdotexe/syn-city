import React, { ReactNode, useEffect, useState } from "react";

type InteractiveElementProps = {
  id: string;
  children: ReactNode;
  intensity?: number;
};

export const InteractiveElement: React.FC<InteractiveElementProps> = (
  props
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverWeight, setHoverWeight] = useState<{ x: number; y: number }>();
  const [glarePoint, setGlarePoint] = useState<{ x: number; y: number }>();

  const intensity = props.intensity ?? 10;

  useEffect(() => {
    const element = document.getElementById(props.id);

    const onMouseMove = (event: any) => {
      if (isHovered) {
        const elementBox = element!.getBoundingClientRect();
        const xRatio = (event.clientX - elementBox.left) / elementBox.width;
        const yRatio = (event.clientY - elementBox.top) / elementBox.height;
        setHoverWeight({ x: (xRatio - 0.5) * 2, y: (0.5 - yRatio) * 2 });
        setGlarePoint({ x: (1 - xRatio) * 100, y: (1 - yRatio) * 100 });
      } else {
        setHoverWeight(undefined);
        setGlarePoint(undefined);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isHovered]);

  return (
    <div
      style={{
        position: "relative",
        perspective: 800,
        perspectiveOrigin: "center center",
        width: "fit-content",
      }}
    >
      <div
        id={props.id}
        style={{
          transform: hoverWeight
            ? `rotateY(${hoverWeight.x * intensity}deg) rotateX(${
                hoverWeight.y * intensity
              }deg)`
            : "rotateY(0) rotateX(0)",
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
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
              `radial-gradient(circle at ${glarePoint.x}% ${glarePoint.y}%, rgba(255, 255, 255, 0.07) 25%, transparent 75%)`,
          }}
        />
        {props.children}
      </div>
    </div>
  );
};
