export * from './cryptographic';
export { default as validateMultipleDto } from './validate-mutiple-dto';

/**
 * @param str
 * @param params
 * @example
 * replaceStringParams('/test/:id', { id: '1' }); // return '/test/1'
 */
export function replaceStringParams(str: string, params: Record<string, string>) {
  return Object.keys(params).reduce((lastStr, currentKey) => {
    const currentValue = params[currentKey];
    const reg = new RegExp(`:${currentKey}`, 'g');
    return lastStr.replace(reg, currentValue);
  }, str);
}

/**
 * @param templateString 'test {{ name }} test'
 * @param params
 */
export function replaceVariablesInString(templateString: string, params: Record<string, string>) {
  return Object.keys(params).reduce((lastString, currentKey) => {
    const currentValue = params[currentKey];
    // eslint-disable-next-line no-useless-escape
    const reg = new RegExp(`{{[\s\x20]*(${currentKey})[\s\x20]*}}`, 'g');
    // eslint-disable-next-line no-param-reassign
    lastString = lastString.replace(reg, currentValue);
    return lastString;
  }, templateString);
}

interface SQLWhereOption {
  type: 'sql';
  like?: boolean;
  value: unknown;
}

/**
 * @description 将对象转换为sql条件
 * @param params
 * @param [option]
 * @param [option.prefix] 在字段前追加前缀
 * @param [option.condition=AND] 条件值
 * @example
 * // SELECT * FROM `demo` WHERE phone = '*****' AND enabled = true
 * query(`SELECT * FROM \`demo\` WHERE ${convertObjectToSQLWhere({ phone: '*****', enabled: true })}`)
 * // SELECT * FROM `demo` u WHERE u.phone = '*****' AND u.enabled = true
 * query(`SELECT * FROM \`demo\` u WHERE ${convertObjectToSQLWhere({ phone: '*****', enabled: true }, { prefix: 'u.' })}`)
 */
export function convertObjectToSQLWhere(
  params: Record<string, any | SQLWhereOption>,
  option?: {
    prefix?: string;
    condition?: string;
  },
) {
  const { prefix, condition } = { prefix: '', condition: 'AND', ...option };
  return Object.keys(params)
    .map((key) => {
      if (params[key] === undefined) {
        return undefined;
      }
      if (params[key]?.type === 'sql') {
        const data = params[key] as SQLWhereOption;
        if (data.like) {
          return `${prefix}${key} LIKE '%${data.value}%'`;
        }
      }
      return `${prefix}${key} = ${typeof params[key] === 'string' ? `'${params[key]}'` : params[key]}`;
    })
    .filter((sqlStr) => sqlStr !== undefined)
    .join(` ${condition} `);
}

/**
 * @description 根据条件过滤或转换对象的键值
 * @param data
 * @param options
 */
export function filterObjectBy<Data extends object>(
  data: Data,
  options?: {
    excludeKeys?: (keyof Data)[];
    /**
     * @default [undefined, '']
     */
    excludeValues?: unknown[];
    before?: (value: any, key: keyof Data, data: Data) => any;
  },
): Partial<Data> {
  const { excludeKeys, excludeValues, before } = {
    excludeKeys: [],
    excludeValues: [undefined, ''],
    ...options,
  };
  const obj: object = {};
  Object.keys(data).forEach((key) => {
    if (excludeKeys.includes(key as keyof Data)) {
      return;
    }
    if (excludeValues.includes(data[key])) {
      return;
    }
    let value = data[key];
    if (before && typeof before === 'function') {
      value = before(value, key as keyof Data, data);
    }
    obj[key] = value;
  });
  return obj;
}
