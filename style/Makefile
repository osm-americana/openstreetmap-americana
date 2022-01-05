clean_sprites:
	rm -rf sprites

clean: clean_sprites
	rm -rf build

sprites: clean_sprites
	mkdir -p sprites
	npx spritezero sprites/sprite@2x icons/ --retina
	npx spritezero sprites/sprite icons/

config.js:
	cp config.default.js config.js

code_format:
	npx prettier --write .

build/maplibre-js:
	mkdir -p build/maplibre-js
	git clone git@github.com:wipfli/maplibre-gl-js.git build/maplibre-js

build/maplibre-js/dist/maplibre-gl.js: build/maplibre-js
#	bash -l -c 'nvm use 14'
	cd build/maplibre-js; git checkout 270a47f473ba51375a7df4076ee271777cc04467; \
	  npm ci && npm run build-prod-min;

run: sprites config.js build/maplibre-js/dist/maplibre-gl.js
	npx browser-sync -w --port 1776
