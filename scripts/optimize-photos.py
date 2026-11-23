import pathlib
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSET_DIR = ROOT / "asset"
OUT_DIR = ROOT / "src" / "assets" / "images"
SCRATCH_DIR = pathlib.Path(
    r"C:\Users\Martrio\.gemini\antigravity\brain\5fb56fa3-e282-4cdb-8be5-9360e64b4017\scratch"
)


def crop_4_5(img: Image.Image, center_x_ratio: float) -> Image.Image:
    w, h = img.size
    target_w = int(round(h * 0.8))
    if target_w > w:
        target_w = w
    cx = int(round(w * center_x_ratio))
    left = max(0, min(w - target_w, cx - target_w // 2))
    return img.crop((left, 0, left + target_w, h))


def save_responsive_webp(img: Image.Image, prefix: str, widths: list[int]) -> None:
    src_w, src_h = img.size
    for target_w in widths:
        if target_w > src_w:
            continue
        target_h = int(round(src_h * (target_w / src_w)))
        resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        out_path = OUT_DIR / f"{prefix}-{target_w}.webp"
        resized.save(out_path, format="WEBP", quality=80, method=6)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    SCRATCH_DIR.mkdir(parents=True, exist_ok=True)

    # DSC07498 (1).JPG — subject profile around 56% X
    about_src = ImageOps.exif_transpose(Image.open(ASSET_DIR / "DSC07498 (1).JPG")).convert("RGB")
    about_crop = crop_4_5(about_src, center_x_ratio=0.56)
    save_responsive_webp(about_crop, "about", [480, 720, 900])
    about_crop.resize((480, 600), Image.Resampling.LANCZOS).save(
        SCRATCH_DIR / "preview-about.jpg", format="JPEG", quality=85
    )

    # anime_Y2K-removebg-preview.png — trim top transparent padding and preserve alpha
    anime_path = ASSET_DIR / "anime_Y2K-removebg-preview.png"
    if anime_path.exists():
        anime_src = ImageOps.exif_transpose(Image.open(anime_path)).convert("RGBA")
        aw, ah = anime_src.size
        anime_crop = anime_src.crop((0, min(100, ah - 1), aw, ah))
        anime_crop.save(OUT_DIR / "hero-anime.webp", format="WEBP", quality=85, method=6)

    # INTEGRATIF.png — mobile app showcase screenshot (preserve alpha)
    integratif_path = ASSET_DIR / "INTEGRATIF.png"
    if integratif_path.exists():
        integratif_src = ImageOps.exif_transpose(Image.open(integratif_path)).convert("RGBA")
        integratif_src.save(OUT_DIR / "project-integratif.webp", format="WEBP", quality=85, method=6)

    # batikazrya.png — Azrya Batik AI web application screenshot (1917x1037 -> 1280x692 RGB)
    batik_path = ASSET_DIR / "batikazrya.png"
    if batik_path.exists():
        batik_src = ImageOps.exif_transpose(Image.open(batik_path)).convert("RGB")
        batik_resized = batik_src.resize((1280, 692), Image.Resampling.LANCZOS)
        batik_resized.save(OUT_DIR / "project-azrya-batik.webp", format="WEBP", quality=82, method=6)

    print("Optimized photos written to", OUT_DIR)


if __name__ == "__main__":
    main()
