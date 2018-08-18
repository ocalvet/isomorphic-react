let returnResponse = {};
const isomorphicFetch = jest.fn(() => returnResponse);
isomorphicFetch.__setReturnResponse = r => returnResponse = r;
export default isomorphicFetch;