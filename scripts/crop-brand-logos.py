"""
Recorta a folha 3x3 de logos Studio A3 em arquivos em public/brand/.
Uso: na raiz do projeto, com Pillow instalado:
  py -3 scripts/crop-brand-logos.py
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Instale Pillow: py -3 -m pip install Pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC = ROOT / "src/assets/brand/studio-a3-logo-sheet.png"
OUT_DIR = ROOT / "public/brand"


def crop_cell(im: Image.Image, row: int, col: int, inset: float = 0.045) -> Image.Image:
    w, h = im.size
    left = col * w // 3
    top = row * h // 3
    right = (col + 1) * w // 3
    bottom = (row + 1) * h // 3
    cw, ch = right - left, bottom - top
    ix, iy = int(cw * inset), int(ch * inset)
    return im.crop((left + ix, top + iy, right - ix, bottom - iy))


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    if not src.is_file():
        print(f"Arquivo não encontrado: {src}", file=sys.stderr)
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGBA")

    # Mark, favicon e logos finais transparentes: make-transparent-horizontal-logo.py (--circle-only, --framed, --stacked).
    exports = [
        ((1, 0), "logo-stacked.png"),
        ((0, 0), "logo-circle-badge.png"),
    ]
    for (r, c), name in exports:
        crop_cell(im, r, c).save(OUT_DIR / name, optimize=True)

    print(f"Exportado em {OUT_DIR} (rode make-transparent-horizontal-logo.py para PNGs finais)")


if __name__ == "__main__":
    main()
