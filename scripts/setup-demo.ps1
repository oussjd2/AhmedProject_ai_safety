$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
foreach ($tool in @('node', 'npm.cmd', 'docker')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "Outil manquant : $tool. Consultez SETUP.md."
    }
}
$nodeMajor = [int](& node -p 'parseInt(process.versions.node)')
if ($nodeMajor -ne 24) { throw 'Installez Node.js 24 LTS puis relancez cette commande.' }
$dockerOs = & docker info --format '{{.OSType}}'
if ($LASTEXITCODE -ne 0) { throw 'Demarrez Docker Desktop (conteneurs Linux) puis reessayez.' }
if ($dockerOs -ne 'linux') { throw 'Configurez Docker Desktop pour les conteneurs Linux.' }
& (Join-Path $PSScriptRoot 'setup.ps1')
& npm.cmd run demo:seed
if ($LASTEXITCODE -ne 0) { throw 'Creation des demos impossible. Consultez les messages precedents.' }
& npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Compilation impossible. Consultez les messages precedents.' }
Write-Host 'Demo prete. Lancez npm run local:start puis ouvrez http://127.0.0.1:3000.'
