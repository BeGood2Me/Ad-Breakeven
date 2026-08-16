Add-Type -AssemblyName System.Drawing

$outDir = "C:\Users\seand\Downloads\Ad Breakeven"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$fmt24 = [System.Drawing.Imaging.PixelFormat]::Format24bppRgb

$cBg = [System.Drawing.Color]::FromArgb(10, 14, 20)
$cSurface = [System.Drawing.Color]::FromArgb(18, 24, 33)
$cBorder = [System.Drawing.Color]::FromArgb(36, 48, 65)
$cMuted = [System.Drawing.Color]::FromArgb(139, 151, 171)
$cText = [System.Drawing.Color]::FromArgb(232, 238, 246)
$cTeal = [System.Drawing.Color]::FromArgb(13, 148, 136)
$cMint = [System.Drawing.Color]::FromArgb(94, 234, 212)
$cLink = [System.Drawing.Color]::FromArgb(45, 212, 191)
$cChrome = [System.Drawing.Color]::FromArgb(22, 28, 38)
$cWhite = [System.Drawing.Color]::FromArgb(255, 255, 255)

function New-RoundPath([float]$X, [float]$Y, [float]$W, [float]$H, [float]$R) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = [Math]::Min($R * 2, [Math]::Min($W, $H))
  $path.AddArc($X, $Y, $d, $d, 180, 90)
  $path.AddArc($X + $W - $d, $Y, $d, $d, 270, 90)
  $path.AddArc($X + $W - $d, $Y + $H - $d, $d, $d, 0, 90)
  $path.AddArc($X, $Y + $H - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-Round($g, $color, $x, $y, $w, $h, $r) {
  $path = New-RoundPath $x $y $w $h $r
  $brush = New-Object System.Drawing.SolidBrush $color
  $g.FillPath($brush, $path)
  $brush.Dispose()
  $path.Dispose()
}

function Stroke-Round($g, $color, $x, $y, $w, $h, $r, $width) {
  $path = New-RoundPath $x $y $w $h $r
  $pen = New-Object System.Drawing.Pen -ArgumentList @($color, [single]$width)
  $g.DrawPath($pen, $path)
  $pen.Dispose()
  $path.Dispose()
}

function New-Gfx($w, $h, $fill) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h, $fmt24
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.PageUnit = [System.Drawing.GraphicsUnit]::Pixel
  $g.Clear($fill)
  return @{ Bmp = $bmp; G = $g }
}

function Save-Png($bmp, $name) {
  $path = Join-Path $outDir $name
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output $path
}

function Draw-Icon($g, $x, $y, $size) {
  Fill-Round $g $cBg $x $y $size $size ($size * 0.22)
  $pad = $size * 0.16
  Fill-Round $g $cTeal ($x + $pad) ($y + $pad) ($size - 2 * $pad) ($size - 2 * $pad) (($size - 2 * $pad) * 0.22)
  $penW = [Math]::Max(1.5, $size / 16)
  $pen = New-Object System.Drawing.Pen -ArgumentList @($cWhite, [single]$penW)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine(
    $pen,
    $x + $pad + ($size - 2 * $pad) * 0.18,
    $y + $pad + ($size - 2 * $pad) * 0.68,
    $x + $pad + ($size - 2 * $pad) * 0.82,
    $y + $pad + ($size - 2 * $pad) * 0.32
  )
  $pen.Dispose()
  $dot = [Math]::Max(3, [int]($size * 0.09))
  $brush = New-Object System.Drawing.SolidBrush $cMint
  $g.FillEllipse(
    $brush,
    $x + $size / 2 - $dot / 2,
    $y + $size / 2 - $dot / 2,
    $dot,
    $dot
  )
  $brush.Dispose()
}

function Draw-Field($g, $x, $y, $w, $label, $value, $fontLabel, $fontInput) {
  $bMuted = New-Object System.Drawing.SolidBrush $cMuted
  $bText = New-Object System.Drawing.SolidBrush $cText
  $g.DrawString($label, $fontLabel, $bMuted, (New-Object System.Drawing.RectangleF ($x, $y, $w, 18)))
  Fill-Round $g $cSurface $x ($y + 22) $w 36 6
  Stroke-Round $g $cBorder $x ($y + 22) $w 36 6 1
  $g.DrawString($value, $fontInput, $bText, $x + 10, $y + 28)
  $bMuted.Dispose()
  $bText.Dispose()
}

