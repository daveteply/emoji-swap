@echo off
echo Current gh-pages:
echo.
git ls-tree --name-only -r gh-pages
echo.

set /p version="Enter version: (e.g. 0.2)"
echo %version%

rem ng build --prod --baseHref="https://daveteply.github.io/emoji-swap/demo/"