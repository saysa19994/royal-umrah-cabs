$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

$shots = @(
    # Core Responsive Viewports (AR & EN)
    @{ Name = "homepage_rebuild_ar_1440"; Url = "http://localhost:3000/ar"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_en_1440"; Url = "http://localhost:3000/en"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_ar_1024"; Url = "http://localhost:3000/ar"; W = 1024; H = 2000 },
    @{ Name = "homepage_rebuild_en_1024"; Url = "http://localhost:3000/en"; W = 1024; H = 2000 },
    @{ Name = "homepage_rebuild_ar_768";  Url = "http://localhost:3000/ar"; W = 768;  H = 2000 },
    @{ Name = "homepage_rebuild_en_768";  Url = "http://localhost:3000/en"; W = 768;  H = 2000 },
    @{ Name = "homepage_rebuild_ar_515";  Url = "http://localhost:3000/ar"; W = 515;  H = 1200 },
    @{ Name = "homepage_rebuild_en_515";  Url = "http://localhost:3000/en"; W = 515;  H = 1200 },
    @{ Name = "homepage_rebuild_ar_390";  Url = "http://localhost:3000/ar"; W = 390;  H = 1000 },
    @{ Name = "homepage_rebuild_en_390";  Url = "http://localhost:3000/en"; W = 390;  H = 1000 },
    @{ Name = "homepage_rebuild_ar_360";  Url = "http://localhost:3000/ar"; W = 360;  H = 1000 },
    @{ Name = "homepage_rebuild_en_360";  Url = "http://localhost:3000/en"; W = 360;  H = 1000 },

    # Remaining Locales (1440px)
    @{ Name = "homepage_rebuild_ms_1440"; Url = "http://localhost:3000/ms"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_id_1440"; Url = "http://localhost:3000/id"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_ur_1440"; Url = "http://localhost:3000/ur"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_fr_1440"; Url = "http://localhost:3000/fr"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_es_1440"; Url = "http://localhost:3000/es"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_de_1440"; Url = "http://localhost:3000/de"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_tr_1440"; Url = "http://localhost:3000/tr"; W = 1440; H = 2200 },
    @{ Name = "homepage_rebuild_hi_1440"; Url = "http://localhost:3000/hi"; W = 1440; H = 2200 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) ($($s.W)x$($s.H))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
}

Write-Host "All Homepage Rebuild screenshots successfully captured!"
