clean:
	rm -rf sprites

sprites: clean
	mkdir -p sprites
	npx spritezero sprites/sprite@2x icons/ --retina
	npx spritezero sprites/sprite icons/

config.js:
	cp config.default.js config.js

code_format:
	npx prettier --write .

run: sprites config.js
	npx browser-sync -w --port 1776
