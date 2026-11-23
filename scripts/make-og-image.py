import pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_PATH = ROOT / "public" / "og-image.png"
FONT_PATH = pathlib.Path(r"C:\Windows\Fonts\impact.ttf")

PAPER = (244, 236, 227)
INK = (14, 14, 14)
SIGNAL = (194, 20, 21)
MUTED = (95, 90, 85)


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if FONT_PATH.exists():
        return ImageFont.truetype(str(FONT_PATH), size=size)
    return ImageFont.load_default()


def main() -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    img = Image.new("RGB", (1200, 630), PAPER)
    draw = ImageDraw.Draw(img)

    # Editorial vertical signal block on the right
    draw.rectangle((860, 0, 1080, 630), fill=SIGNAL)

    # Corner crosshair markers (+)
    for cx, cy in [(48, 48), (1152, 48), (48, 582), (1152, 582)]:
        draw.line((cx - 10, cy, cx + 10, cy), fill=INK, width=2)
        draw.line((cx, cy - 10, cx, cy + 10), fill=INK, width=2)

    title_font = load_font(124)
    role_font = load_font(78)
    meta_font = load_font(26)

    draw.line((72, 118, 128, 118), fill=SIGNAL, width=5)
    draw.text((72, 136), "PORTFOLIO  /  PEKANBARU, INDONESIA", font=meta_font, fill=MUTED)
    draw.text((72, 198), "SANDI SETIANTO", font=title_font, fill=INK)
    draw.text((72, 342), "FULLSTACK DEVELOPER", font=role_font, fill=SIGNAL)
    draw.text((72, 470), "CODE THAT CONNECTS  —  REACT · TYPESCRIPT · NODE.JS", font=meta_font, fill=INK)

    img.save(OUT_PATH, format="PNG", optimize=True)
    print("Generated OG image at", OUT_PATH)


if __name__ == "__main__":
    main()
