$ErrorActionPreference = 'Stop'

$Root = Resolve-Path (Join-Path $PSScriptRoot '..')
$RaycastRoot = Join-Path $Root 'raycast'
$LogDir = Join-Path $Root 'logs'
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Test-ProcessCommandLineAll {
  param([string[]] $Patterns)

  return [bool] (
    Get-CimInstance Win32_Process |
      Where-Object {
        $commandLine = $_.CommandLine
        if (!$commandLine) {
          return $false
        }

        foreach ($pattern in $Patterns) {
          if ($commandLine -notlike "*$pattern*") {
            return $false
          }
        }

        return $true
      } |
      Select-Object -First 1
  )
}

function Start-HiddenProcess {
  param(
    [Parameter(Mandatory = $true)][string] $FilePath,
    [Parameter(Mandatory = $true)][string[]] $ArgumentList,
    [Parameter(Mandatory = $true)][string] $WorkingDirectory,
    [Parameter(Mandatory = $true)][string] $Name
  )

  $stdout = Join-Path $LogDir "$Name.out.log"
  $stderr = Join-Path $LogDir "$Name.err.log"
  Start-Process `
    -FilePath $FilePath `
    -ArgumentList $ArgumentList `
    -WorkingDirectory $WorkingDirectory `
    -WindowStyle Hidden `
    -RedirectStandardOutput $stdout `
    -RedirectStandardError $stderr | Out-Null
}

function Test-BridgeRunning {
  foreach ($port in 31873, 31874, 31875) {
    try {
      $response = Invoke-RestMethod -Uri "http://127.0.0.1:$port/ping" -TimeoutSec 1
      if ($response.ok -and $response.app -eq 'chatterbox-lite') {
        return $true
      }
    } catch {
      continue
    }
  }

  return $false
}

$Electron = Join-Path $Root 'node_modules\.bin\electron.exe'
if (!(Test-Path $Electron)) {
  throw "Electron executable not found: $Electron"
}

$Node = (Get-Command node -ErrorAction Stop).Source
$RayCliRelative = 'node_modules\@raycast\api\bin\run.js'
$RayCli = Join-Path $RaycastRoot $RayCliRelative
if (!(Test-Path $RayCli)) {
  throw "Raycast CLI not found: $RayCli"
}

if (!(Test-BridgeRunning)) {
  Start-HiddenProcess -FilePath $Electron -ArgumentList @('out/main/index.js') -WorkingDirectory $Root -Name 'chatterbox-helper'
}

if (!(Test-ProcessCommandLineAll @('node_modules\@raycast\api\bin\run.js', 'develop'))) {
  Start-HiddenProcess -FilePath $Node -ArgumentList @($RayCliRelative, 'develop', '-I') -WorkingDirectory $RaycastRoot -Name 'raycast-extension'
}
