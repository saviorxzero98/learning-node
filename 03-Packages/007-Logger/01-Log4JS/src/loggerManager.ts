import Logger = require('log4js');

Logger.configure({
    appenders: {
        LogFile: {
            type: 'dateFile',
            filename: './logs/Log',
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log',
            encoding: 'utf-8'
        },
        LogMultiFile: {
            type: 'multiFile',
            base: './logs/users',
            property: 'userId', 
            extension: '.log'
        },
        LogConsole: {
            type: 'console'
        },
        LogEmail: {
            type: '@log4js-node/smtp',
            sender: 'mis@mail.gss.com.tw',
            recipients: 'marty_chen@mail.gss.com.tw',
            layout: {
                type: 'pattern',
                pattern: '主機：%h；日期：%d{yyyy-MM-dd hh:mm:ss}；訊息：%m'
            },
            transport: {
                plugin: 'smtp',
                options: {
                    host: 'mail.gss.com.tw',
                    port: 25
                }
            },
        }
    },
    categories: {
        default: {
            appenders: ['LogFile', 'LogConsole', 'LogMultiFile'],
            level: 'all'
        },
        error: {
            appenders: ['LogFile', 'LogConsole', 'LogEmail', 'LogMultiFile'],
            level: 'error'
        }
    }
});

export function getLogger(categoryName?: string, userId?: string) {
    const logger = Logger.getLogger(categoryName);
    if (userId) {
        logger.addContext('userId', userId);
    }
    return logger;
}