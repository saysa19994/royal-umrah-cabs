$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

$pages = @(
    @{ Name = "home_ar"; Url = "https://duyufalrahmanvip.com/ar" },
    @{ Name = "home_en"; Url = "https://duyufalrahmanvip.com/en" },
    @{ Name = "pricing_en"; Url = "https://duyufalrahmanvip.com/en/pricing" },
    @{ Name = "booking_en"; Url = "https://duyufalrahmanvip.com/en/booking" },
    @{ Name = "fleet_en"; Url = "https://duyufalrahmanvip.com/en/fleet" },
    @{ Name = "ziyarat_ar"; Url = "https://duyufalrahmanvip.com/ar/ziyarat" }
)

foreach ($p in $pages) {
    # 1440px Desktop
    $dest1440 = "$artifactDir\audit_screenshot_$($p.Name)_1440.png"
    Write-Host "Capturing 1440px: $($p.Url)..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--window-size=1440,1080", "--screenshot=$dest1440", $p.Url -Wait

    # 390px Mobile
    $dest390 = "$artifactDir\audit_screenshot_$($p.Name)_390.png"
    Write-Host "Capturing 390px: $($p.Url)..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--window-size=390,844", "--screenshot=$dest390", $p.Url -Wait
}

Write-Host "All screenshots captured successfully!"
