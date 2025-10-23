.PHONY: install dev build start clean

dev:
	npm run dev

i:
	npm install

api:
	docker exec -it redux-practice-api-1 sh
