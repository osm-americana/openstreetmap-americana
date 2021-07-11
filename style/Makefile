clean:
	rm -rf sprites build icons/us_* rebusurance.zip

rebusurance.zip:
	curl -s -L https://github.com/1ec5/rebusurance/releases/download/v1.0.0/rebusurance-v1.0.0.zip --output rebusurance.zip


build/rebusurance-v1.0.0: rebusurance.zip
	unzip -q rebusurance.zip "*/image2d/*.svg" -d build

sprites: build/rebusurance-v1.0.0
	scripts/import_rebusurance.sh
	mkdir -p sprites
	npx spritezero sprites/sprite@2x icons/ --retina
	npx spritezero sprites/sprite icons/

code_format:
	npx prettier --write .

run: sprites
	npx browser-sync -w --port 1776
