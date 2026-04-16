"""
Pipelines de transparência para a marca Studio A3 (Pillow).

Saídas em public/brand/:
  --circle-only   logo-circle-rgb.png -> logo-mark.png, favicon-32.png, apple-touch-icon.png
  --framed        logo-framed-rgb.png -> logo-framed.png
  --stacked       logo-stacked-rgb.png -> logo-stacked.png

Uso:
  py -3 scripts/make-transparent-horizontal-logo.py --circle-only
  py -3 scripts/make-transparent-horizontal-logo.py --framed
  py -3 scripts/make-transparent-horizontal-logo.py --stacked

Legado (wordmark horizontal + mark recortado do A3, grava logo-horizontal.png):
  py -3 scripts/make-transparent-horizontal-logo.py --from-sheet
  py -3 scripts/make-transparent-horizontal-logo.py [caminho.png]
"""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Instale Pillow: py -3 -m pip install Pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC = ROOT / "src/assets/brand/logo-horizontal-rgb.png"
SHEET = ROOT / "src/assets/brand/studio-a3-logo-sheet.png"
OUT_H = ROOT / "public/brand/logo-horizontal.png"
OUT_MARK = ROOT / "public/brand/logo-mark.png"
OUT_FAV = ROOT / "public/brand/favicon-32.png"
OUT_APPLE = ROOT / "public/brand/apple-touch-icon.png"
CIRCLE_SRC = ROOT / "src/assets/brand/logo-circle-rgb.png"
FRAMED_SRC = ROOT / "src/assets/brand/logo-framed-rgb.png"
OUT_FRAMED = ROOT / "public/brand/logo-framed.png"
STACKED_SRC = ROOT / "src/assets/brand/logo-stacked-rgb.png"
OUT_STACKED = ROOT / "public/brand/logo-stacked.png"


def flood_transparent(
    im: Image.Image,
    bg: tuple[int, int, int],
    tol: int = 12,
) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    def near_bg(r: int, g: int, b: int) -> bool:
        return (
            abs(r - bg[0]) <= tol
            and abs(g - bg[1]) <= tol
            and abs(b - bg[2]) <= tol
        )

    seen = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if not seen[y][x]:
                r, g, b = px[x, y][:3]
                if near_bg(r, g, b):
                    seen[y][x] = True
                    q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not seen[y][x]:
                r, g, b = px[x, y][:3]
                if near_bg(r, g, b):
                    seen[y][x] = True
                    q.append((x, y))

    while q:
        x, y = q.popleft()
        r, g, b = px[x, y][:3]
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx]:
                r2, g2, b2 = px[nx, ny][:3]
                if near_bg(r2, g2, b2):
                    seen[ny][nx] = True
                    q.append((nx, ny))

    return im


def punch_limit_before_a3_square(im: Image.Image, fallback_ratio: float = 0.65) -> tuple[int, int]:
    """
    Retorna (limite_x_wordmark, coluna_inicio_bloco_taupe_A3).
    """
    w, h = im.size
    px = im.load()
    if w < 12 or h < 8:
        fb = int(w * fallback_ratio)
        return fb, min(fb + 12, w - 4)

    def col_taupe_ratio(x: int) -> float:
        hits = 0
        total = 0
        for y in range(h):
            r, g, b, a = px[x, y]
            if a < 40:
                continue
            total += 1
            if 115 <= r <= 195 and 100 <= g <= 185 and 88 <= b <= 175:
                hits += 1
        return hits / total if total > h * 0.35 else 0.0

    ratios = [col_taupe_ratio(x) for x in range(w)]
    need = 4
    thr = 0.82
    for x in range(0, w - need):
        if all(ratios[x + i] >= thr for i in range(need)):
            square_start = x
            punch_lim = max(8, x - 6)
            return punch_lim, square_start

    fb = int(w * fallback_ratio)
    return fb, min(fb + 12, w - 4)


