$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
function Invoke-Checked([scriptblock]$Command) {
    & $Command
    if ($LASTEXITCODE -ne 0) { throw 'La commande a échoué. Consultez le message précédent.' }
}
if (-not (Test-Path -LiteralPath '.env')) {
    Copy-Item -LiteralPath '.env.example' -Destination '.env'
}
Invoke-Checked { npm.cmd ci }
Invoke-Checked { docker compose up -d --wait }
Invoke-Checked { npm.cmd run db:generate }
Invoke-Checked { npm.cmd run db:migrate }
Write-Host 'Installation terminée. Développement : npm run dev. Version locale : npm run build puis npm run local:start.'
