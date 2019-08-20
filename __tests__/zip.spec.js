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
  const archiveDist = path.join(__dirname, '..', 'dist/');
  fs.readdir(archiveDist, cleanDist);
}

function cleanDist(err, files) {
  if (err) throw new Error(err);

  if (files) {
    files.forEach(cleanFile);
  }
}

describe('gulp zip', () => {
  beforeEach(setupTest);

  it('zips', (done) => {
    zip(() => {
      const zippedArchive = path.join(__dirname, '..', 'dist/archive.zip');
      fs.readFile(zippedArchive, (err, data) => {
        if (err) done(new Error(err));

        if (data) {
          expect(data).toBeTruthy();
          done();
        }
      });
    });

  });
});
