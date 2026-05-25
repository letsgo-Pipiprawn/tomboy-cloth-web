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

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('VIEW');
  const [theme, setTheme] = useState<CursorTheme>('light');
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const labelRef = useRef('VIEW');
  const themeRef = useRef<CursorTheme>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    const onMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      const target = event.target as HTMLElement | null;
      const interactiveTarget = target?.closest('[data-cursor-label]');
      if (interactiveTarget instanceof HTMLElement) {
        const nextLabel = interactiveTarget.dataset.cursorLabel?.trim();
        if (!hoverRef.current) {
          hoverRef.current = true;
          setHovering(true);
        }
        const resolvedLabel = nextLabel || 'VIEW';
        if (labelRef.current !== resolvedLabel) {
          labelRef.current = resolvedLabel;
          setLabel(resolvedLabel);
        }
      } else {
        if (hoverRef.current) {
          hoverRef.current = false;
          setHovering(false);
        }
        if (labelRef.current !== 'VIEW') {
          labelRef.current = 'VIEW';
          setLabel('VIEW');
        }
      }

      const nextTheme = pickCursorThemeFromPoint(event.clientX, event.clientY);
      if (themeRef.current !== nextTheme) {
        themeRef.current = nextTheme;
        setTheme(nextTheme);
      }
    };

    let raf = 0;
    const loop = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * 0.18;
      c.y += (t.y - c.y) * 0.18;
      currentRef.current = c;
      setPoint({ x: c.x, y: c.y });
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot cursor-theme-${theme} ${hovering ? 'is-hovering' : ''}`}
        style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }}
        aria-hidden
      />
      <div
        className={`custom-cursor-ring cursor-theme-${theme} ${hovering ? 'is-hovering' : ''}`}
        style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }}
        aria-hidden
      >
        <span className="custom-cursor-label">{label}</span>
      </div>
    </>
  );
}
