"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./hero-grid.module.css";

const text = "Diseño y desarrollo digital.";

const CELL_SIZE = 120;

const COLORS = [
  "#2c3f8e", // azul Vira
  "#5b7fc4", // azul medio
  "#a9c4e8", // celeste
  "#d6dbe3", // gris azulado
  "#797979", // gris
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function SubGrid() {
  const [cellColors, setCellColors] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const leaveTimeouts = useRef<
    (ReturnType<typeof setTimeout> | null)[]
  >([null, null, null, null]);

  function handleHover(cellIdx: number) {
    const timeout = leaveTimeouts.current[cellIdx];

    if (timeout) {
      clearTimeout(timeout);
      leaveTimeouts.current[cellIdx] = null;
    }

    setCellColors((prev) =>
      prev.map((color, index) =>
        index === cellIdx ? getRandomColor() : color
      )
    );
  }

  function handleLeave(cellIdx: number) {
    leaveTimeouts.current[cellIdx] = setTimeout(() => {
      setCellColors((prev) =>
        prev.map((color, index) =>
          index === cellIdx ? null : color
        )
      );

      leaveTimeouts.current[cellIdx] = null;
    }, 120);
  }

  useEffect(() => {
    return () => {
      leaveTimeouts.current.forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <div className={styles.subgrid}>
      {[0, 1, 2, 3].map((cellIdx) => (
        <button
          key={cellIdx}
          type="button"
          className={styles.cell}
          onMouseEnter={() => handleHover(cellIdx)}
          onMouseLeave={() => handleLeave(cellIdx)}
          style={{
            background: cellColors[cellIdx] || "transparent",
          }}
          aria-label="Interactive grid cell"
        />
      ))}
    </div>
  );
}

function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState({
    columns: 0,
    rows: 0,
  });

  useEffect(() => {
    function updateGrid() {
      if (!containerRef.current) return;

      const { width, height } =
        containerRef.current.getBoundingClientRect();

      setGrid({
        columns: Math.ceil(width / CELL_SIZE),
        rows: Math.ceil(height / CELL_SIZE),
      });
    }

    updateGrid();

    window.addEventListener("resize", updateGrid);

    return () => {
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  const total = grid.columns * grid.rows;

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      aria-hidden="true"
    >
      <div
        className={styles.mainGrid}
        style={{
          "--grid-cell-size": `${CELL_SIZE}px`,
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        } as React.CSSProperties}
      >
        {Array.from({ length: total }, (_, index) => (
          <SubGrid key={index} />
        ))}
      </div>
    </div>
  );
}

export default function HeroGrid() {
  return (
    <section className={styles.hero}>
      <InteractiveGrid />

      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>
          {text.split("").map((letter, index) => (
            <span
              key={index}
              className={styles.letter}
              style={
                {
                  "--i": index,
                } as React.CSSProperties
              }
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </p>

        <h1 className={styles.title}>
          Vira Studio.
          <sup>®</sup>
        </h1>
      </div>
    </section>
  );
}