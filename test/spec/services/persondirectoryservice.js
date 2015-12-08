'use strict';

describe('Service: PersonDirectoryService', function () {

  // load the service's module
  beforeEach(module('lab02App'));

  // instantiate service
  var PersonDirectoryService;
  beforeEach(inject(function (_PersonDirectoryService_) {
    PersonDirectoryService = _PersonDirectoryService_;
  }));

  it('should do something', function () {
    expect(!!PersonDirectoryService).toBe(true);
  });

});
