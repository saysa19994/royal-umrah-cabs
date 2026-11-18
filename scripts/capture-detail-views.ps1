$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

# Capture scrolled view of Yukon focusing on gallery & route pricing
$destGallery = "$artifactDir\vehicle_yukon_gallery_1440.png"
Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,2400", "--screenshot=$destGallery", "http://localhost:3000/en/fleet/gmc-yukon-xl" -Wait

# Capture Staria details and route pricing
$destStariaFull = "$artifactDir\vehicle_staria_full_1440.png"
Start-Process -FilePath $edgePath -ArgumentList "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,2400", "--screenshot=$destStariaFull", "http://localhost:3000/ar/fleet/hyundai-staria" -Wait

Write-Host "Gallery and full details captured successfully!"
