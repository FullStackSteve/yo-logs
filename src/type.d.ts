import { YoLogType } from './constants'

type YoLoggerParams = {
    message?: string
    data?: {}
    id?: string
    name?: string
    type?: YoLogType
}

type YoReqType = {
    method?: string
    url?: string
}

type YoReqLoggerParams = YoLoggerParams & { type: YoLogType; req: YoReqType }

type ConsoleLogOutputType = 'LOG' | 'WARN' | 'ERROR'
