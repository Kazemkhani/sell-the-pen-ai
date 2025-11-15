.PHONY: dev install

install:
	uv pip install .

dev:
	PORT=$${PORT:-3000} uvicorn main:app --reload --port $${PORT:-3000}
