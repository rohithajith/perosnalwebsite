"use client";

import React, { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout = window.setTimeout(() => setVisible(false), 3000);

    function onLoad() {
      window.clearTimeout(timeout);
      // small delay so fade-out animation is visible
      setTimeout(() => setVisible(false), 200);
    }

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { passive: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`global-loader ${visible ? "" : "hidden"}`} aria-hidden={!visible}>
      <div className="loader-inner">
        <img src="/abstract-isometric-loader-1.gif" alt="Loading" />
      </div>
    </div>
  );
}