def _framed_right_panel_metrics(im: Image.Image) -> tuple[list[float], int, int] | None:
    """Razões por coluna (faixa vertical central), início do bloco A3, coluna do divisor."""
    w, h = im.size
    px = im.load()
    y0, y1 = int(h * 0.2), int(h * 0.86)

    def band_taupe_ratio(x: int) -> float:
        hits = 0
        total = 0
        for y in range(y0, y1):
            r, g, b, a = px[x, y]
            if a < 35:
                continue
            total += 1
            if 120 <= r <= 200 and 100 <= g <= 190 and 90 <= b <= 180:
                hits += 1
        return hits / total if total > (y1 - y0) * 0.35 else 0.0

    ratios = [band_taupe_ratio(x) for x in range(w)]
    need = 8
    thr_block = 0.59
    square_start: int | None = None
    for x in range(int(w * 0.71), w - need):
        if all(ratios[x + i] >= thr_block for i in range(need)):
            square_start = x
            break
    if square_start is None:
        return None

    div_x: int | None = None
    for x in range(1, square_start - 8):
        if ratios[x] >= 0.88 and ratios[x - 1] < 0.72:
            div_x = x
            break
    if div_x is None:
        div_x = max(0, square_start - 24)

    return ratios, square_start, div_x


def punch_framed_gap_before_a3(im: Image.Image) -> None:
    """
    Logo em moldura: faixa clara (branco/cinza) entre divisor vertical e o quadrado A3.
    Usa só a faixa vertical central (onde está o bloco A3) para achar o início do quadrado
    e apaga colunas claras entre o traço fino do divisor e esse bloco.
    """
    parsed = _framed_right_panel_metrics(im)
    if parsed is None:
        return
    _, square_start, div_x = parsed
    w, h = im.size
    px = im.load()

    for x in range(div_x + 1, square_start):
        for y in range(h):
            r, g, b, a = px[x, y]
            if a < 30:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum >= 168 and chroma <= 46:
                if 120 <= r <= 210 and 100 <= g <= 198 and 92 <= b <= 188 and chroma >= 14:
                    continue
                px[x, y] = (r, g, b, 0)


def punch_framed_white_panel_around_a3(im: Image.Image, div_x: int) -> None:
    """
    Remove o fundo branco/claro *dentro* da moldura, ao redor do quadrado taupe do A3,
    sem apagar o traço da moldura nem o branco das letras A3 (proteção por densidade de taupe).
    `div_x` deve vir de _framed_right_panel_metrics *antes* de punch_framed_gap_before_a3.
    """
    w, h = im.size
    px = im.load()

    def is_taupe_fill(r: int, g: int, b: int, a: int) -> bool:
        if a < 40:
            return False
        if not (118 <= r <= 198 and 98 <= g <= 192 and 88 <= b <= 182):
            return False
        return max(r, g, b) - min(r, g, b) < 48

    def is_interior_taupe(nx: int, ny: int) -> bool:
        r, g, b, a = px[nx, ny]
        if not is_taupe_fill(r, g, b, a):
            return False
        tc = 0
        for ox in (-1, 0, 1):
            for oy in (-1, 0, 1):
                tx, ty = nx + ox, ny + oy
                if 0 <= tx < w and 0 <= ty < h:
                    rr, gg, bb, aa = px[tx, ty]
                    if is_taupe_fill(rr, gg, bb, aa):
                        tc += 1
        return tc >= 4

    def taupe_interior_weight_at(x: int, y: int) -> int:
        wsum = 0
        for dx in range(-4, 5):
            for dy in range(-4, 5):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and is_interior_taupe(nx, ny):
                    wsum += 1
        return wsum

    x_lo = div_x + 1
    for x in range(x_lo, w - 1):
        for y in range(1, h - 1):
            r, g, b, a = px[x, y]
            if a < 30:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum < 200 or chroma > 40:
                continue
            if is_taupe_fill(r, g, b, a):
                continue
            if taupe_interior_weight_at(x, y) >= 8:
                continue
            px[x, y] = (r, g, b, 0)


