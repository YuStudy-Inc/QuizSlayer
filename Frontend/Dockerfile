FROM node:18-bullseye AS builder

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/

RUN --mount=type=secret,id=PRIVATE_KEY \
    cat /run/secrets/PRIVATE_KEY > /security/quizslayer.com_ssl_certificate.cer \
    --mount=type=secret,id=SSL_CERT \
    cat /run/secrets/SSL_CERT > /security/_.quizslayer.com_private_key.key

COPY /security/quizslayer.com_ssl_certificate.cer /etc/nginx/certs/
COPY /security/_.quizslayer.com_private_key.key /etc/nginx/certs/

CMD ["nginx", "-g", "daemon off;"]