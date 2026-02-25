"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimeout = window.setTimeout(() => setVisible(false), 3000);
    let fadeTimeout: number | null = null;

    function onLoad() {
      window.clearTimeout(hideTimeout);
      // small delay so fade-out animation is visible
      fadeTimeout = window.setTimeout(() => setVisible(false), 200);
    }

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { passive: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(hideTimeout);
      if (fadeTimeout) {
        window.clearTimeout(fadeTimeout);
      }
    };
  }, []);

  return (
    <div className={`global-loader ${visible ? "" : "hidden"}`} aria-hidden={!visible}>
      <div className="loader-inner">
        <Image src="/abstract-isometric-loader-1.gif" alt="Loading" width={240} height={240} unoptimized />
      </div>
    </div>
  );
}