function Draw-Result($g, $x, $y, $w, $label, $value, $fontLabel, $fontValue) {
  Fill-Round $g $cSurface $x $y $w 48 6
  Stroke-Round $g $cBorder $x $y $w 48 6 1
  $bMuted = New-Object System.Drawing.SolidBrush $cMuted
  $bMint = New-Object System.Drawing.SolidBrush $cMint
  $g.DrawString($label, $fontLabel, $bMuted, $x + 12, $y + 14)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Far
  $g.DrawString($value, $fontValue, $bMint, (New-Object System.Drawing.RectangleF ($x, ($y + 8), ($w - 12), 36)), $sf)
  $sf.Dispose()
  $bMuted.Dispose()
  $bMint.Dispose()
}

function Draw-Popup($g, $x, $y, $w) {
  $h = 520
  Fill-Round $g $cBg $x $y $w $h 14
  Stroke-Round $g $cBorder $x $y $w $h 14 1

  Draw-Icon $g ($x + 18) ($y + 16) 32
  $bText = New-Object System.Drawing.SolidBrush $cText
  $bMuted = New-Object System.Drawing.SolidBrush $cMuted
  $bLink = New-Object System.Drawing.SolidBrush $cLink
  $fontTitle = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fontSmall = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $fontLabel = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fontInput = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $fontValue = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fontBtn = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

  $g.DrawString("Ad Breakeven", $fontTitle, $bText, $x + 58, $y + 16)
  $g.DrawString("Margin floors for ROAS, CPA, and CPC", $fontSmall, $bMuted, $x + 58, $y + 36)

  $col = ($w - 48) / 2
  $gap = 12
  Draw-Field $g ($x + 18) ($y + 70) $col "AOV (`$)" "100" $fontLabel $fontInput
  Draw-Field $g ($x + 18 + $col + $gap) ($y + 70) $col "Gross margin (%)" "50" $fontLabel $fontInput
  Draw-Field $g ($x + 18) ($y + 140) $col "Fixed cost / order (`$)" "0" $fontLabel $fontInput
  Draw-Field $g ($x + 18 + $col + $gap) ($y + 140) $col "Conversion rate (%)" "2" $fontLabel $fontInput

  Draw-Result $g ($x + 18) ($y + 218) ($w - 36) "Break-even ROAS" "2.00x" $fontLabel $fontValue
  Draw-Result $g ($x + 18) ($y + 274) ($w - 36) "Max CPA" "`$50.00" $fontLabel $fontValue
  Draw-Result $g ($x + 18) ($y + 330) ($w - 36) "Max CPC" "`$1.00" $fontLabel $fontValue

  $btnW = ($w - 48) / 3
  foreach ($item in @(
      @{ T = "Example"; I = 0 },
      @{ T = "Copy"; I = 1 },
      @{ T = "Reset"; I = 2 }
    )) {
    $bx = $x + 18 + $item.I * ($btnW + 6)
    Fill-Round $g $cSurface $bx ($y + 392) $btnW 32 6
    Stroke-Round $g $cBorder $bx ($y + 392) $btnW 32 6 1
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($item.T, $fontBtn, $bText, (New-Object System.Drawing.RectangleF ($bx, ($y + 397), $btnW, 24)), $sf)
    $sf.Dispose()
  }

  $g.DrawString("ROAS calculator     Max CPA     Max CPC", $fontSmall, $bLink, $x + 18, $y + 442)
  $g.DrawString("adbreakeven.com  |  Privacy", $fontSmall, $bMuted, $x + 18, $y + 470)

  $fontTitle.Dispose(); $fontSmall.Dispose(); $fontLabel.Dispose()
  $fontInput.Dispose(); $fontValue.Dispose(); $fontBtn.Dispose()
  $bText.Dispose(); $bMuted.Dispose(); $bLink.Dispose()
  return $h
}

