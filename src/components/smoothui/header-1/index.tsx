"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero-grid.module.css";

const text = "Diseño y desarrollo digital.";

const CELL_SIZE = 120;

const COLORS = [
  "#2c3f8e",
  "#5b7fc4",
  "#a9c4e8",
  "#d6dbe3",
  "#797979",
];

function getRandomColor() {
  return COLORS[
    Math.floor(Math.random() * COLORS.length)
  ];
}

/* =========================================================
   SUBGRID
   ========================================================= */

function SubGrid({
  mobileActiveCells,
  globalIndex,
}: {
  mobileActiveCells: Record<string, string>;
  globalIndex: number;
}) {
  const [cellColors, setCellColors] = useState<
    (string | null)[]
  >([
    null,
    null,
    null,
    null,
  ]);

  const leaveTimeouts = useRef<
    (ReturnType<typeof setTimeout> | null)[]
  >([
    null,
    null,
    null,
    null,
  ]);

  /* ---------------------------------------------------------
     DESKTOP
     --------------------------------------------------------- */

  function handleHover(cellIdx: number) {
    const timeout =
      leaveTimeouts.current[cellIdx];

    if (timeout) {
      clearTimeout(timeout);
      leaveTimeouts.current[cellIdx] = null;
    }

    setCellColors((prev) =>
      prev.map((color, index) =>
        index === cellIdx
          ? getRandomColor()
          : color
      )
    );
  }

  function handleLeave(cellIdx: number) {
    leaveTimeouts.current[cellIdx] =
      setTimeout(() => {
        setCellColors((prev) =>
          prev.map((color, index) =>
            index === cellIdx
              ? null
              : color
          )
        );

        leaveTimeouts.current[cellIdx] =
          null;
      }, 180);
  }

  useEffect(() => {
    return () => {
      leaveTimeouts.current.forEach(
        (timeout) => {
          if (timeout) {
            clearTimeout(timeout);
          }
        }
      );
    };
  }, []);

  return (
    <div className={styles.subgrid}>
      {[0, 1, 2, 3].map((cellIdx) => {
        const key =
          `${globalIndex}-${cellIdx}`;

        return (
          <button
            key={cellIdx}
            type="button"
            className={styles.cell}
            onMouseEnter={() =>
              handleHover(cellIdx)
            }
            onMouseLeave={() =>
              handleLeave(cellIdx)
            }
            style={{
              background:
                mobileActiveCells[key] ||
                cellColors[cellIdx] ||
                "transparent",
            }}
            aria-label="Interactive grid cell"
          />
        );
      })}
    </div>
  );
}

/* =========================================================
   INTERACTIVE GRID
   ========================================================= */

