$ErrorActionPreference = 'Stop'

$Root = Resolve-Path (Join-Path $PSScriptRoot '..')
$RaycastRoot = Join-Path $Root 'raycast'
$Launcher = Join-Path $Root 'scripts\start-raycast-background.ps1'
$TaskName = 'Chatterbox Lite Raycast Background'
$UserId = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name

Push-Location $Root
try {
  bun run build
  bun run helper:build
} finally {
  Pop-Location
}

Push-Location $RaycastRoot
try {
  npm install
  npm run build
} finally {
  Pop-Location
}

$Action = New-ScheduledTaskAction `
  -Execute 'powershell.exe' `
  -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$Launcher`""
$Trigger = New-ScheduledTaskTrigger -AtLogOn -User $UserId
$Principal = New-ScheduledTaskPrincipal -UserId $UserId -LogonType Interactive -RunLevel Limited
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -ExecutionTimeLimit (New-TimeSpan -Hours 0)

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $Action `
  -Trigger $Trigger `
  -Principal $Principal `
  -Settings $Settings `
  -Force | Out-Null

Start-Process `
  -FilePath 'powershell.exe' `
  -ArgumentList @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-File', $Launcher) `
  -WorkingDirectory $Root `
  -WindowStyle Hidden | Out-Null

Write-Host "Installed and started: $TaskName"
