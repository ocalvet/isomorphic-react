import questionSaga, { handleFetchQuestion } from './fetch-question-saga';
import fetch from 'isomorphic-fetch';
import { put, takeEvery } from 'redux-saga/effects';

describe(`default question saga`, () => {
  const gen = questionSaga();
  
  it(`should call handleFetchQuestion when REQUEST_FETCH_QUESTION action is disparch`, async () => {
    const { value } = await gen.next();
    expect(value).toEqual(takeEvery('REQUEST_FETCH_QUESTION', handleFetchQuestion));
  });

  it(`should complete`, async () => {
    const lastCall = gen.next();
    expect(lastCall.done).toBeTruthy();
  });
});

describe(`handleFetchQuestion`, () => {
  const resp = { json: jest.fn() };
  fetch.__setReturnResponse(resp);
  const gen = handleFetchQuestion({ question_id: 42 });
  
  it(`should fetch the questions`, async () => {
    const responseCallValue = await gen.next();
    expect(fetch).toHaveBeenCalledWith('/api/questions/42');
    expect(responseCallValue.value).toEqual(resp);
  });

  it(`should parse the json response`, async () => {
    await gen.next(resp);
    expect(resp.json).toHaveBeenCalled();
  });

  it(`should put the action FETCHED_QUESTION with the correct question`, async () => {
    const data = [{ question_id: 32 }];
    const actionValue = gen.next({ items: data });
    expect(actionValue.value).toEqual(put({type:`FETCHED_QUESTION`, question: data[0]}));
  });

  it(`should complete`, async () => {
    const lastCall = gen.next();
    expect(lastCall.done).toBeTruthy();
  });
});