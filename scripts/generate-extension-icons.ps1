Add-Type -AssemblyName System.Drawing

$iconDir = Join-Path $PSScriptRoot "..\extension\icons"
New-Item -ItemType Directory -Force -Path $iconDir | Out-Null

function New-RoundedRectPath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $Radius * 2
  $path.AddArc($X, $Y, $d, $d, 180, 90)
  $path.AddArc($X + $Width - $d, $Y, $d, $d, 270, 90)
  $path.AddArc($X + $Width - $d, $Y + $Height - $d, $d, $d, 0, 90)
  $path.AddArc($X, $Y + $Height - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Save-Icon {
  param([int]$Size, [string]$FileName)

  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)

  $bg = [System.Drawing.Color]::FromArgb(255, 10, 14, 20)
  $teal = [System.Drawing.Color]::FromArgb(255, 13, 148, 136)
  $mint = [System.Drawing.Color]::FromArgb(255, 94, 234, 212)
  $white = [System.Drawing.Color]::FromArgb(230, 255, 255, 255)

  $radius = [Math]::Max(3, [int]($Size * 0.22))
  $bgPath = New-RoundedRectPath 0 0 $Size $Size $radius
  $bgBrush = New-Object System.Drawing.SolidBrush $bg
  $g.FillPath($bgBrush, $bgPath)

  $pad = $Size * 0.16
  $inner = $Size - ($pad * 2)
  $innerRadius = [Math]::Max(2, [int]($inner * 0.22))
  $innerPath = New-RoundedRectPath $pad $pad $inner $inner $innerRadius
  $tealBrush = New-Object System.Drawing.SolidBrush $teal
  $g.FillPath($tealBrush, $innerPath)

  $penWidth = [single]([Math]::Max(1.25, $Size / 18))
  $pen = New-Object System.Drawing.Pen -ArgumentList @($white, $penWidth)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine(
    $pen,
    $pad + $inner * 0.18,
    $pad + $inner * 0.68,
    $pad + $inner * 0.82,
    $pad + $inner * 0.32
  )

  $dot = [Math]::Max(2, [int]($Size * 0.09))
  $mintBrush = New-Object System.Drawing.SolidBrush $mint
  $g.FillEllipse(
    $mintBrush,
    $pad + $inner * 0.5 - $dot / 2,
    $pad + $inner * 0.5 - $dot / 2,
    $dot,
    $dot
  )

  $path = Join-Path $iconDir $FileName
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

  $pen.Dispose()
  $bgBrush.Dispose()
  $tealBrush.Dispose()
  $mintBrush.Dispose()
  $bgPath.Dispose()
  $innerPath.Dispose()
  $g.Dispose()
  $bmp.Dispose()
}

Save-Icon 16 "icon16.png"
Save-Icon 32 "icon32.png"
Save-Icon 48 "icon48.png"
Save-Icon 128 "icon128.png"

Write-Output "Wrote icons to $iconDir"
