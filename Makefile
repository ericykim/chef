deploy:
	rm -rf dist/
	npm run build
	surge dist/ hci-chef.surge.sh
