# 範例內容

1. 使用Express建立WebSite
2. 實作WebApi (GET、POST、PUT、DELETE)
3. 加入 ELK APM Agent



## 使用

* 以下程式需放在最上面
    * 在 import 套件和啟用 Express Server 之前
    * 只要加上這一段 Elastic APM 就會自動收集相關資料了，不需要在其他地方安插程式碼

```typescript
const apm = require('elastic-apm-node').start({
    serviceName: 'apm-demosite',
    secretToken: '<Your Token>',
    serverUrl: 'http://localhost:8200',
});
```

