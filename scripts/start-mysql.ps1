# Local dev helper: starts the MySQL 8.4 server (no admin/service required).
# Data dir: C:\Users\HUDINI\AppData\Local\MySQL-data (root / empty password in dev).
$mysqlBin = "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe"
$cfg = "C:\Users\HUDINI\AppData\Local\MySQL-data\my.ini"

$existing = Get-NetTCPConnection -LocalPort 3306 -State Listen -ErrorAction SilentlyContinue
if ($existing) {
  Write-Host "MySQL already listening on port 3306."
  exit 0
}

Start-Process -FilePath $mysqlBin -ArgumentList "--defaults-file=$cfg" -WindowStyle Hidden
Write-Host "Started MySQL (mysqld). Wait a few seconds before connecting."
