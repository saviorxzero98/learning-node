# 範例內容

1. 實作SQLite的存取


---

* 安裝Windows x64的SQLite

```shell
.\node_modules\.bin\node-pre-gyp install --directory=./node_modules/sqlite3 --target_platform=win32 --target_arch=x64
```

* 安裝Windows x86的SQLite

```shell
.\node_modules\.bin\node-pre-gyp install --directory=./node_modules/sqlite3 --target_platform=win32 --target_arch=ia32
```

* 安裝Linux x64的SQLite

```shell
.\node_modules\.bin\node-pre-gyp install --directory=./node_modules/sqlite3 --target_platform=linux --target_arch=x64
```
