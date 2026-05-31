"""Generate nemotron-challenge icons matching gbose.dev project icon style."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

AMBER = (249, 124, 61, 255)
BORDER_ALPHA = {32: 20, 128: 25}
OUT_DIR = Path(__file__).resolve().parent


def _rounded_rect_outline(draw: ImageDraw.ImageDraw, size: int, alpha: int) -> None:
    inset = max(1, size // 16)
    radius = max(2, size // 6)
    color = (255, 255, 255, alpha)
    draw.rounded_rectangle(
        (inset, inset, size - inset - 1, size - inset - 1),
        radius=radius,
        outline=color,
        width=max(1, size // 32),
    )


def _dot(draw: ImageDraw.ImageDraw, x: float, y: float, r: float) -> None:
    draw.ellipse((x - r, y - r, x + r, y + r), fill=AMBER)


def _line(draw: ImageDraw.ImageDraw, a: tuple[float, float], b: tuple[float, float], width: int) -> None:
    draw.line((a[0], a[1], b[0], b[1]), fill=AMBER, width=width)


def draw_reasoning_hexagon(draw: ImageDraw.ImageDraw, size: int) -> None:
    """Six-node reasoning graph: center hub + hex ring, amber line art."""
    cx = cy = size / 2
    ring = size * 0.27
    dot_r = max(1.2, size / 14)
    line_w = max(1, round(size / 28))

    vertices = []
    for i in range(6):
        angle = math.radians(60 * i - 90)
        vertices.append((cx + ring * math.cos(angle), cy + ring * math.sin(angle)))

    for v in vertices:
        _line(draw, (cx, cy), v, line_w)
    for i, v in enumerate(vertices):
        _line(draw, v, vertices[(i + 1) % 6], line_w)

    _dot(draw, cx, cy, dot_r * 1.05)
    for v in vertices:
        _dot(draw, v[0], v[1], dot_r * 0.85)


def render(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    _rounded_rect_outline(draw, size, BORDER_ALPHA[size])
    draw_reasoning_hexagon(draw, size)
    return img


def main() -> None:
    for size in (32, 128):
        out = OUT_DIR / f"nemotron-challenge-{size}.png"
        render(size).save(out, optimize=True)
        print(f"wrote {out}")


if __name__ == "__main__":
    main()
