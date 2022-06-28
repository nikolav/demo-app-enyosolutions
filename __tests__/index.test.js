const axios = require("axios");
const qs = require("qs");
const { isNumeric } = require("../src/util");

//
const API_URL_DEV        = "http://localhost:3031/api";
const API_URL_PRODUCTION = "http://localhost:3031/api";
//
const API_URL = API_URL_DEV;

//
//
//
describe("init", () => {
  //
  // run empty test, verify app runs
  it("backend boots", () => {});
  //
  // send dummy data to see if server got it
  it(`/api endpoint boots [${API_URL}]`, (done) => {
    const testData = "TEST-DATA-1";
    axios({
      method: "post",
      url: API_URL,
      data: qs.stringify({
        test: testData,
      }),
    })
      .then(({ data }) => {
        // all good, test success
        expect(data.test).toBe(testData);
        done();
      })
      .catch((error) => done({ error }));
  });
  //
  // test db connection
  // send dummy query to see if db boots
  it("mysql boots", (done) => {
    const testData = "TEST-DATA-2";
    axios({
      method: "post",
      url: `${API_URL}/test`,
      data: qs.stringify({
        test: testData,
      }),
    })
      .then(({ data }) => {
        expect(data.test).toBe(testData);
        done();
      })
      .catch((error) => done({ error }));
  });
  //
  // test if tables are there
  // count records to see if totals get returned
  it("tables [imports, articles] available", (done) => {
    axios({
      method: "get",
      url: `${API_URL}/test/tables`,
    })
      .then(({ data }) => {
        expect(
          [data.totalArticles, data.totalImports].every(isNumeric)
        ).toBe(true);
        done();
      })
      .catch((error) => done({ error }));
  });
});
