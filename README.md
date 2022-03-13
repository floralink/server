# Floralink Server

A simple server as a proxy and data converter for Floralink.
Can use [plugins](https://github.com/floralink/plugins) for data providers.

# Routes

| Description                                             | Server route      | Method |
| ------------------------------------------------------- | ----------------- | ------ |
| Info about the server (e.g. version, installed plugins) | `/info`           | GET    |
| Query plant occurrence data from a data provider        | `/occurrencedata` | POST   |
| Query taxon reference data from a data provider         | `/taxonreference` | POST   |
| Query taxon specific data from a data provider          | `/taxonspecific`  | POST   |

# Project setup

```
npm install
```

Compile and hot-reloads for development:

```
npm run dev
```

Build for production:

```
npm run build
```

Run production build:

```
npm run start
```
