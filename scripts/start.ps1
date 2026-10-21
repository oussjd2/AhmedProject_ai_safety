$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
docker compose up -d --wait
if ($LASTEXITCODE -ne 0) { throw 'Démarrez Docker Desktop puis réessayez.' }
if (-not (Test-Path -LiteralPath '.next/BUILD_ID')) { throw 'Exécutez npm run build avant le démarrage de la version locale.' }
npm.cmd run start
