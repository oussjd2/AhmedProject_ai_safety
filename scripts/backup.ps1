$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
$backupStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupPath = Join-Path (Get-Location) "backups/$backupStamp"
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
docker compose exec -T postgres pg_dump -U clair -Fc -f /tmp/clair-backup.dump clair
if ($LASTEXITCODE -ne 0) { throw 'Sauvegarde PostgreSQL impossible.' }
docker compose cp postgres:/tmp/clair-backup.dump (Join-Path $backupPath 'database.dump')
if ($LASTEXITCODE -ne 0) { throw 'Copie de la sauvegarde impossible.' }
if (Test-Path -LiteralPath 'data/evidence') {
    Copy-Item -LiteralPath 'data/evidence' -Destination (Join-Path $backupPath 'evidence') -Recurse
}
Copy-Item -LiteralPath 'src/config' -Destination (Join-Path $backupPath 'config') -Recurse
Write-Host "Sauvegarde créée : $backupPath"
