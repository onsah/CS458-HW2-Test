# CS458 HW2 Testing

For installing the test framework refere [here](https://appium.io/docs/en/about-appium/getting-started/?lang=en).

## Installation

Clone the repository. Then run in the project.

```
npm install
```

## Running

To run the testing you need to have `appium` server runing and an emulator opened in android 11. Then you can run the tests by

```
node index.js
```

## Testing

### Boolean
`expect(bool).to.be.(true / false)`

### Value
`expect(any).to.equal(value)`