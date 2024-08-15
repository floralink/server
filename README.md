# Floralink Server

> Archived since 2024-08-15, functionality moved to [floralink/web](https://github.com/floralink/web) with commit [dce733d](https://github.com/floralink/web/commit/dce733dc019e2f098f474d912c3700e98c0aa928)

- [Floralink Server](#floralink-server)
  - [Routes](#routes)
  - [Project setup](#project-setup)

A simple server as a proxy and data converter for Floralink.
Can use [plugins](https://github.com/floralink/plugins) for data providers.

## Routes

| Description                                             | Server route      | Method |
| ------------------------------------------------------- | ----------------- | ------ |
| Info about the server (e.g. version, installed plugins) | `/info`           | GET    |
| Query plant occurrence data from a data provider        | `/occurrencedata` | POST   |
| Query taxon reference data from a data provider         | `/taxonreference` | POST   |
| Query taxon specific data from a data provider          | `/taxonspecific`  | POST   |

## Project setup

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

for more scripts in see `package.json`
