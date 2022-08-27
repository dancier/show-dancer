import { AgePipe } from './age.pipe';

describe('AgePipe', () => {

  let agePipe: AgePipe;

  // set fake system time
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2001-01-01'));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    agePipe = new AgePipe();
  });

  it('returns the age for a given birthdate', () => {
    expect(agePipe.transform('2000-01-01')).toBe(1);
    expect(agePipe.transform('2000-01-03')).toBe(0);
  });

  // TODO: use this test instead when we have an exact calculation
  xit('returns the age for a given birthdate considering leap years', () => {
    expect(agePipe.transform('2000-01-01')).toBe(1);
    expect(agePipe.transform('2000-01-02')).toBe(0);
  });

  it('returns "unknown" when the birthdate is not parsable', () => {
    expect(agePipe.transform('not parsable as date')).toBe('unknown');
  });

});
