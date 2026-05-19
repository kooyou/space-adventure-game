@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:5192"
python -m http.server 5192 --bind 127.0.0.1
