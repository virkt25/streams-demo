## Streams Demo

The purpose of this app is to show the memory efficiency of a Node
application for summing an excessively large array of over 5,000,000 items.

### Instructions

1. `npm ci`
2. `npm run build`

#### Generate Data File

```
npm run gen:data
```

#### Run Non-Stream Calculator

```
npm run start:regular
```

#### Run Stream Calculator

```
npm run start:stream
```