function Draw-BrowserChrome($g, $w) {
  $g.FillRectangle((New-Object System.Drawing.SolidBrush $cChrome), 0, 0, $w, 56)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush $cBorder), 0, 56, $w, 1)
  $dots = @([System.Drawing.Color]::FromArgb(255, 95, 86), [System.Drawing.Color]::FromArgb(255, 189, 46), [System.Drawing.Color]::FromArgb(39, 201, 63))
  $i = 0
  foreach ($d in $dots) {
    $br = New-Object System.Drawing.SolidBrush $d
    $g.FillEllipse($br, 16 + $i * 18, 20, 12, 12)
    $br.Dispose()
    $i++
  }
  Fill-Round $g $cSurface 90 14 ($w - 160) 28 8
  $bMuted = New-Object System.Drawing.SolidBrush $cMuted
  $font = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString("ads.google.com/aw/overview", $font, $bMuted, 104, 18)
  $font.Dispose()
  $bMuted.Dispose()
  Draw-Icon $g ($w - 52) 12 32
}

# --- Store icon 128x128 ---
$icon = New-Gfx 128 128 $cBg
Draw-Icon $icon.G 0 0 128
Save-Png $icon.Bmp "store-icon-128.png"
$icon.G.Dispose(); $icon.Bmp.Dispose()

# --- Screenshot 1: popup in a browser ---
$s1 = New-Gfx 1280 800 $cBg
Draw-BrowserChrome $s1.G 1280
$s1.G.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(16, 22, 31))), 0, 57, 1280, 743)
Draw-Popup $s1.G 430 110 420 | Out-Null
Save-Png $s1.Bmp "screenshot-1-popup.png"
$s1.G.Dispose(); $s1.Bmp.Dispose()

