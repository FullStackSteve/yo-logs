import { YoLogType } from './constants'
export * from './constants'
import { ConsoleLogOutputType, YoLoggerParams, YoReqLoggerParams, YoReqType } from './type'

function out(message: string, data: {} | null, type: ConsoleLogOutputType) {
    switch (type) {
        case 'LOG':
            handleData(message, data).map((output) => console.log(output))
            break
        case 'WARN':
            handleData(message, data).map((output) => console.warn(output))
            break
        case 'ERROR':
            handleData(message, data).map((output) => console.error(output))
            break
        default:
    }
}

function handleData(message: string, data: {} | null) {
    const cleanedMessage = message.trimEnd()
    if (data) {
        return [cleanedMessage, data]
    } else {
        return [cleanedMessage]
    }
}

class Yo {
    log({ name, type, message, data, id = new Date().toISOString() }: YoLoggerParams) {
        return out(
            ` - [${id}] ${type ?? YoLogType.LOG} ${name ? name.toUpperCase() : 'YO'}: ${message ? `${message}` : ''}`,
            data ?? null,
            'LOG',
        )
    }
    ok({ name, message, data, id = new Date().toISOString() }: YoLoggerParams) {
        return out(
            ` - [${id}] ${YoLogType.SUCCESS} ${name ? name.toUpperCase() : 'SUCCESS'}: ${message ? `${message}` : ''}`,
            data ?? null,
            'LOG',
        )
    }
    err({ name, message, data, id = new Date().toISOString() }: YoLoggerParams) {
        return out(
            ` - [${id}] ${YoLogType.ERROR} ${name ? name.toUpperCase() : 'ERROR'}: ${message ? `${message}` : ''}`,
            data ?? null,
            'ERROR',
        )
    }
    warn({ name, message, data, id = new Date().toISOString() }: YoLoggerParams) {
        return out(
            ` - [${id}] ${YoLogType.WARNING} ${name ? name.toUpperCase() : 'WARN'}: ${message ? `${message}` : ''}`,
            data ?? null,
            'WARN',
        )
    }
    req({ name, type, message, id = new Date().toISOString(), req }: YoReqLoggerParams) {
        return out(
            ` - [${id}] ${type} ${name ? name.toUpperCase() : 'REQ'}: ${req.method} ${req.url} ${
                message ? `${message}` : ''
            }`,
            null,
            type === YoLogType.ERROR ? 'ERROR' : type === YoLogType.WARNING ? 'WARN' : 'LOG',
        )
    }
}

export default {
    init: () => new Yo(),
    SUCCESS: YoLogType.SUCCESS,
    ERROR: YoLogType.ERROR,
    WARNING: YoLogType.WARNING,
    REDIRECT: YoLogType.REDIRECT,
    NOT_FOUND: YoLogType.NOT_FOUND,
}
