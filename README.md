# CS458 HW2 Testing

For installing the test framework refere [here](https://appium.io/docs/en/about-appium/getting-started/?lang=en).

## Installation

Clone the repository. Then run in the project.

```
npm install
```

## Running

### Real Device (Android 10)

Port: 4725

To run:
```
npx wdio configs/wdio.real.conf.js
```

### Emulator (Android 11)

Port: 4723

To run:
```
npx wdio configs/wdio.emulator.conf.js
```

## Testing

### Boolean
`expect(bool).to.be.(true / false)`

### Value
`expect(any).to.equal(value)`