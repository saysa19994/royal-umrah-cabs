$ErrorActionPreference = "Stop"

$projectDir = "D:\royal-umrah-cabs"
$artifactZip = "C:\Users\PC\.gemini\antigravity\brain\b85e6102-b6eb-4565-9493-6e009226675e\royal-umrah-cabs-source-archive.zip"
$localZip = "D:\royal-umrah-cabs\royal-umrah-cabs-source-archive.zip"

Write-Host "Starting archive creation..."
Set-Location $projectDir

# Items to include explicitly
$items = @(
  "src",
  "public",
  "scripts",
  "supabase",
  "docs",
  "baseline",
  "blueprint-reference",
  "design-concepts",
  "homepage-design-reference",
  "package.json",
  "package-lock.json",
  "next.config.mjs",
  "tsconfig.json",
  "tailwind.config.ts",
  "postcss.config.js",
  "vercel.json",
  ".vercelignore",
  ".gitignore",
  "next-env.d.ts",
  "README.md",
  "llms.txt",
  "llms-full.txt",
  "SOURCE_MANIFEST.md"
)

# Filter items that actually exist
$existingItems = $items | Where-Object { Test-Path $_ }

Write-Host "Creating zip archive using tar.exe..."
& tar.exe -a -c -f $artifactZip `
  --exclude "node_modules" `
  --exclude ".next" `
  --exclude ".git" `
  --exclude ".vercel" `
  --exclude ".env*" `
  --exclude "*.tsbuildinfo" `
  --exclude "*.zip" `
  $existingItems

if (Test-Path $artifactZip) {
  $fileInfo = Get-Item $artifactZip
  $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
  Write-Host "Artifact zip created successfully: $artifactZip ($sizeMB MB)"
  
  # Also copy to local workspace root for convenience
  Copy-Item -Path $artifactZip -Destination $localZip -Force
  Write-Host "Copied to workspace: $localZip"
} else {
  Write-Error "Failed to create archive zip file!"
}
