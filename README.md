docker run -d -p 3000:3000 node:v1 \
-e DB_HOST="127.0.0.1" \
-e DB_PORT=5432 \
-e DB_NAME="api-express-typescript" \
-e DB_USER="agung.laksono" \