def punch_white_strip_before_square(im: Image.Image, punch_lim: int, square_start: int) -> None:
    """Remove faixa branca/cinza-claro entre wordmark e o quadrado A3 (colunas quase só fundo)."""
    px = im.load()
    w, h = im.size
    lo = max(0, min(punch_lim, w - 1))
    hi = max(lo + 1, min(square_start, w))
    for x in range(lo, hi):
        whites = 0
        total = 0
        for y in range(h):
            r, g, b, a = px[x, y]
            if a < 35:
                continue
            total += 1
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum >= 218 and chroma <= 32:
                whites += 1
        if total < h * 0.2:
            continue
        if whites / total >= 0.76:
            for y in range(h):
                r, g, b, a = px[x, y]
                if a < 35:
                    continue
                mx, mn = max(r, g, b), min(r, g, b)
                chroma = mx - mn
                lum = (r + g + b) / 3.0
                if lum >= 208 and chroma <= 34:
                    px[x, y] = (r, g, b, 0)


def punch_neutral_whites_in_wordmark(im: Image.Image, lim_x: int) -> None:
    """Torna transparentes brancos/cinzas neutros só em x < lim_x (wordmark)."""
    px = im.load()
    w, h = im.size
    lim_x = max(1, min(lim_x, w))

    for y in range(h):
        for x in range(lim_x):
            r, g, b, a = px[x, y]
            if a < 16:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum >= 228 and chroma <= 26:
                px[x, y] = (r, g, b, 0)


def punch_neutral_whites_above_y(im: Image.Image, y_max_exclusive: int) -> None:
    """Logo empilhado: brancos neutros só acima do bloco sólido (região stu/dio)."""
    px = im.load()
    w, h = im.size
    y_lim = max(0, min(y_max_exclusive, h))
    for y in range(y_lim):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 16:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum >= 228 and chroma <= 26:
                px[x, y] = (r, g, b, 0)


def _row_taupe_ratio(im: Image.Image, y: int) -> float:
    w, h = im.size
    if y < 0 or y >= h:
        return 0.0
    px = im.load()
    hits = total = 0
    for x in range(w):
        r, g, b, a = px[x, y]
        if a < 35:
            continue
        total += 1
        if 120 <= r <= 200 and 100 <= g <= 190 and 90 <= b <= 180:
            hits += 1
    return hits / total if total > w * 0.28 else 0.0


def find_stacked_square_y_bounds(im: Image.Image) -> tuple[int, int]:
    """Retorna (y_top, y_bottom) do quadrado taupe cheio na base (logo vertical)."""
    h = im.size[1]
    y = h - 1
    while y >= 0 and _row_taupe_ratio(im, y) < 0.32:
        y -= 1
    if y < 0:
        return max(0, int(h * 0.55)), h - 1
    y_bottom = h - 1
    y_top = y
    while y_top >= 0 and _row_taupe_ratio(im, y_top) >= 0.22:
        y_top -= 1
    y_top += 1
    return y_top, y_bottom


def _col_taupe_ratio_band(im: Image.Image, x: int, y0: int, y1: int) -> float:
    w, h = im.size
    if x < 0 or x >= w or y0 > y1:
        return 0.0
    y0 = max(0, y0)
    y1 = min(h - 1, y1)
    px = im.load()
    hits = total = 0
    for y in range(y0, y1 + 1):
        r, g, b, a = px[x, y]
        if a < 35:
            continue
        total += 1
        if 120 <= r <= 200 and 100 <= g <= 190 and 90 <= b <= 180:
            hits += 1
    span = y1 - y0 + 1
    return hits / total if total > span * 0.32 else 0.0


def find_stacked_square_x_bounds(im: Image.Image, y_top: int, y_bottom: int) -> tuple[int, int]:
    w = im.size[0]
    xs = [x for x in range(w) if _col_taupe_ratio_band(im, x, y_top, y_bottom) >= 0.52]
    if not xs:
        return int(w * 0.25), int(w * 0.75)
    return min(xs), max(xs)


def _stacked_taupe_fill(r: int, g: int, b: int, a: int) -> bool:
    if a < 40:
        return False
    if not (118 <= r <= 198 and 98 <= g <= 192 and 88 <= b <= 182):
        return False
    return max(r, g, b) - min(r, g, b) < 48


def _stacked_interior_taupe(px, w: int, h: int, nx: int, ny: int) -> bool:
    r, g, b, a = px[nx, ny]
    if not _stacked_taupe_fill(r, g, b, a):
        return False
    tc = 0
    for ox in (-1, 0, 1):
        for oy in (-1, 0, 1):
            tx, ty = nx + ox, ny + oy
            if 0 <= tx < w and 0 <= ty < h:
                rr, gg, bb, aa = px[tx, ty]
                if _stacked_taupe_fill(rr, gg, bb, aa):
                    tc += 1
    return tc >= 4


