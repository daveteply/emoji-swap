call git checkout main
call ng build --prod --baseHref="https://daveteply.github.io/emoji-swap/demo/"
call git checkout gh-pages
call git pull
call git add demo*
call git commit -m "Updating demo"
call git push
call git checkout main