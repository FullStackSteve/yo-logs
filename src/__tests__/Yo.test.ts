import YO from '../index'
import { YoLogType } from '../constants'
import { YoReqType } from '../type'

const yo = YO.init()

const spyLog = jest.spyOn(console, 'log').mockImplementation()
const spyWarn = jest.spyOn(console, 'warn').mockImplementation()
const spyError = jest.spyOn(console, 'error').mockImplementation()

const mockDate = new Date(441763200000) as unknown as string
const mockDateISOString = new Date(441763200000).toISOString()
const spyDate = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

const data = { status: 'HELLO WORLD', message: 'This is a message', payload: { id: 123 } }

afterEach(() => {
    jest.clearAllMocks()
})

test('it can log()', () => {
    yo.log({})
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(` - [${mockDateISOString}] ${YoLogType.LOG} YO:`)
})

test('it can log() a message', () => {
    yo.log({ message: 'Hello world' })
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(` - [${mockDateISOString}] ${YoLogType.LOG} YO: Hello world`)
})

test('it can log() a message with each YoLogType', () => {
    Object.entries(YoLogType).map((type) => {
        yo.log({ message: 'Hello world', type: type[1] })
    })
    expect(console.log).toHaveBeenCalledTimes(Object.entries(YoLogType).length)
    Object.entries(YoLogType).map((type) => {
        expect(console.log).toHaveBeenCalledWith(` - [${mockDateISOString}] ${type[1]} YO: Hello world`)
    })
})

test('it can log() a message and data with each YoLogType', () => {
    Object.entries(YoLogType).map((type) => {
        yo.log({ message: 'Hello world', type: type[1], data })
    })
    expect(console.log).toHaveBeenCalledTimes(Object.entries(YoLogType).length * 2)
    Object.entries(YoLogType).map((type) => {
        expect(console.log).toHaveBeenCalledWith(` - [${mockDateISOString}] ${type[1]} YO: Hello world`)
        expect(console.log).toHaveBeenCalledWith(data)
    })
})

test('it can log() a message and data with each YoLogType and with a custom id', () => {
    Object.entries(YoLogType).map((type) => {
        yo.log({ message: 'Hello world', type: type[1], data, id: 'ABC' })
    })
    expect(console.log).toHaveBeenCalledTimes(Object.entries(YoLogType).length * 2)
    Object.entries(YoLogType).map((type) => {
        expect(console.log).toHaveBeenCalledWith(` - [ABC] ${type[1]} YO: Hello world`)
        expect(console.log).toHaveBeenCalledWith(data)
    })
})

test('it can log() a message and data with each YoLogType, with a custom id and a custom name', () => {
    Object.entries(YoLogType).map((type) => {
        yo.log({ message: 'Hello world', type: type[1], data, id: 'ABC', name: 'bar' })
    })
    expect(console.log).toHaveBeenCalledTimes(Object.entries(YoLogType).length * 2)
    Object.entries(YoLogType).map((type) => {
        expect(console.log).toHaveBeenCalledWith(` - [ABC] ${type[1]} BAR: Hello world`)
        expect(console.log).toHaveBeenCalledWith(data)
    })
})

test('it can ok() a message and data, with a custom id and a custom name and call console.err and correct YoLogType.SUCCESS', () => {
    Object.entries(YoLogType).map((type) => {
        yo.ok({ message: 'Hello world', type: type[1], data, id: 'ABC', name: 'bar' })
    })
    expect(console.log).toHaveBeenCalledTimes(Object.entries(YoLogType).length * 2)
    Object.entries(YoLogType).map((type) => {
        expect(console.log).toHaveBeenCalledWith(` - [ABC] ${YoLogType.SUCCESS} BAR: Hello world`)
        expect(console.log).toHaveBeenCalledWith(data)
    })
})

test('it can err() a message and data, with a custom id and a custom name and call console.log and correct YoLogType.ERROR', () => {
    Object.entries(YoLogType).map((type) => {
        yo.err({ message: 'Hello world', type: type[1], data, id: 'ABC', name: 'bar' })
    })
    expect(console.error).toHaveBeenCalledTimes(Object.entries(YoLogType).length * 2)
    Object.entries(YoLogType).map((type) => {
        expect(console.error).toHaveBeenCalledWith(` - [ABC] ${YoLogType.ERROR} BAR: Hello world`)
        expect(console.error).toHaveBeenCalledWith(data)
    })
})

test('it can warn() a message and data, with a custom id and a custom name and call console.warn and correct YoLogType.WARN', () => {
    Object.entries(YoLogType).map((type) => {
        yo.warn({ message: 'Hello world', type: type[1], data, id: 'ABC', name: 'bar' })
    })
    expect(console.warn).toHaveBeenCalledTimes(Object.entries(YoLogType).length * 2)
    Object.entries(YoLogType).map((type) => {
        expect(console.warn).toHaveBeenCalledWith(` - [ABC] ${YoLogType.WARNING} BAR: Hello world`)
        expect(console.warn).toHaveBeenCalledWith(data)
    })
})

