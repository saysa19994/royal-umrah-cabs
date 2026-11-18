$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

# 1. Main Responsive fleet screenshots
$shots = @(
    @{ Name = "fleet_en_1440"; Url = "http://localhost:3000/en/fleet"; W = 1440; H = 1800 },
    @{ Name = "fleet_en_390";  Url = "http://localhost:3000/en/fleet"; W = 390;  H = 844 },
    @{ Name = "fleet_en_515";  Url = "http://localhost:3000/en/fleet"; W = 515;  H = 900 },
    @{ Name = "fleet_ar_1440"; Url = "http://localhost:3000/ar/fleet"; W = 1440; H = 1800 },
    @{ Name = "fleet_ar_390";  Url = "http://localhost:3000/ar/fleet"; W = 390;  H = 844 },

    # Individual vehicle detail pages
    @{ Name = "vehicle_yukon_en_1440";   Url = "http://localhost:3000/en/fleet/gmc-yukon-xl";     W = 1440; H = 1600 },
    @{ Name = "vehicle_staria_ar_1440";  Url = "http://localhost:3000/ar/fleet/hyundai-staria";   W = 1440; H = 1600 },
    @{ Name = "vehicle_camry_en_1440";   Url = "http://localhost:3000/en/fleet/toyota-camry";     W = 1440; H = 1600 },
    @{ Name = "vehicle_maybach_ar_1440"; Url = "http://localhost:3000/ar/fleet/mercedes-maybach"; W = 1440; H = 1600 },

    # Booking integration
    @{ Name = "booking_connected_yukon_1440"; Url = "http://localhost:3000/en/booking?vehicle=yukon&route=jeddah-airport-to-makkah"; W = 1440; H = 1400 },

    # All 10 locales
    @{ Name = "fleet_ms_1440"; Url = "http://localhost:3000/ms/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_id_1440"; Url = "http://localhost:3000/id/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_ur_1440"; Url = "http://localhost:3000/ur/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_fr_1440"; Url = "http://localhost:3000/fr/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_es_1440"; Url = "http://localhost:3000/es/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_de_1440"; Url = "http://localhost:3000/de/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_hi_1440"; Url = "http://localhost:3000/hi/fleet"; W = 1440; H = 1600 },
    @{ Name = "fleet_tr_1440"; Url = "http://localhost:3000/tr/fleet"; W = 1440; H = 1600 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) at $($s.W)x$($s.H) ($($s.Url))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
}

Write-Host "All Phase 03 screenshots captured successfully!"