def _stacked_taupe_weight(px, w: int, h: int, x: int, y: int) -> int:
    wsum = 0
    for dx in range(-4, 5):
        for dy in range(-4, 5):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and _stacked_interior_taupe(px, w, h, nx, ny):
                wsum += 1
    return wsum


def punch_stacked_square_surround(
    im: Image.Image,
    y_top: int,
    x0: int,
    x1: int,
) -> None:
    """Remove fundo claro à esquerda/direita do quadrado e dentro da área do quadrado (exceto letras A3)."""
    w, h = im.size
    px = im.load()
    y_top = max(0, min(y_top, h - 1))
    x0 = max(0, min(x0, w - 1))
    x1 = max(0, min(x1, w - 1))

    for y in range(y_top, h):
        for x in list(range(0, x0)) + list(range(x1 + 1, w)):
            r, g, b, a = px[x, y]
            if a < 30:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum < 198 or chroma > 40:
                continue
            if _stacked_taupe_fill(r, g, b, a):
                continue
            if _stacked_taupe_weight(px, w, h, x, y) >= 8:
                continue
            px[x, y] = (r, g, b, 0)

    for y in range(y_top, h):
        for x in range(x0, x1 + 1):
            r, g, b, a = px[x, y]
            if a < 30:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            chroma = mx - mn
            lum = (r + g + b) / 3.0
            if lum < 200 or chroma > 40:
                continue
            if _stacked_taupe_fill(r, g, b, a):
                continue
            if _stacked_taupe_weight(px, w, h, x, y) >= 8:
                continue
            px[x, y] = (r, g, b, 0)


