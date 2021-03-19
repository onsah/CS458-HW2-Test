exports.config = {
    services: ['appium'],
    port: 4725,
    runner: 'local',
    specs: [
        './test_cases/Real.test.js'
    ],
    capabilities: [
        {
            maxInstances: 1,
            appiumVersion: '1.13.0',
            platformName: 'Android',
            platformVersion: '10',
            deviceName: 'Real',
            app: '/home/zer0/Github/CS458-HW2-Appium/app-release.apk',
            automationName: 'UiAutomator2'
        },
    ],
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 50000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}