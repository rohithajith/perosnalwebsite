import React from "react";
import "./kinetic-sketch-backdrop.css";

export interface KineticSketchBackdropProps {
  /** Target rotation angle in degrees driven by scroll position */
  angleDeg: number;
  /** Current slide index (0..N-1) for subtle parallax drift */
  slideIndex: number;
  /** Disable animations and transitions when reduced-motion is preferred */
  instant?: boolean;
}

interface FloatingSketchItem {
  id: string;
  src: string;
  left: string;
  top: string;
  size: string;
  opacity: number;
  motionClass: string;
  durationSec: number;
  delaySec: number;
  baseRotateDeg: number;
}

const MIDDLE_GEAR_RATIO = 0.68;
const FAR_GEAR_RATIO = 0.45;

/**
 * 26 continuously moving 2x-supersampled chalk sketch sprites distributed across
 * the full viewport: rockets, Saturn & rings, skateboards, robot emojis, crabs,
 * AI diamonds, plus all original chalkboard geometry & formula elements.
 */
const FLOATING_SKETCHES: FloatingSketchItem[] = [
  {
    id: "rocket-nw",
    src: "/assets/sketch-rocket.png",
    left: "8%",
    top: "16%",
    size: "clamp(74px, 7.2vw, 112px)",
    opacity: 0.88,
    motionClass: "sk-motion-rocket-a",
    durationSec: 13.5,
    delaySec: -3.2,
    baseRotateDeg: -14,
  },
  {
    id: "saturn-ne",
    src: "/assets/sketch-saturn.png",
    left: "86%",
    top: "15%",
    size: "clamp(88px, 8.6vw, 134px)",
    opacity: 0.86,
    motionClass: "sk-motion-saturn",
    durationSec: 18,
    delaySec: -6.4,
    baseRotateDeg: -8,
  },
  {
    id: "ai-diamond-top",
    src: "/assets/sketch-ai-diamond.png",
    left: "26%",
    top: "11%",
    size: "clamp(68px, 6.2vw, 96px)",
    opacity: 0.9,
    motionClass: "sk-motion-twinkle",
    durationSec: 11.5,
    delaySec: -2.1,
    baseRotateDeg: 6,
  },
  {
    id: "robot-left",
    src: "/assets/sketch-robot.png",
    left: "7%",
    top: "48%",
    size: "clamp(74px, 6.8vw, 108px)",
    opacity: 0.88,
    motionClass: "sk-motion-robot",
    durationSec: 14,
    delaySec: -4.8,
    baseRotateDeg: -6,
  },
  {
    id: "crab-sw",
    src: "/assets/sketch-crab.png",
    left: "14%",
    top: "82%",
    size: "clamp(76px, 7.2vw, 112px)",
    opacity: 0.86,
    motionClass: "sk-motion-crab",
    durationSec: 12.2,
    delaySec: -5.3,
    baseRotateDeg: 5,
  },
  {
    id: "skateboard-se",
    src: "/assets/sketch-skateboard.png",
    left: "85%",
    top: "81%",
    size: "clamp(84px, 8vw, 126px)",
    opacity: 0.88,
    motionClass: "sk-motion-skate",
    durationSec: 13.8,
    delaySec: -7.1,
    baseRotateDeg: -10,
  },
  {
    id: "robot-right",
    src: "/assets/sketch-robot.png",
    left: "92%",
    top: "45%",
    size: "clamp(68px, 6.2vw, 98px)",
    opacity: 0.82,
    motionClass: "sk-motion-robot",
    durationSec: 16.5,
    delaySec: -9.2,
    baseRotateDeg: 9,
  },
  {
    id: "rocket-se-mid",
    src: "/assets/sketch-rocket.png",
    left: "74%",
    top: "64%",
    size: "clamp(66px, 6.2vw, 98px)",
    opacity: 0.72,
    motionClass: "sk-motion-rocket-b",
    durationSec: 15.2,
    delaySec: -8.5,
    baseRotateDeg: 18,
  },
  {
    id: "saturn-sw-mid",
    src: "/assets/sketch-saturn.png",
    left: "28%",
    top: "88%",
    size: "clamp(74px, 6.8vw, 108px)",
    opacity: 0.74,
    motionClass: "sk-motion-saturn",
    durationSec: 21,
    delaySec: -11.4,
    baseRotateDeg: 14,
  },
  {
    id: "crab-ne-mid",
    src: "/assets/sketch-crab.png",
    left: "68%",
    top: "13%",
    size: "clamp(66px, 6vw, 96px)",
    opacity: 0.78,
    motionClass: "sk-motion-crab",
    durationSec: 14.6,
    delaySec: -1.7,
    baseRotateDeg: -12,
  },
  {
    id: "skateboard-nw-mid",
    src: "/assets/sketch-skateboard.png",
    left: "18%",
    top: "32%",
    size: "clamp(70px, 6.5vw, 102px)",
    opacity: 0.68,
    motionClass: "sk-motion-skate",
    durationSec: 17.4,
    delaySec: -4.0,
    baseRotateDeg: 12,
  },
  {
    id: "ai-diamond-se",
    src: "/assets/sketch-ai-diamond.png",
    left: "91%",
    top: "67%",
    size: "clamp(70px, 6.4vw, 102px)",
    opacity: 0.88,
    motionClass: "sk-motion-twinkle",
    durationSec: 12.8,
    delaySec: -6.9,
    baseRotateDeg: -15,
  },
  {
    id: "ai-diamond-bottom-mid",
    src: "/assets/sketch-ai-diamond.png",
    left: "52%",
    top: "90%",
    size: "clamp(64px, 5.8vw, 90px)",
    opacity: 0.8,
    motionClass: "sk-motion-twinkle",
    durationSec: 14.2,
    delaySec: -10.1,
    baseRotateDeg: 20,
  },
  {
    id: "cylinder-left-top",
    src: "/assets/sketch-cylinder.png",
    left: "4%",
    top: "29%",
    size: "clamp(72px, 6.8vw, 106px)",
    opacity: 0.8,
    motionClass: "sk-motion-tumble-cw",
    durationSec: 20,
    delaySec: -5.5,
    baseRotateDeg: -12,
  },
  {
    id: "cone-right-top",
    src: "/assets/sketch-cone.png",
    left: "93%",
    top: "28%",
    size: "clamp(68px, 6.4vw, 100px)",
    opacity: 0.78,
    motionClass: "sk-motion-tumble-ccw",
    durationSec: 19,
    delaySec: -9.8,
    baseRotateDeg: 14,
  },
  {
    id: "ruler-bottom-left",
    src: "/assets/sketch-ruler.png",
    left: "5%",
    top: "68%",
    size: "clamp(74px, 7vw, 110px)",
    opacity: 0.8,
    motionClass: "sk-motion-float-a",
    durationSec: 17.5,
    delaySec: -2.9,
    baseRotateDeg: -18,
  },
  {
    id: "venn-top-right-mid",
    src: "/assets/sketch-venn.png",
    left: "78%",
    top: "31%",
    size: "clamp(68px, 6.4vw, 100px)",
    opacity: 0.68,
    motionClass: "sk-motion-tumble-cw",
    durationSec: 22,
    delaySec: -13.0,
    baseRotateDeg: 8,
  },
  {
    id: "formula-top-center",
    src: "/assets/sketch-formula.png",
    left: "46%",
    top: "13%",
    size: "clamp(78px, 7.4vw, 116px)",
    opacity: 0.74,
    motionClass: "sk-motion-float-b",
    durationSec: 16,
    delaySec: -7.6,
    baseRotateDeg: -8,
  },
  {
    id: "triangle-bottom-right",
    src: "/assets/sketch-triangle.png",
    left: "70%",
    top: "87%",
    size: "clamp(70px, 6.4vw, 102px)",
    opacity: 0.78,
    motionClass: "sk-motion-tumble-ccw",
    durationSec: 18.5,
    delaySec: -4.2,
    baseRotateDeg: 11,
  },
  {
    id: "pen-left-mid",
    src: "/assets/sketch-pen.png",
    left: "21%",
    top: "64%",
    size: "clamp(62px, 5.8vw, 90px)",
    opacity: 0.66,
    motionClass: "sk-motion-float-a",
    durationSec: 15.8,
    delaySec: -11.2,
    baseRotateDeg: 24,
  },
  {
    id: "axes-top-left-mid",
    src: "/assets/sketch-axes.png",
    left: "36%",
    top: "23%",
    size: "clamp(60px, 5.4vw, 86px)",
    opacity: 0.56,
    motionClass: "sk-motion-float-b",
    durationSec: 19.5,
    delaySec: -3.7,
    baseRotateDeg: -10,
  },
  {
    id: "graph-bottom-center-left",
    src: "/assets/sketch-graph.png",
    left: "39%",
    top: "81%",
    size: "clamp(64px, 5.8vw, 92px)",
    opacity: 0.66,
    motionClass: "sk-motion-float-a",
    durationSec: 18,
    delaySec: -8.9,
    baseRotateDeg: 6,
  },
  {
    id: "cylinder-bottom-right-outer",
    src: "/assets/sketch-cylinder.png",
    left: "95%",
    top: "88%",
    size: "clamp(66px, 6.2vw, 96px)",
    opacity: 0.7,
    motionClass: "sk-motion-tumble-ccw",
    durationSec: 21.5,
    delaySec: -14.1,
    baseRotateDeg: 28,
  },
  {
    id: "formula-bottom-left-outer",
    src: "/assets/sketch-formula.png",
    left: "4%",
    top: "91%",
    size: "clamp(72px, 6.6vw, 104px)",
    opacity: 0.72,
    motionClass: "sk-motion-float-b",
    durationSec: 17,
    delaySec: -6.0,
    baseRotateDeg: -14,
  },
  {
    id: "cone-center-right-bg",
    src: "/assets/sketch-cone.png",
    left: "60%",
    top: "26%",
    size: "clamp(60px, 5.4vw, 86px)",
    opacity: 0.54,
    motionClass: "sk-motion-tumble-cw",
    durationSec: 23,
    delaySec: -10.5,
    baseRotateDeg: -22,
  },
  {
    id: "rocket-top-center-right",
    src: "/assets/sketch-rocket.png",
    left: "58%",
    top: "8%",
    size: "clamp(62px, 5.6vw, 90px)",
    opacity: 0.76,
    motionClass: "sk-motion-rocket-a",
    durationSec: 14.8,
    delaySec: -9.4,
    baseRotateDeg: -26,
  },
];

