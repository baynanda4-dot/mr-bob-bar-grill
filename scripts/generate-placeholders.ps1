# One-off generator for labeled placeholder images at every path the site
# already references in code. Run once, then delete the files (or leave
# them) as real photos get dragged in over the top with matching filenames.
Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot "..\public\images"

function New-Placeholder([string]$relativePath, [int]$width, [int]$height) {
    $fullPath = Join-Path $root $relativePath
    $dir = Split-Path $fullPath -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $bg = [System.Drawing.Color]::FromArgb(255, 20, 18, 15)
    $g.Clear($bg)

    $borderPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 212, 160, 23), 3)
    $inset = 8
    $g.DrawRectangle($borderPen, $inset, $inset, $width - ($inset * 2), $height - ($inset * 2))

    $gold = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 212, 160, 23))
    $white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 235, 235, 230))

    $labelSize = [Math]::Max(14, [Math]::Min($width, $height) / 18)
    $pathSize = [Math]::Max(12, [Math]::Min($width, $height) / 24)
    $dimSize = [Math]::Max(10, [Math]::Min($width, $height) / 30)

    $labelFont = [System.Drawing.Font]::new("Segoe UI", $labelSize, [System.Drawing.FontStyle]::Bold)
    $pathFont = [System.Drawing.Font]::new("Consolas", $pathSize, [System.Drawing.FontStyle]::Regular)
    $dimFont = [System.Drawing.Font]::new("Segoe UI", $dimSize, [System.Drawing.FontStyle]::Regular)

    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center

    $label = "PLACEHOLDER"
    $pathText = "images/$relativePath"
    $dimText = "${width} x ${height}"

    $cx = [single]($width / 2)
    $cy = [single]($height / 2)
    $g.DrawString($label, $labelFont, $gold, [System.Drawing.PointF]::new($cx, $cy - ($labelSize * 1.4)), $format)
    $g.DrawString($pathText, $pathFont, $white, [System.Drawing.PointF]::new($cx, $cy), $format)
    $g.DrawString($dimText, $dimFont, $gold, [System.Drawing.PointF]::new($cx, $cy + ($labelSize * 1.4)), $format)

    $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
    if ($ext -eq ".png") {
        $bmp.Save($fullPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
        $encParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, 85L)
        $bmp.Save($fullPath, $jpegCodec, $encParams)
    }

    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $relativePath"
}

# Full-bleed hero / background shots
$heroes = @(
    "about\hero.jpg", "contact\hero.jpg", "gallery\hero.jpg",
    "menu\food-hero.jpg", "menu\beverage-hero.jpg", "promotions\hero.jpg",
    "group-reservation\hero.jpg", "reservation\hero.jpg",
    "home\hero-1.jpg", "home\hero-2.jpg", "home\hero-3.jpg"
)
foreach ($p in $heroes) { New-Placeholder $p 1920 1280 }

# Card / feature images
$cards = @(
    "about\feature-1.jpg", "about\feature-2.jpg", "about\feature-3.jpg",
    "reservation\card.jpg", "home\shuttle.jpg", "home\wine-shop.jpg",
    "home\menu-food.jpg", "home\menu-beverage.jpg", "home\promotions.jpg",
    "home\live-music-friday.jpg"
)
foreach ($p in $cards) { New-Placeholder $p 1200 900 }

# Gallery grid (4 categories x 8 photos)
foreach ($category in @("dining", "food", "wine-bar", "live-music")) {
    for ($i = 1; $i -le 8; $i++) {
        New-Placeholder "gallery\$category-$i.jpg" 1200 1200
    }
}

# Instagram preview tiles (square) — missed in the original sweep
for ($i = 1; $i -le 6; $i++) { New-Placeholder "home\instagram-$i.jpg" 1200 1200 }

# Award / press badges
foreach ($p in @("home\ctrip.png", "home\tripadvisor.png")) { New-Placeholder $p 500 200 }

# Guest review avatars
for ($i = 1; $i -le 5; $i++) { New-Placeholder "home\review-$i.png" 300 300 }

# Social share image
New-Placeholder "shared\og-image.jpg" 1200 630

Write-Host "`nDone."
