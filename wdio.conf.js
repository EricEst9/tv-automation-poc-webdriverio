const report = require('multiple-cucumber-html-reporter');
const fs = require('fs-extra');

exports.config = {
    runner: 'local',
    specs: [
        './test/features/**/*.feature'
    ],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--user-agent=Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/5.0 NativeTV/5.0 TV Safari/538.1'
            ]
        }
    }],
    logLevel: 'error',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: ['spec', ['cucumberjs-json', {
        jsonFolder: '.tmp/json/',
        language: 'en',
    }]],
    cucumberOpts: {
        require: ['./test/step-definitions/**/*.js'],
        timeout: 120000 // Subido a 2 minutos para el flujo de TV
    },
    onPrepare: () => {
        fs.removeSync('.tmp/');
    },
    onComplete: () => {
        report.generate({
            jsonDir: '.tmp/json/',
            reportPath: './reports/html/',
            openReportInBrowser: false,
            pageTitle: 'Smart TV Automation PoC',
            reportName: 'YouTube App TV Tests',
            displayDuration: true
        });
    }
}