# --- Screenshot 2: zoomed results ---
$s2 = New-Gfx 1280 800 $cBg
$bText = New-Object System.Drawing.SolidBrush $cText
$bMuted = New-Object System.Drawing.SolidBrush $cMuted
$fontH = New-Object System.Drawing.Font("Segoe UI", 36, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontS = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$s2.G.DrawString("Your bid floors, instantly", $fontH, $bText, 80, 70)
$s2.G.DrawString("Same contribution-margin math as adbreakeven.com", $fontS, $bMuted, 80, 118)
$fontH.Dispose(); $fontS.Dispose(); $bText.Dispose(); $bMuted.Dispose()

$cards = @(
  @{ L = "Break-even ROAS"; V = "2.00x"; X = 80 },
  @{ L = "Max CPA"; V = "`$50.00"; X = 460 },
  @{ L = "Max CPC"; V = "`$1.00"; X = 840 }
)
$fontL = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontV = New-Object System.Drawing.Font("Segoe UI", 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontN = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
foreach ($c in $cards) {
  Fill-Round $s2.G $cSurface $c.X 220 360 220 16
  Stroke-Round $s2.G $cBorder $c.X 220 360 220 16 1
  $bm = New-Object System.Drawing.SolidBrush $cMuted
  $bi = New-Object System.Drawing.SolidBrush $cMint
  $s2.G.DrawString($c.L, $fontL, $bm, ($c.X + 28), 250)
  $s2.G.DrawString($c.V, $fontV, $bi, ($c.X + 28), 300)
  $bm.Dispose(); $bi.Dispose()
}
$note = New-Object System.Drawing.SolidBrush $cMuted
$s2.G.DrawString("Example: `$100 AOV  |  50% margin  |  2% conversion rate", $fontN, $note, 80, 500)
$s2.G.DrawString("Inputs stay on this device. No account. No tracking.", $fontN, $note, 80, 530)
$note.Dispose(); $fontL.Dispose(); $fontV.Dispose(); $fontN.Dispose()
Save-Png $s2.Bmp "screenshot-2-results.png"
$s2.G.Dispose(); $s2.Bmp.Dispose()

# --- Screenshot 3: how it works ---
$s3 = New-Gfx 1280 800 $cBg
$bText = New-Object System.Drawing.SolidBrush $cText
$bMuted = New-Object System.Drawing.SolidBrush $cMuted
$fontH = New-Object System.Drawing.Font("Segoe UI", 36, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$s3.G.DrawString("How it works", $fontH, $bText, 80, 60)
$fontH.Dispose()
$steps = @(
  @{ N = "1"; T = "Enter margin"; D = "AOV, gross margin %, optional per-order cost." },
  @{ N = "2"; T = "Get your floors"; D = "Break-even ROAS and max CPA update as you type." },
  @{ N = "3"; T = "Add conversion rate"; D = "Optional. Turns max CPA into a max CPC bid cap." },
  @{ N = "4"; T = "Copy into Ads"; D = "Paste floors into Google Ads or Meta bid settings." }
)
$fontN = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontT = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontD = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$i = 0
foreach ($st in $steps) {
  $row = [Math]::Floor($i / 2)
  $col = $i % 2
  $x = 80 + $col * 580
  $y = 150 + $row * 260
  Fill-Round $s3.G $cSurface $x $y 540 220 16
  Stroke-Round $s3.G $cBorder $x $y 540 220 16 1
  Fill-Round $s3.G $cTeal ($x + 28) ($y + 32) 44 44 10
  $bw = New-Object System.Drawing.SolidBrush $cWhite
  $s3.G.DrawString($st.N, $fontN, $bw, ($x + 42), ($y + 38))
  $s3.G.DrawString($st.T, $fontT, $bText, ($x + 88), ($y + 38))
  $s3.G.DrawString($st.D, $fontD, $bMuted, (New-Object System.Drawing.RectangleF (($x + 28), ($y + 100), 480, 90)))
  $bw.Dispose()
  $i++
}
$fontN.Dispose(); $fontT.Dispose(); $fontD.Dispose()
$bText.Dispose(); $bMuted.Dispose()
Save-Png $s3.Bmp "screenshot-3-how-it-works.png"
$s3.G.Dispose(); $s3.Bmp.Dispose()

# --- Small promo 440x280 ---
$sp = New-Gfx 440 280 $cBg
Draw-Icon $sp.G 28 36 64
$bText = New-Object System.Drawing.SolidBrush $cText
$bMint = New-Object System.Drawing.SolidBrush $cMint
$bMuted = New-Object System.Drawing.SolidBrush $cMuted
$f1 = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$f2 = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$sp.G.DrawString("Ad Breakeven", $f1, $bText, 108, 44)
$sp.G.DrawString("Break-even ROAS in a popup", $f2, $bMint, 28, 128)
$sp.G.DrawString("Max CPA  |  Max CPC  |  No account", $f2, $bMuted, 28, 168)
$f1.Dispose(); $f2.Dispose(); $bText.Dispose(); $bMint.Dispose(); $bMuted.Dispose()
Save-Png $sp.Bmp "small-promo-440x280.png"
$sp.G.Dispose(); $sp.Bmp.Dispose()

# --- Marquee 1400x560 ---
$mq = New-Gfx 1400 560 $cBg
Draw-Icon $mq.G 72 80 88
$bText = New-Object System.Drawing.SolidBrush $cText
$bMint = New-Object System.Drawing.SolidBrush $cMint
$bMuted = New-Object System.Drawing.SolidBrush $cMuted
$f1 = New-Object System.Drawing.Font("Segoe UI", 54, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$f2 = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$mq.G.DrawString("Ad Breakeven", $f1, $bText, 180, 92)
$mq.G.DrawString("Break-even ROAS, max CPA, and max CPC", $f2, $bMint, 72, 200)
$mq.G.DrawString("from your margin - while you plan bids.", $f2, $bMuted, 72, 240)
$mq.G.DrawString("Free  |  Local storage only  |  No account", $f2, $bMuted, 72, 320)
$f1.Dispose(); $f2.Dispose(); $bText.Dispose(); $bMint.Dispose(); $bMuted.Dispose()
Draw-Popup $mq.G 880 40 460 | Out-Null
Save-Png $mq.Bmp "marquee-1400x560.png"
$mq.G.Dispose(); $mq.Bmp.Dispose()

Write-Output "Done: $outDir"