def apply_stacked_pipeline(raw: Image.Image) -> Image.Image:
    corners = [
        raw.getpixel((0, 0)),
        raw.getpixel((raw.width - 1, 0)),
        raw.getpixel((0, raw.height - 1)),
        raw.getpixel((raw.width - 1, raw.height - 1)),
    ]
    bg = tuple(sum(c[i] for c in corners) // len(corners) for i in range(3))
    out = flood_transparent(raw, bg=bg, tol=14)
    out = trim_alpha(out)
    y_top, y_bottom = find_stacked_square_y_bounds(out)
    punch_neutral_whites_above_y(out, max(0, y_top - 1))
    x0, x1 = find_stacked_square_x_bounds(out, y_top, y_bottom)
    punch_stacked_square_surround(out, y_top, x0, x1)
    return trim_alpha(out)


def export_mark_and_icons_from_rgba(mark_rgba: Image.Image) -> None:
    """Centraliza o mark em canvas quadrado e grava mark / favicon / apple-touch."""
    m = trim_alpha(mark_rgba.convert("RGBA"))
    side = max(m.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = (side - m.width) // 2
    oy = (side - m.height) // 2
    square.paste(m, (ox, oy), m)
    OUT_MARK.parent.mkdir(parents=True, exist_ok=True)
    square.save(OUT_MARK, optimize=True)
    square.resize((32, 32), Image.Resampling.LANCZOS).save(OUT_FAV, optimize=True)
    square.resize((180, 180), Image.Resampling.LANCZOS).save(OUT_APPLE, optimize=True)


def process_circle_only() -> None:
    if not CIRCLE_SRC.is_file():
        print(f"Arquivo não encontrado: {CIRCLE_SRC}", file=sys.stderr)
        sys.exit(1)
    raw = Image.open(CIRCLE_SRC).convert("RGB")
    corners = [
        raw.getpixel((0, 0)),
        raw.getpixel((raw.width - 1, 0)),
        raw.getpixel((0, raw.height - 1)),
        raw.getpixel((raw.width - 1, raw.height - 1)),
    ]
    bg = tuple(sum(c[i] for c in corners) // len(corners) for i in range(3))
    out = flood_transparent(raw, bg=bg, tol=14)
    out = trim_alpha(out)
    export_mark_and_icons_from_rgba(out)
    print(f"OK circle-only: {OUT_MARK} ({out.size})")


def trim_alpha(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def rough_mark_crop(im: Image.Image) -> Image.Image:
    w, h = im.size
    slice_ = im.crop((int(w * 0.56), 0, w, h))
    return trim_alpha(slice_)


def crop_sheet_cell(im: Image.Image, row: int, col: int, inset: float = 0.045) -> Image.Image:
    w, h = im.size
    left = col * w // 3
    top = row * h // 3
    right = (col + 1) * w // 3
    bottom = (row + 1) * h // 3
    cw, ch = right - left, bottom - top
    ix, iy = int(cw * inset), int(ch * inset)
    return im.crop((left + ix, top + iy, right - ix, bottom - iy))


def apply_transparency_pipeline(raw: Image.Image) -> tuple[Image.Image, int]:
    corners = [
        raw.getpixel((0, 0)),
        raw.getpixel((raw.width - 1, 0)),
        raw.getpixel((0, raw.height - 1)),
        raw.getpixel((raw.width - 1, raw.height - 1)),
    ]
    bg = tuple(sum(c[i] for c in corners) // len(corners) for i in range(3))
    out = flood_transparent(raw, bg=bg, tol=14)
    out = trim_alpha(out)
    punch_lim, square_start = punch_limit_before_a3_square(out)
    punch_neutral_whites_in_wordmark(out, punch_lim)
    punch_white_strip_before_square(out, punch_lim, square_start)
    return out, punch_lim


def load_source_rgb(argv: list[str]) -> Image.Image:
    """--from-sheet: recorta a célula (linha 2, col 1) da folha 3x3 e atualiza logo-horizontal-rgb.png."""
    if "--from-sheet" in argv:
        if not SHEET.is_file():
            print(f"Folha 3x3 não encontrada: {SHEET}", file=sys.stderr)
            sys.exit(1)
        sheet = Image.open(SHEET).convert("RGB")
        cell = crop_sheet_cell(sheet, 2, 1)
        DEFAULT_SRC.parent.mkdir(parents=True, exist_ok=True)
        cell.save(DEFAULT_SRC, optimize=True)
        return cell

    extra = [a for a in argv[1:] if not str(a).startswith("-")]
    path = Path(extra[0]) if extra else DEFAULT_SRC
    if not path.is_file():
        print(f"Arquivo não encontrado: {path}", file=sys.stderr)
        sys.exit(1)
    return Image.open(path).convert("RGB")


def main() -> None:
    OUT_H.parent.mkdir(parents=True, exist_ok=True)

    if "--circle-only" in sys.argv:
        process_circle_only()
        return

    if "--stacked" in sys.argv:
        if not STACKED_SRC.is_file():
            print(f"Arquivo não encontrado: {STACKED_SRC}", file=sys.stderr)
            sys.exit(1)
        raw = Image.open(STACKED_SRC).convert("RGB")
        out = apply_stacked_pipeline(raw)
        out.save(OUT_STACKED, optimize=True)
        print(f"OK stacked: {OUT_STACKED} ({out.size})")
        return

    if "--framed" in sys.argv:
        if not FRAMED_SRC.is_file():
            print(f"Arquivo não encontrado: {FRAMED_SRC}", file=sys.stderr)
            sys.exit(1)
        raw = Image.open(FRAMED_SRC).convert("RGB")
        out, punch_x = apply_transparency_pipeline(raw)
        parsed_f = _framed_right_panel_metrics(out)
        div_f = parsed_f[2] if parsed_f else int(out.size[0] * 0.36)
        punch_framed_gap_before_a3(out)
        punch_framed_white_panel_around_a3(out, div_f)
        out = trim_alpha(out)
        out.save(OUT_FRAMED, optimize=True)
        print(f"OK framed: {OUT_FRAMED} ({out.size}), punch_x={punch_x}")
        return

    raw = load_source_rgb(sys.argv)
    out, punch_x = apply_transparency_pipeline(raw)

    out.save(OUT_H, optimize=True)

    mark = rough_mark_crop(out)
    export_mark_and_icons_from_rgba(mark)

    print(f"OK: {OUT_H} ({out.size}), punch_x={punch_x}, mark icons atualizados")


if __name__ == "__main__":
    main()
