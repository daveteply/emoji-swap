@echo off
echo Current gh-pages:
echo.
git ls-tree --name-only -r gh-pages
echo.

set /p version="Enter version(e.g. 0.2): "
echo %version%

@echo on
ng build --prod --output-path demo-%version% --baseHref="https://daveteply.github.io/emoji-swap/demo-%version%/"

@echo off