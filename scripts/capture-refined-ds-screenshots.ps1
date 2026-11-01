$artifactDir = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$npxCmd = (Get-Command npx.cmd -ErrorAction SilentlyContinue).Source
if (-not $npxCmd) { $npxCmd = "npx.cmd" }

Write-Host "Starting Next.js local server on port 3000..."
$serverProcess = Start-Process -FilePath $npxCmd -ArgumentList "next", "start", "-p", "3000" -WorkingDirectory "D:\royal-umrah-cabs" -PassThru -WindowStyle Hidden

try {
    Write-Host "Waiting for server to become responsive..."
    $serverReady = $false
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        try {
            $resp = Invoke-WebRequest -Uri "http://localhost:3000/en/design-system" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
            if ($resp.StatusCode -eq 200) {
                $serverReady = $true
                Write-Host "Server is ready! (StatusCode: 200)"
                break
            }
        } catch {
            Write-Host "Waiting for server... attempt $($i+1)"
        }
    }

    if (-not $serverReady) {
        throw "Next.js server failed to respond within 30 seconds."
    }

    $targets = @(
        @{ Name = "audit_ds_refined_1440.png"; Url = "http://localhost:3000/en/design-system"; Width = 1440; Height = 1200 },
        @{ Name = "audit_ds_refined_515.png"; Url = "http://localhost:3000/en/design-system"; Width = 515; Height = 1000 },
        @{ Name = "audit_ds_refined_390.png"; Url = "http://localhost:3000/en/design-system"; Width = 390; Height = 844 },
        @{ Name = "audit_ds_refined_ar_1440.png"; Url = "http://localhost:3000/ar/design-system"; Width = 1440; Height = 1200 },
        @{ Name = "audit_ds_refined_ar_390.png"; Url = "http://localhost:3000/ar/design-system"; Width = 390; Height = 844 }
    )

    foreach ($t in $targets) {
        $dest = Join-Path $artifactDir $t.Name
        Write-Host "Capturing $($t.Name) ($($t.Width)x$($t.Height)) from $($t.Url)..."
        $args = @(
            "--headless",
            "--no-sandbox",
            "--disable-gpu",
            "--window-size=$($t.Width),$($t.Height)",
            "--screenshot=$dest",
            $t.Url
        )
        $proc = Start-Process -FilePath $edgePath -ArgumentList $args -PassThru -Wait
        if (Test-Path $dest) {
            $size = (Get-Item $dest).Length
            Write-Host "Successfully captured: $dest ($size bytes)"
        } else {
            Write-Host "Failed to capture $dest"
        }
    }
} finally {
    Write-Host "Stopping Next.js server..."
    if ($serverProcess -and -not $serverProcess.HasExited) {
        Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
    }
    # Also kill any leftover node processes on port 3000
    Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {
        $conn = Get-NetTCPConnection -LocalPort 3000 -OwningProcess $_.Id -ErrorAction SilentlyContinue
        $null -ne $conn
    } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Cleanup completed."
}
