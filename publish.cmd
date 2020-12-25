set HOME=%USERPROFILE%
git checkout main
call ng build --prod --baseHref="https://daveteply.github.io/emoji-swap/demo/"
git checkout gh-pages
git pull
git add demo*
git commit -m "Updating demo"
git push
git checkout main