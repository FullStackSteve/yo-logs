# YO Logger (yo-logs)

## Overview

Deceptively simple, awesome JavaScript / TypeScript logger with emojis

## Installation

`yarn install yo-logs`

## Usage

**Boilerplate**

```javascript
import YO from 'yo-logs'
const yo = YO.init()
```

**Basic**

```javascript
yo.log({ message: 'Hello world' })
```

**Log types**

```javascript
import { YoLogType } from 'yo-logs'

yo.log({ message: 'Hello world', type: YoLogType.LOG })
yo.log({ message: 'Hello world', type: YoLogType.SUCCESS })
yo.log({ message: 'Hello world', type: YoLogType.ERROR })
yo.log({ message: 'Hello world', type: YoLogType.WARNING })
yo.log({ message: 'Hello world', type: YoLogType.REDIRECT })
yo.log({ message: 'Hello world', type: YoLogType.NOT_FOUND })
```

**Logging data**

```javascript
yo.log({ message: 'Hello world', data: { foo, bar }})
```

**Overriding output**

```javascript
yo.log({ message: 'Hello world', id: 'FOO', name: 'BAR'})
```

**Logging Successful messages**

```javascript
yo.ok({ message: 'Hello world', data, id: 'ABC', name: 'bar' })
```


**Logging Error messages**

```javascript
yo.err({ message: 'Hello world', data, id: 'ABC', name: 'bar' })
```

**Logging Warning messages**

```javascript
yo.warn({ message: 'Hello world', data, id: 'ABC', name: 'bar' })
```

**Logging API requests**

```javascript
import { YoLogType } from 'yo-logs'

yo.req({ req, type: YoLogType.SUCCESS, message })
yo.req({ req, type: YoLogType.WARNING, message })
yo.req({ req, type: YoLogType.ERROR, message })
```

