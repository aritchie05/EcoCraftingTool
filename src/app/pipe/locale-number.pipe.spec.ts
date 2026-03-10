import {LocaleNumberPipe} from './locale-number.pipe';

describe('LocaleNumberPipe', () => {
  let pipe: LocaleNumberPipe;

  beforeEach(() => {
    pipe = new LocaleNumberPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a number with default options', () => {
    const result = pipe.transform(1234.567, 'en-US');
    expect(result).toBe('1,234.57');
  });

  it('should format an integer without trailing decimals', () => {
    const result = pipe.transform(100, 'en-US');
    expect(result).toBe('100');
  });

  it('should respect custom maxFractionDigits', () => {
    const result = pipe.transform(1.23456, 'en-US', 4);
    expect(result).toBe('1.2346');
  });

  it('should respect custom minFractionDigits', () => {
    const result = pipe.transform(10, 'en-US', 2, 2);
    expect(result).toBe('10.00');
  });

  it('should format zero', () => {
    const result = pipe.transform(0, 'en-US');
    expect(result).toBe('0');
  });

  it('should format negative numbers', () => {
    const result = pipe.transform(-42.5, 'en-US');
    expect(result).toBe('-42.5');
  });
});
