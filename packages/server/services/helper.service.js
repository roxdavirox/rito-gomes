module.exports = {
  name: 'helper',

  events: {
    "hello.called"(payload) {
      this.logger.info('Hello', payload)
    }
  }
}