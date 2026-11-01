$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

$shots = @(
    # Pricing Page in Arabic & English (Desktop 1440 & Mobile 390)
    @{ Name = "pricing_ar_1440"; Url = "http://localhost:3000/ar/pricing"; W = 1440; H = 2000 },
    @{ Name = "pricing_ar_390";  Url = "http://localhost:3000/ar/pricing"; W = 390;  H = 900 },
    @{ Name = "pricing_en_1440"; Url = "http://localhost:3000/en/pricing"; W = 1440; H = 2000 },
    @{ Name = "pricing_en_390";  Url = "http://localhost:3000/en/pricing"; W = 390;  H = 900 },

    # Routes Page in Arabic & English
    @{ Name = "routes_ar_1440"; Url = "http://localhost:3000/ar/routes"; W = 1440; H = 2200 },
    @{ Name = "routes_ar_390";  Url = "http://localhost:3000/ar/routes"; W = 390;  H = 900 },
    @{ Name = "routes_en_1440"; Url = "http://localhost:3000/en/routes"; W = 1440; H = 2200 },

    # Route Detail Pages
    @{ Name = "route_detail_makkah_madinah_ar"; Url = "http://localhost:3000/ar/routes/makkah-to-madinah"; W = 1440; H = 2000 },
    @{ Name = "route_detail_jeddah_makkah_en";   Url = "http://localhost:3000/en/routes/jeddah-airport-to-makkah"; W = 1440; H = 2000 },

    # Ziyarat Hub & Detailed Tours
    @{ Name = "ziyarat_hub_ar_1440"; Url = "http://localhost:3000/ar/ziyarat"; W = 1440; H = 2200 },
    @{ Name = "ziyarat_hub_en_1440"; Url = "http://localhost:3000/en/ziyarat"; W = 1440; H = 2200 },
    @{ Name = "ziyarat_makkah_tour_2_5h"; Url = "http://localhost:3000/ar/ziyarat/tours/makkah-half-day"; W = 1440; H = 1800 },
    @{ Name = "ziyarat_madinah_tour_noduration"; Url = "http://localhost:3000/ar/ziyarat/tours/madinah-half-day"; W = 1440; H = 1800 },

    # 10-Locale Representative Views for Pricing
    @{ Name = "pricing_ms_1440"; Url = "http://localhost:3000/ms/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_id_1440"; Url = "http://localhost:3000/id/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_ur_1440"; Url = "http://localhost:3000/ur/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_fr_1440"; Url = "http://localhost:3000/fr/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_es_1440"; Url = "http://localhost:3000/es/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_de_1440"; Url = "http://localhost:3000/de/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_tr_1440"; Url = "http://localhost:3000/tr/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_hi_1440"; Url = "http://localhost:3000/hi/pricing"; W = 1440; H = 1600 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) at $($s.W)x$($s.H) ($($s.Url))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
}

Write-Host "All Phase 04 visual screenshots captured successfully!"
