let mockStorage = {}

module.export = window.localStorage = {
    getItem: (key) => mockStorage[key]
}