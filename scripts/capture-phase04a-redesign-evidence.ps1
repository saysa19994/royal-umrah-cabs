$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

$shots = @(
    # 1. Desktop 1440px
    @{ Name = "pricing_redesign_ar_1440"; Url = "http://localhost:3000/ar/pricing"; W = 1440; H = 1800 },
    @{ Name = "pricing_redesign_en_1440"; Url = "http://localhost:3000/en/pricing"; W = 1440; H = 1800 },

    # 2. Laptop 1024px
    @{ Name = "pricing_redesign_ar_1024"; Url = "http://localhost:3000/ar/pricing"; W = 1024; H = 1800 },
    @{ Name = "pricing_redesign_en_1024"; Url = "http://localhost:3000/en/pricing"; W = 1024; H = 1800 },

    # 3. Tablet 768px
    @{ Name = "pricing_redesign_ar_768";  Url = "http://localhost:3000/ar/pricing"; W = 768;  H = 1800 },
    @{ Name = "pricing_redesign_en_768";  Url = "http://localhost:3000/en/pricing"; W = 768;  H = 1800 },

    # 4. Mobile 515px
    @{ Name = "pricing_redesign_ar_515";  Url = "http://localhost:3000/ar/pricing"; W = 515;  H = 1200 },
    @{ Name = "pricing_redesign_en_515";  Url = "http://localhost:3000/en/pricing"; W = 515;  H = 1200 },

    # 5. Mobile 390px (iPhone 14/15/16)
    @{ Name = "pricing_redesign_ar_390";  Url = "http://localhost:3000/ar/pricing"; W = 390;  H = 1000 },
    @{ Name = "pricing_redesign_en_390";  Url = "http://localhost:3000/en/pricing"; W = 390;  H = 1000 },

    # 6. Small Mobile 360px
    @{ Name = "pricing_redesign_ar_360";  Url = "http://localhost:3000/ar/pricing"; W = 360;  H = 1000 },
    @{ Name = "pricing_redesign_en_360";  Url = "http://localhost:3000/en/pricing"; W = 360;  H = 1000 },

    # 7. Route Selection, Vehicle Comparison & Booking Transition
    @{ Name = "pricing_redesign_route_selection"; Url = "http://localhost:3000/ar/pricing#routes"; W = 1440; H = 1200 },
    @{ Name = "pricing_redesign_vehicle_comparison"; Url = "http://localhost:3000/ar/pricing#fleet"; W = 1440; H = 1400 },
    @{ Name = "pricing_redesign_booking_transition"; Url = "http://localhost:3000/ar/booking?route=makkah-to-madinah&vehicle=yukon"; W = 1440; H = 1200 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) ($($s.W)x$($s.H))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
}

Write-Host "All redesigned Phase 04A screenshots successfully captured!"
