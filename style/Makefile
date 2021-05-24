clean:
	rm -rf sprites

sprites:
	mkdir -p sprites
	spritezero sprites/sprite@2x icons/ --retina
	spritezero sprites/sprite icons/

code_format:
	npx prettier --write .

run: sprites
	python3 -m http.server 1776
