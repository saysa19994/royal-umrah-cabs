$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

$shots = @(
    # 1. Arabic & English Responsive Viewports
    @{ Name = "pricing_phase04a_ar_1440"; Url = "http://localhost:3000/ar/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_phase04a_ar_390";  Url = "http://localhost:3000/ar/pricing"; W = 390;  H = 844 },
    @{ Name = "pricing_phase04a_ar_515";  Url = "http://localhost:3000/ar/pricing"; W = 515;  H = 900 },
    @{ Name = "pricing_phase04a_en_1440"; Url = "http://localhost:3000/en/pricing"; W = 1440; H = 1600 },
    @{ Name = "pricing_phase04a_en_390";  Url = "http://localhost:3000/en/pricing"; W = 390;  H = 844 },

    # 2. Ten Locales Verification at 1440px
    @{ Name = "pricing_phase04a_ms_1440"; Url = "http://localhost:3000/ms/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_id_1440"; Url = "http://localhost:3000/id/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_ur_1440"; Url = "http://localhost:3000/ur/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_fr_1440"; Url = "http://localhost:3000/fr/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_es_1440"; Url = "http://localhost:3000/es/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_de_1440"; Url = "http://localhost:3000/de/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_tr_1440"; Url = "http://localhost:3000/tr/pricing"; W = 1440; H = 1500 },
    @{ Name = "pricing_phase04a_hi_1440"; Url = "http://localhost:3000/hi/pricing"; W = 1440; H = 1500 },

    # 3. Ziyarat Tour Verification
    @{ Name = "ziyarat_phase04a_makkah_tour";  Url = "http://localhost:3000/ar/ziyarat/tours/makkah-2-5h";     W = 1440; H = 1500 },
    @{ Name = "ziyarat_phase04a_madinah_tour"; Url = "http://localhost:3000/ar/ziyarat/tours/madinah-half-day"; W = 1440; H = 1500 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) ($($s.W)x$($s.H))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
}

Write-Host "All Phase 04A screenshots successfully captured!"
