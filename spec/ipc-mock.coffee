mockery = require 'mockery'

module.exports = ->
  ipcMock = {}
  mockery.registerMock('ipc', ipcMock);
  mockery.enable()

