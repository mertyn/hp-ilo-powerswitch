certpath="build/cert"
mkdir -p $certpath

# private key
openssl genrsa -out $certpath/key.pem 2048

# self signed certificate request
openssl req -new -key $certpath/key.pem -out $certpath/csr.pem -subj "/C=DE/ST=Berlin/L=Berlin/O=mertyn/CN=www.example.com"

# generate ssl certificate
openssl x509 -req -days 365 -in $certpath/csr.pem -signkey $certpath/key.pem -out $certpath/cert.pem