import json
import pathlib
import shutil
import pymupdf
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
CERT_SRC_DIR = ROOT / "asset" / "SERTIFIKAT"
CERT_IMG_OUT = ROOT / "src" / "assets" / "certificates"
CERT_PDF_OUT = ROOT / "public" / "certificates"
SCRATCH_DIR = pathlib.Path(
    r"C:\Users\Martrio\.gemini\antigravity\brain\5fb56fa3-e282-4cdb-8be5-9360e64b4017\scratch"
)

# 18 visual certificates (Asah letter is excluded for privacy; duplicate React Fundamental is skipped)
CERTIFICATE_SOURCES: dict[str, tuple[str, bool]] = {
    # Courses (Dicoding PDFs — copy to public/certificates)
    "dicoding-backend-js": ("Belajar Back-End Pemula dengan JavaScript.pdf", True),
    "dicoding-react-fundamental": ("Belajar Fundamental Aplikasi Web dengan React.pdf", True),
    "dicoding-frontend-pemula": ("FRONTEND.pdf", True),
    "dicoding-web-dasar": ("belajarDasarPemrogramanWeb.pdf", True),
    "dicoding-ai-dasar": ("belajar-dasarAI.pdf", True),
    "dicoding-git-github": ("sertifikat-git&github.pdf", True),
    "dicoding-memulai-pemrograman": ("sertifikat-memulaiDasarPemrograman.pdf", True),
    "dicoding-logika-pemrograman": ("sertifikat-pengenalanLogikaPemrograman.pdf", True),
    "dicoding-spec-driven-kiro": ("sertifikat-spec-driven-development.pdf", True),
    "dicoding-react-app": ("sertifikat_react.pdf", True),
    "dicoding-javascript-dasar": ("sertifikat_javaScript_Dicoding.pdf", True),
    # Programs
    "sic7-python": ("s-phyton.png", False),
    "sic7-iot": ("s-IoTsamsung.png", False),
    # Events
    "cloudcamp-pekanbaru-2026": ("s-cloudcamp.png", False),
    "panitia-asomatif-2025": ("s-asomatif2025.jpeg", False),
    # Awards
    "iot-simulation-terbaik": ("s-IoT2.jpeg", False),
    "juara-2-fotografi": ("s-fotografi2.jpeg", False),
    "mfd-terbaik-3": ("FMD.jpeg", False),
}


def render_pdf_page1(pdf_path: pathlib.Path) -> Image.Image:
    with pymupdf.open(pdf_path) as doc:
        page = doc[0]
        scale = 1600.0 / max(page.rect.width, 1.0)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
        return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def load_certificate_image(slug: str, src_path: pathlib.Path) -> Image.Image:
    if src_path.suffix.lower() == ".pdf":
        return render_pdf_page1(src_path)

    img = ImageOps.exif_transpose(Image.open(src_path)).convert("RGB")
    if slug == "mfd-terbaik-3":
        # Rotate 90 degrees CCW so text reads upright, then trim outer cloth margin conservatively
        img = img.rotate(90, expand=True)
        w, h = img.size
        img = img.crop((int(w * 0.03), int(h * 0.04), int(w * 0.97), int(h * 0.96)))
    return img


def resize_to_width(img: Image.Image, max_width: int) -> Image.Image:
    w, h = img.size
    if w <= max_width:
        return img
    new_h = int(round(h * (max_width / w)))
    return img.resize((max_width, new_h), Image.Resampling.LANCZOS)


def main() -> None:
    CERT_IMG_OUT.mkdir(parents=True, exist_ok=True)
    CERT_PDF_OUT.mkdir(parents=True, exist_ok=True)
    SCRATCH_DIR.mkdir(parents=True, exist_ok=True)

    manifest: dict[str, dict[str, dict[str, int]]] = {}

    for slug, (rel_file, copy_pdf) in CERTIFICATE_SOURCES.items():
        src_path = CERT_SRC_DIR / rel_file
        if not src_path.exists():
            raise FileNotFoundError(f"Missing certificate source: {src_path}")

        base_img = load_certificate_image(slug, src_path)
        full_img = resize_to_width(base_img, 1600)
        thumb_img = resize_to_width(base_img, 480)

        full_path = CERT_IMG_OUT / f"{slug}-full.webp"
        thumb_path = CERT_IMG_OUT / f"{slug}-thumb.webp"

        full_img.save(full_path, format="WEBP", quality=80, method=6)
        thumb_img.save(thumb_path, format="WEBP", quality=70, method=6)

        if slug == "mfd-terbaik-3":
            thumb_img.save(SCRATCH_DIR / "preview-mfd.jpg", format="JPEG", quality=85)

        if copy_pdf and src_path.suffix.lower() == ".pdf":
            shutil.copy2(src_path, CERT_PDF_OUT / f"{slug}.pdf")

        manifest[slug] = {
            "thumb": {"w": thumb_img.width, "h": thumb_img.height},
            "full": {"w": full_img.width, "h": full_img.height},
        }

    manifest_path = CERT_IMG_OUT / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {len(manifest)} certificate image pairs into {CERT_IMG_OUT}")


if __name__ == "__main__":
    main()