test('it can req() with a req obj passed for every YoLogType ', () => {
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    methods.map((method) => {
        const req: YoReqType = {
            method,
            url: 'http://localhost',
        }
        // console.error
        yo.req({ req, type: YoLogType.ERROR })
        expect(console.error).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.ERROR} REQ: ${method} ${req.url}`,
        )
        // console.warn
        yo.req({ req, type: YoLogType.WARNING })
        expect(console.warn).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.WARNING} REQ: ${method} ${req.url}`,
        )
        // console.logs
        yo.req({ req, type: YoLogType.LOG })
        expect(console.log).toHaveBeenCalledWith(` - [${mockDateISOString}] ${YoLogType.LOG} REQ: ${method} ${req.url}`)
        yo.req({ req, type: YoLogType.NOT_FOUND })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.NOT_FOUND} REQ: ${method} ${req.url}`,
        )
        yo.req({ req, type: YoLogType.REDIRECT })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.REDIRECT} REQ: ${method} ${req.url}`,
        )
        yo.req({ req, type: YoLogType.SUCCESS })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.SUCCESS} REQ: ${method} ${req.url}`,
        )
        yo.req({ req, type: YoLogType.LOG })
        expect(console.log).toHaveBeenCalledWith(` - [${mockDateISOString}] ${YoLogType.LOG} REQ: ${method} ${req.url}`)
    })
})

test('it can req() with a req obj passed for every YoLogType, with a custom message', () => {
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    const message = 'Hello world'
    methods.map((method) => {
        const req: YoReqType = {
            method,
            url: 'http://localhost',
        }
        // console.error
        yo.req({ req, type: YoLogType.ERROR, message })
        expect(console.error).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.ERROR} REQ: ${method} ${req.url} ${message}`,
        )
        // console.warn
        yo.req({ req, type: YoLogType.WARNING, message })
        expect(console.warn).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.WARNING} REQ: ${method} ${req.url} ${message}`,
        )
        // console.logs
        yo.req({ req, type: YoLogType.LOG, message })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.LOG} REQ: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.NOT_FOUND, message })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.NOT_FOUND} REQ: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.REDIRECT, message })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.REDIRECT} REQ: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.SUCCESS, message })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.SUCCESS} REQ: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.LOG, message })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.LOG} REQ: ${method} ${req.url} ${message}`,
        )
    })
})

test('it can req() with a req obj passed for every YoLogType, with a custom message and name', () => {
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    const message = 'Hello world'
    const name = 'FOO'
    methods.map((method) => {
        const req: YoReqType = {
            method,
            url: 'http://localhost',
        }
        // console.error
        yo.req({ req, type: YoLogType.ERROR, message, name })
        expect(console.error).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.ERROR} ${name}: ${method} ${req.url} ${message}`,
        )
        // console.warn
        yo.req({ req, type: YoLogType.WARNING, message, name })
        expect(console.warn).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.WARNING} ${name}: ${method} ${req.url} ${message}`,
        )
        // console.logs
        yo.req({ req, type: YoLogType.LOG, message, name })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.LOG} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.NOT_FOUND, message, name })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.NOT_FOUND} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.REDIRECT, message, name })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.REDIRECT} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.SUCCESS, message, name })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.SUCCESS} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.LOG, message, name })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${mockDateISOString}] ${YoLogType.LOG} ${name}: ${method} ${req.url} ${message}`,
        )
    })
})

test('it can req() with a req obj passed for every YoLogType, with a custom message, name and id', () => {
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    const message = 'Hello world'
    const name = 'FOO'
    const id = 'BAR'
    methods.map((method) => {
        const req: YoReqType = {
            method,
            url: 'http://localhost',
        }
        // console.error
        yo.req({ req, type: YoLogType.ERROR, message, name, id })
        expect(console.error).toHaveBeenCalledWith(
            ` - [${id}] ${YoLogType.ERROR} ${name}: ${method} ${req.url} ${message}`,
        )
        // console.warn
        yo.req({ req, type: YoLogType.WARNING, message, name, id })
        expect(console.warn).toHaveBeenCalledWith(
            ` - [${id}] ${YoLogType.WARNING} ${name}: ${method} ${req.url} ${message}`,
        )
        // console.logs
        yo.req({ req, type: YoLogType.LOG, message, name, id })
        expect(console.log).toHaveBeenCalledWith(` - [${id}] ${YoLogType.LOG} ${name}: ${method} ${req.url} ${message}`)
        yo.req({ req, type: YoLogType.NOT_FOUND, message, name, id })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${id}] ${YoLogType.NOT_FOUND} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.REDIRECT, message, name, id })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${id}] ${YoLogType.REDIRECT} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.SUCCESS, message, name, id })
        expect(console.log).toHaveBeenCalledWith(
            ` - [${id}] ${YoLogType.SUCCESS} ${name}: ${method} ${req.url} ${message}`,
        )
        yo.req({ req, type: YoLogType.LOG, message, name, id })
        expect(console.log).toHaveBeenCalledWith(` - [${id}] ${YoLogType.LOG} ${name}: ${method} ${req.url} ${message}`)
    })
})
