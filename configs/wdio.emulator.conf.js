exports.config = {
    services: ['appium'],
    port: 4723,
    runner: 'local',
    specs: [
        './test_cases/Emulator.test.js'
    ],
    capabilities: [
        {
            maxInstances: 1,
            appiumVersion: '1.13.0',
            platformName: 'Android',
            platformVersion: '11',
            deviceName: 'Android Emulator',
            app: '/home/zer0/Github/CS458-HW2-Appium/app-x86-release.apk',
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