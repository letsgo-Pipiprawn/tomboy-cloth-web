import { useEffect, useRef, useState } from 'react';

type CursorTheme = 'light' | 'dark';

function parseColorToRgba(color: string) {
  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null;
  return {
    r: parts[0],
    g: parts[1],
    b: parts[2],
    a: parts.length >= 4 && !Number.isNaN(parts[3]) ? parts[3] : 1,
  };
}

function pickCursorThemeFromPoint(x: number, y: number): CursorTheme {
  const startNode = document.elementFromPoint(x, y);
  let node = startNode instanceof HTMLElement ? startNode : null;
  while (node) {
    const rgba = parseColorToRgba(getComputedStyle(node).backgroundColor);
    if (rgba && rgba.a > 0.05) {
      const luminance = (0.2126 * rgba.r + 0.7152 * rgba.g + 0.0722 * rgba.b) / 255;
      return luminance > 0.62 ? 'dark' : 'light';
    }
    node = node.parentElement;
  }

  const bodyColor = parseColorToRgba(getComputedStyle(document.body).backgroundColor);
  if (!bodyColor) return 'light';
  const bodyLuminance = (0.2126 * bodyColor.r + 0.7152 * bodyColor.g + 0.0722 * bodyColor.b) / 255;
  return bodyLuminance > 0.62 ? 'dark' : 'light';
}

function setCursorTransform(el: HTMLElement, x: number, y: number) {
  el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function applyCursorTheme(dotEl: HTMLElement, ringEl: HTMLElement, theme: CursorTheme) {
  dotEl.classList.toggle('cursor-theme-light', theme === 'light');
  dotEl.classList.toggle('cursor-theme-dark', theme === 'dark');
  ringEl.classList.toggle('cursor-theme-light', theme === 'light');
  ringEl.classList.toggle('cursor-theme-dark', theme === 'dark');
}

function applyHoverState(
  dotEl: HTMLElement,
  ringEl: HTMLElement,
  labelEl: HTMLSpanElement,
  hovering: boolean,
  label: string,
) {
  dotEl.classList.toggle('is-hovering', hovering);
  ringEl.classList.toggle('is-hovering', hovering);
  if (labelEl.textContent !== label) {
    labelEl.textContent = label;
  }
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);
  const labelRefValue = useRef('VIEW');
  const themeRef = useRef<CursorTheme>('light');
  const rafRef = useRef(0);
  const themeCheckRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    const labelEl = labelRef.current;
    if (!dotEl || !ringEl || !labelEl) return;

    const onMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };

      const target = event.target as HTMLElement | null;
      const interactiveTarget = target?.closest('[data-cursor-label]');
      if (interactiveTarget instanceof HTMLElement) {
        const resolvedLabel = interactiveTarget.dataset.cursorLabel?.trim() || 'VIEW';
        if (!hoverRef.current || labelRefValue.current !== resolvedLabel) {
          hoverRef.current = true;
          labelRefValue.current = resolvedLabel;
          applyHoverState(dotEl, ringEl, labelEl, true, resolvedLabel);
        }
      } else if (hoverRef.current || labelRefValue.current !== 'VIEW') {
        hoverRef.current = false;
        labelRefValue.current = 'VIEW';
        applyHoverState(dotEl, ringEl, labelEl, false, 'VIEW');
      }

      const now = performance.now();
      if (now - themeCheckRef.current >= 120) {
        themeCheckRef.current = now;
        const nextTheme = pickCursorThemeFromPoint(event.clientX, event.clientY);
        if (themeRef.current !== nextTheme) {
          themeRef.current = nextTheme;
          applyCursorTheme(dotEl, ringEl, nextTheme);
        }
      }
    };

    const loop = () => {
      const { x: tx, y: ty } = targetRef.current;

      setCursorTransform(dotEl, tx, ty);

      const ring = ringPosRef.current;
      ring.x += (tx - ring.x) * 0.22;
      ring.y += (ty - ring.y) * 0.22;
      setCursorTransform(ringEl, ring.x, ring.y);

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot cursor-theme-light" aria-hidden />
      <div ref={ringRef} className="custom-cursor-ring cursor-theme-light" aria-hidden>
        <span ref={labelRef} className="custom-cursor-label">
          VIEW
        </span>
      </div>
    </>
  );
}
