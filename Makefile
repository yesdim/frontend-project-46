publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js
make lint: 
	npx eslint .
