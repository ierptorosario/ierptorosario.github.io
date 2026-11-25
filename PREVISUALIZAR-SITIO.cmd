@echo off
chcp 65001 >nul
title IER Puerto Rosario - Ver sitio en el computador
cd /d "%~dp0"
echo.
echo  Abriendo el sitio en el navegador...
echo  El servidor sigue activo mientras esta ventana este abierta.
echo  Para apagarlo, cierre esta ventana o presione Ctrl+C.
echo.
start "" http://localhost:8765/index.html
python -m http.server 8765 --bind 127.0.0.1
pause
