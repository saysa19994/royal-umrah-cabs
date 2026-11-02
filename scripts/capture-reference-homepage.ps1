$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

$shots = @(
    # Primary Deliverables Requested
    @{ Name = "homepage_reference_ar_1440"; Url = "http://localhost:3000/ar"; W = 1440; H = 3400 },
    @{ Name = "homepage_reference_en_1440"; Url = "http://localhost:3000/en"; W = 1440; H = 3400 },
    @{ Name = "homepage_reference_ar_390";  Url = "http://localhost:3000/ar"; W = 390;  H = 4600 },
    @{ Name = "homepage_reference_en_390";  Url = "http://localhost:3000/en"; W = 390;  H = 4600 },
    
    # Standard Viewports for Reference
    @{ Name = "homepage_reference_ar_desktop_fold"; Url = "http://localhost:3000/ar"; W = 1440; H = 900 },
    @{ Name = "homepage_reference_en_desktop_fold"; Url = "http://localhost:3000/en"; W = 1440; H = 900 },
    @{ Name = "homepage_reference_ar_mobile_fold";  Url = "http://localhost:3000/ar"; W = 390;  H = 844 },
    @{ Name = "homepage_reference_en_mobile_fold";  Url = "http://localhost:3000/en"; W = 390;  H = 844 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) ($($s.W)x$($s.H))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
}

Write-Host "All Reference Homepage screenshots captured successfully!"
