# DOCKER IMAGENIN TEMELINI OLUSTURUR BU SATR
FROM node:17-alpine

# UYQULAMNIN CALISMA KLASORU
WORKDIR /app

# BURDA DOSYALARI CALISMA KLASORUNE KOPYALIYORUZ
COPY . .

# GEREKLI NPM BAGLILIKLARINI YUKLUYORUZ
RUN npm install

# Build aldıktan sonra çalıştırmak için live-server docker uygulamamızın global olarak ekliyoruz.
RUN npm install -g live-server

# BUIL ISLEMINI GERCEKLESTIRIYORUZ
RUN npm run build

# Docker uygulamamızı çalıştırdığımızda live-server ile build klasörünü çalıştırmak istiyoruz.Bunun için “live-server build” komutunu çalıştırıyoruz.
CMD [ "live-server","build" ]