export const KineticSketchBackdrop: React.FC<KineticSketchBackdropProps> = ({
  angleDeg,
  slideIndex,
  instant = false,
}) => {
  const leftFarDeg = angleDeg * FAR_GEAR_RATIO;
  const leftMidDeg = -angleDeg * MIDDLE_GEAR_RATIO;
  const rightFarDeg = 180 - angleDeg * FAR_GEAR_RATIO;
  const rightMidDeg = 180 + angleDeg * MIDDLE_GEAR_RATIO;

  const parallaxY = -(slideIndex - 3) * 14;
  const transitionClass = instant ? "is-instant" : "is-smooth-composited";

  return (
    <div className={`kinetic-backdrop ${transitionClass}`} aria-hidden="true">
      {/* Subtle chalkboard matte slate gradient */}
      <div className="chalkboard-surface" />

      {/* Counter-rotating 2x-supersampled pre-baked chalk planes */}
      <div className="kinetic-cover-stage">
        {/* Lower-left anchor planes */}
        <div
          className="sketch-quad anchor-left sketch-rotator"
          style={{
            transform: `translate3d(-50%, -50%, 0) rotate(${leftFarDeg.toFixed(2)}deg)`,
          }}
        >
          <img
            src="/assets/compositor-sketch-far.png"
            alt=""
            width={1320}
            height={1320}
            decoding="async"
            className="sketch-plane-img sketch-spin-cw"
          />
        </div>

        <div
          className="sketch-quad anchor-left sketch-rotator"
          style={{
            transform: `translate3d(-50%, -50%, 0) rotate(${leftMidDeg.toFixed(2)}deg)`,
          }}
        >
          <img
            src="/assets/compositor-sketch-mid.png"
            alt=""
            width={1320}
            height={1320}
            decoding="async"
            className="sketch-plane-img sketch-spin-ccw"
          />
        </div>

        {/* Upper-right anchor planes */}
        <div
          className="sketch-quad anchor-right sketch-rotator"
          style={{
            transform: `translate3d(-50%, -50%, 0) rotate(${rightFarDeg.toFixed(2)}deg)`,
          }}
        >
          <img
            src="/assets/compositor-sketch-far.png"
            alt=""
            width={1320}
            height={1320}
            decoding="async"
            className="sketch-plane-img sketch-spin-ccw"
          />
        </div>

        <div
          className="sketch-quad anchor-right sketch-rotator"
          style={{
            transform: `translate3d(-50%, -50%, 0) rotate(${rightMidDeg.toFixed(2)}deg)`,
          }}
        >
          <img
            src="/assets/compositor-sketch-mid.png"
            alt=""
            width={1320}
            height={1320}
            decoding="async"
            className="sketch-plane-img sketch-spin-cw"
          />
        </div>
      </div>

      {/* Stationary directional chalkboard vignettes */}
      <div className="studio-vignette-chalk" />

      {/* Continuously moving individual 2x-supersampled sketch items */}
      <div
        className="sketch-sprite-stage"
        style={{
          transform: `translate3d(0, ${parallaxY.toFixed(1)}px, 0)`,
        }}
      >
        {FLOATING_SKETCHES.map((item) => (
          <div
            key={item.id}
            className="sketch-sprite-anchor"
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size,
              opacity: item.opacity,
              transform: `translate3d(-50%, -50%, 0) rotate(${item.baseRotateDeg}deg)`,
            }}
          >
            <img
              src={item.src}
              alt=""
              width={256}
              height={256}
              decoding="async"
              className={`sketch-sprite-img ${item.motionClass}`}
              style={{
                animationDuration: `${item.durationSec}s`,
                animationDelay: `${item.delaySec}s`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
