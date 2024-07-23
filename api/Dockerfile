FROM python:3.12.4-alpine
WORKDIR /api
COPY . .
RUN adduser --disabled-password app
RUN pip install --requirement requirements.txt
USER app
ENTRYPOINT ["fastapi", "run" , "--host", "0.0.0.0", "--port", "8000"]