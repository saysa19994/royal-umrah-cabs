$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

$pages = @(
    @{ Name = "design_system_ar"; Url = "https://duyufalrahmanvip.com/ar/design-system" },
    @{ Name = "design_system_en"; Url = "https://duyufalrahmanvip.com/en/design-system" }
)

foreach ($p in $pages) {
    # 1440px Desktop
    $dest1440 = "$artifactDir\ds_screenshot_$($p.Name)_1440.png"
    Write-Host "Capturing 1440px: $($p.Url)..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--window-size=1440,1200", "--screenshot=$dest1440", $p.Url -Wait

    # 390px Mobile
    $dest390 = "$artifactDir\ds_screenshot_$($p.Name)_390.png"
    Write-Host "Capturing 390px: $($p.Url)..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--window-size=390,844", "--screenshot=$dest390", $p.Url -Wait
}

Write-Host "Design System screenshots captured successfully!"
