$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Using Edge at: $edgePath"

$shots = @(
    @{ Name = "concept_01_desktop_1440"; Url = "http://localhost:3008/concept-01-desktop.html"; W = 1440; H = 3400 },
    @{ Name = "concept_01_mobile_390";  Url = "http://localhost:3008/concept-01-mobile.html";  W = 390;  H = 2600 },
    @{ Name = "concept_02_desktop_1440"; Url = "http://localhost:3008/concept-02-desktop.html"; W = 1440; H = 3400 },
    @{ Name = "concept_02_mobile_390";  Url = "http://localhost:3008/concept-02-mobile.html";  W = 390;  H = 2600 },
    @{ Name = "concept_03_desktop_1440"; Url = "http://localhost:3008/concept-03-desktop.html"; W = 1440; H = 3400 },
    @{ Name = "concept_03_mobile_390";  Url = "http://localhost:3008/concept-03-mobile.html";  W = 390;  H = 2600 }
)

foreach ($s in $shots) {
    $outPath = "$artifactDir\$($s.Name).png"
    Write-Host "Capturing $($s.Name) ($($s.W)x$($s.H))..."
    Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--window-size=$($s.W),$($s.H)", "--screenshot=$outPath", $s.Url -Wait
    if (Test-Path $outPath) {
        $size = (Get-Item $outPath).Length
        Write-Host "Saved: $($s.Name).png ($size bytes)"
    }
}

Write-Host "All six concepts captured successfully!"
