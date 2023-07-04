export * from './enums';

// @ts-ignore
export const IS_DEV = process.env.NODE_ENV === 'development';

/** ConfigProvider Provide与Inject的唯一key */
export const configSymbol = Symbol('config');
