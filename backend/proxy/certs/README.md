## Folder for certificates 

1. use https://github.com/FiloSottile/mkcert

2. add host mapping `/etc/hosts`: `127.0.0.1 sbukma.ml`

2. create `sbukma.mll.crt` and `sbukma.ml.key` and paste in this folder

```
mkcert -key-file sbukma.ml.key -cert-file sbukma.ml.crt sbukma.ml
```
