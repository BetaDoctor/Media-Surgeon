@echo off
:: -----------------------------------------------------------------------
:: PORTABLE MEDIA SURGEON BRIDGE v3.0
:: -----------------------------------------------------------------------

set SURGEON_HOME=%~dp0
if "%SURGEON_HOME:~-1%"=="\" set SURGEON_HOME=%SURGEON_HOME:~0,-1%
cd /d "%SURGEON_HOME%"

title [SURGEON] BRIDGE v3.0 - PORTABLE
cls

echo ========================================
echo   SURGEON SYSTEM v3.0 - PORTABLE
echo ========================================
echo   Location: %SURGEON_HOME%
echo ========================================

:: Create temp directory
if not exist "%SURGEON_HOME%\bin\temp" mkdir "%SURGEON_HOME%\bin\temp"

:: Store full temp path in simple variable
set SURGEONTEMP=%SURGEON_HOME%\bin\temp

echo [INFO] Temp directory: %SURGEONTEMP%

echo [STEP 1] Launching Theatre...
start "" "http://localhost:8080/index.html"

echo [STEP 2] Initializing Bridge on Port 8080...
echo [INFO] VERBOSE LOGGING ACTIVE. WATCH THIS WINDOW FOR COMMANDS.

:: Hardcode temp path in cmd command
"%SURGEON_HOME%\bin\websocketd.exe" --address=127.0.0.1 --port=8080 --staticdir="%SURGEON_HOME%" cmd /k "set TEMP=%SURGEONTEMP%&&set TMP=%SURGEONTEMP%&&set TMPDIR=%SURGEONTEMP%"

echo.
echo ========================================
echo   BRIDGE HAS STOPPED.
echo ========================================
pause
