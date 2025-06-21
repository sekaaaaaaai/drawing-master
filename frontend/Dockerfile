# ARM対応 node イメージ
FROM node:20-bullseye

WORKDIR /app

COPY app/ .

RUN npm install
# RUN npm run build

# Vite dev server用ではなく、静的配信前提の場合 nginx でホストするのが良い
# ここではビルドだけ行う
