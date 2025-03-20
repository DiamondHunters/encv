# ENCV (Electron Node Chrome V8)

一个用于查询 Electron 版本对应的 Chrome、Node.js 和 V8 版本信息的 Web 应用。


项目是在LLM产品产物上进行微小打磨与组装后形成的，得益于大模型强大的能力，项目得以快速成型。
这容许我们为许多微小的事情创建工具，感谢LLM。


## 构建

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

启动后访问 http://localhost:8080

### 构建生产版本

```bash
npm run build
```

## 数据来源

版本数据来自 Electron 官方，每日自动同步。

## 开源协议

MIT License
