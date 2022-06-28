const axios = require("axios");
const qs = require("qs");
const { isNumeric } = require("../src/util");

//
const API_URL_DEV = "http://localhost:3031/api";
const API_URL_PRODUCTION = "https://demo-enyosolutions.herokuapp.com/api";
//
const API_URL = API_URL_DEV;
// const API_URL = API_URL_PRODUCTION;

//
//
//
describe("api inits", () => {
  //
  // run empty test, verify app runs
  it("backend boots", () => {});
  //
  // fetch dummy data to see if server got it
  it(`/api endpoint boots [${API_URL}]`, (done) => {
    axios(API_URL)
      .then(({ data }) => {
        expect(data["app.name"]).toBe("demo:enyosolutions");
        // all good, test success
        done();
      })
      .catch((error) => done({ error }));
  });
  //
  // test db connection
  // fetch dummy data to see if db is on
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
        // db query run ok
        done();
      })
      .catch((error) => done({ error }));
  });
  //
  // test if tables are there
  // fetch record totals to see if they get returned
  it("tables [imports, articles] available", (done) => {
    axios({
      method: "get",
      url: `${API_URL}/test/tables`,
    })
      .then(({ data }) => {
        expect([data.totalArticles, data.totalImports].every(isNumeric)).toBe(
          true
        );
        done();
      })
      .catch((error) => done({ error }));
  });
  //
  // verify news feeds are live
  it("news feeds are available", (done) => {
    axios(`${API_URL}/test/feeds`)
      .then(({ data }) => {
        expect(
          data.feeds.every((feed) => null != feed && 0 < String(feed).length)
        ).toBe(true);
        // reading feeds ok, signal ok
        done();
      })
      .catch((error) => done({ error }));
  });
});
