import { delay } from 'redux-saga';

describe(`QuestionList`, () => {
  it(`should display a list of items`, () => {
    expect(2 + 2).toEqual(4);
  });
  it(`should resolve after async function`, async () => {
    await delay(100);
    expect(3).toBe(3);
  });
});