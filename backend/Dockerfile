# Use Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install UV package manager
RUN pip install uv

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies using UV
RUN uv pip install --system -r pyproject.toml

# Copy application code
COPY . .

# Accept runtime arguments from Railway
ARG CORS_ORIGINS
ARG OPENAI_API_KEY

# Make them available as env vars at runtime
ENV CORS_ORIGINS=$CORS_ORIGINS
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Expose port
EXPOSE 3000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
