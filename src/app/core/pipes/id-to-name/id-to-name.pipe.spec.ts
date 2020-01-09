import { IdToNamePipe } from './id-to-name.pipe';

describe('CategoryIdNamePipe', () => {
  it('create an instance', () => {
    const pipe = new IdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
