const zip = require('../gulpfile').default;
const fs = require('fs');
const path = require('path');

jest.mock('../lib.js');

function cleanFile(file) {
  if (new RegExp(/^.+\.zip$/).test(file)) {
    fs.unlink(path.join(__dirname, '..', 'dist/', file), (err) => {
      if (err) throw new Error(err);
    });
  }
}

function setupTest() {
  fs.readdir(path.join(__dirname, '..', 'dist/'), (err, files) => {
    if (err) throw new Error(err);

    if (files) {
      files.forEach(cleanFile);
    }
  });
}

describe('gulp zip', () => {
  beforeEach(setupTest);

  it('zips', (done) => {
    zip(() => {
      fs.readFile(path.join(__dirname, '..', 'dist/archive.zip'), (err, data) => {
        if (err) done(new Error(err));

        if (data) {
          expect(data).toBeTruthy();
          done();
        }
      });
    });

  });
});