function InteractiveGrid() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState({
    columns: 0,
    rows: 0,
  });

  const [
    mobileActiveCells,
    setMobileActiveCells,
  ] = useState<Record<string, string>>({});

  /*
   * Última celda tocada.
   */
  const lastCell =
    useRef<string | null>(null);

  /*
   * Cola de la estela.
   */
  const trail =
    useRef<string[]>([]);

  /*
   * Timers individuales.
   */
  const fadeTimers =
    useRef<
      Record<
        string,
        ReturnType<typeof setTimeout>
      >
    >({});

  const touching =
    useRef(false);

  /* =======================================================
     GRID
     ======================================================= */

  useEffect(() => {
    function updateGrid() {
      if (!containerRef.current) return;

      const {
        width,
        height,
      } =
        containerRef.current.getBoundingClientRect();

      setGrid({
        columns:
          Math.ceil(width / CELL_SIZE),
        rows:
          Math.ceil(height / CELL_SIZE),
      });
    }

    updateGrid();

    window.addEventListener(
      "resize",
      updateGrid
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateGrid
      );
    };
  }, []);

  /* =======================================================
     OBTENER CELDA
     ======================================================= */

  function getCellFromPoint(
    clientX: number,
    clientY: number
  ) {
    if (!containerRef.current) {
      return null;
    }

    const rect =
      containerRef.current.getBoundingClientRect();

    const x =
      clientX - rect.left;

    const y =
      clientY - rect.top;

    if (
      x < 0 ||
      y < 0 ||
      x > rect.width ||
      y > rect.height
    ) {
      return null;
    }

    const column =
      Math.floor(
        x / CELL_SIZE
      );

    const row =
      Math.floor(
        y / CELL_SIZE
      );

    if (
      column < 0 ||
      column >= grid.columns ||
      row < 0 ||
      row >= grid.rows
    ) {
      return null;
    }

    const localX =
      x - column * CELL_SIZE;

    const localY =
      y - row * CELL_SIZE;

    const localColumn =
      localX >= CELL_SIZE / 2
        ? 1
        : 0;

    const localRow =
      localY >= CELL_SIZE / 2
        ? 1
        : 0;

    const cellIndex =
      localRow * 2 +
      localColumn;

    const gridIndex =
      row * grid.columns +
      column;

    return {
      key:
        `${gridIndex}-${cellIndex}`,
      x,
      y,
    };
  }

  /* =======================================================
     AÑADIR CELDA
     ======================================================= */

     function addTrailCell(key: string) {
      if (trail.current.includes(key)) {
        return;
      }
    
      const MAX_TRAIL = 5;
    
      trail.current.push(key);
    
      setMobileActiveCells((prev) => ({
        ...prev,
        [key]: getRandomColor(),
      }));
    
      /*
       * Cada cuadrado desaparece solo.
       * El tiempo es ligeramente diferente
       * para que la cola se sienta orgánica.
       */
      const fadeTime = 400 + Math.random() * 140;
    
      const timer = setTimeout(() => {
        removeTrailCell(key);
      }, fadeTime);
    
      fadeTimers.current[key] = timer;
    
      /*
       * Si hay demasiados cuadrados,
       * eliminamos únicamente el más antiguo.
       */
      while (trail.current.length > MAX_TRAIL) {
        const oldest = trail.current.shift();
    
        if (oldest) {
          removeTrailCell(oldest);
        }
      }
    }
  /* =======================================================
     QUITAR CELDA
     ======================================================= */

     function removeTrailCell(key: string) {
      /*
       * Cancelamos cualquier timer pendiente.
       */
      const timer = fadeTimers.current[key];
    
      if (timer) {
        clearTimeout(timer);
        delete fadeTimers.current[key];
      }
    
      /*
       * Sacamos la celda de la cola.
       */
      trail.current = trail.current.filter(
        (item) => item !== key
      );
    
      /*
       * La sacamos visualmente.
       */
      setMobileActiveCells((prev) => {
        if (!prev[key]) {
          return prev;
        }
    
        const next = {
          ...prev,
        };
    
        delete next[key];
    
        return next;
      });
    }

  /* =======================================================
     TOUCH MOBILE
     ======================================================= */

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) return;

    const mobile =
      window.matchMedia(
        "(max-width: 768px)"
      ).matches;

    if (!mobile) return;

    function handlePointerDown(
      event: PointerEvent
    ) {
      if (
        event.pointerType !==
        "touch"
      ) {
        return;
      }

      touching.current = true;

      const cell =
        getCellFromPoint(
          event.clientX,
          event.clientY
        );

      if (!cell) return;

      lastCell.current =
        cell.key;

      addTrailCell(
        cell.key
      );
    }

    function handlePointerMove(
      event: PointerEvent
    ) {
      if (
        !touching.current ||
        event.pointerType !==
          "touch"
      ) {
        return;
      }

      const cell =
        getCellFromPoint(
          event.clientX,
          event.clientY
        );

      if (!cell) return;

      if (
        cell.key ===
        lastCell.current
      ) {
        return;
      }

      /*
       * Solo agregamos la nueva celda.
       * Esto hace que la estela sea mucho
       * más limpia y menos explosiva.
       */
      addTrailCell(
        cell.key
      );

      lastCell.current =
        cell.key;
    }

    function handlePointerUp(event: PointerEvent) {
      if (event.pointerType !== "touch") {
        return;
      }
    
      touching.current = false;
      lastCell.current = null;
    
      /*
       * Dejamos que la cola termine suavemente.
       * No desaparece de golpe.
       */
      const remaining = [...trail.current];
    
      remaining.forEach((key, index) => {
        setTimeout(() => {
          removeTrailCell(key);
        }, 180 + index * 70);
      });
    }

    container.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    container.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    window.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    return () => {
      container.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      container.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      window.removeEventListener(
        "pointercancel",
        handlePointerUp
      );

      Object.values(
        fadeTimers.current
      ).forEach(clearTimeout);
    };
  }, [
    grid.columns,
    grid.rows,
  ]);

  const total =
    grid.columns *
    grid.rows;

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      aria-hidden="true"
    >
      <div
        className={styles.mainGrid}
        style={
          {
            "--grid-cell-size":
              `${CELL_SIZE}px`,
            gridTemplateColumns:
              `repeat(${grid.columns}, 1fr)`,
            gridTemplateRows:
              `repeat(${grid.rows}, 1fr)`,
          } as React.CSSProperties
        }
      >
        {Array.from(
          { length: total },
          (_, index) => (
            <SubGrid
              key={index}
              globalIndex={index}
              mobileActiveCells={
                mobileActiveCells
              }
            />
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

export default function HeroGrid() {
  return (
    <section
      className={styles.hero}
    >
      <InteractiveGrid />

      <div
        className={
          styles.heroContent
        }
      >
        <p
          className={
            styles.eyebrow
          }
        >
          {text
            .split("")
            .map(
              (
                letter,
                index
              ) => (
                <span
                  key={index}
                  className={
                    styles.letter
                  }
                  style={
                    {
                      "--i":
                        index,
                    } as React.CSSProperties
                  }
                >
                  {letter ===
                  " "
                    ? "\u00A0"
                    : letter}
                </span>
              )
            )}
        </p>

        <h1
          className={
            styles.title
          }
        >
          Vira Studio.
          <sup>®</sup>
        </h1>
      </div>
    </section>
  );
}