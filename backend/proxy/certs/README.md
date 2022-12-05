## Folder for certificates 

1. use https://github.com/FiloSottile/mkcert

2. add host mapping `/etc/hosts`: `127.0.0.1 sbukma.ml`

2. create `sbukma.mll.cert` and `sbukma.ml.key`

```
mkcert -key-file sbukma.ml.key -cert-file sbukma.ml.crt sbukma.ml
```
