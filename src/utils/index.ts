import { clone, groupBy } from 'lodash-es';

/**
 * @description 递归搜索树形数据
 * @param treeData 需要搜索的数据
 * @param callback 匹配方法
 * @param childrenKey 子集的属性key
 * @example
 *   const treeData = [
 *     {
 *       id: '1',
 *       name: 'test',
 *       children: [
 *         {
 *           id: '1-1',
 *           name: 'test2,
 *         }
 *       ],
 *     }
 *   ]
 *   searchTreeRecursive(treeData, (nodeData) => nodeData === '1' }) // return { id: '1', name: 'test' }
 *   searchTreeRecursive(
 *     treeData[0],
 *     (nodeData) => nodeData === '1-1',
 *     'children',
 *   }) // return { id: '1-1', name: 'test2' }
 */
export function searchTreeRecursive<T extends Record<any, any>>(
  treeData: T | T[],
  callback: (nodeData: T) => boolean,
  childrenKey: string | number = 'children',
): T | undefined {
  const originData = Array.isArray(treeData) ? treeData : [treeData];
  let matchData: T | undefined;
  originData.forEach((data) => {
    if (matchData) return;
    const isMatch = callback(data);
    if (isMatch) {
      matchData = data;
      return;
    }
    if (data[childrenKey]) {
      matchData = searchTreeRecursive(data[childrenKey], callback, childrenKey);
    }
  });
  return matchData;
}

/**
 * @description 递归处理树
 * @param treeData 树形数据
 * @param handler 处理节点数据的方法,传入的数据是已被浅拷贝的数据
 * @param childrenKey 子节点的属性key
 */
export function treeRecursiveBy<T extends Record<any, any> = any, ModifiedData = T>(
  treeData: T[],
  handler: (nodeData: T) => ModifiedData,
  childrenKey: string | number = 'children',
): ModifiedData[] {
  return treeData.map((data) => {
    const nodeData = handler(clone(data));
    if (data[childrenKey]) {
      // @ts-ignore
      nodeData[childrenKey] = treeRecursiveBy(data[childrenKey], handler, childrenKey);
    }
    return nodeData;
  });
}

/**
 * @description 将二维数组转换为树
 * @param dataArr
 * @param option
 */
export function convertArrayToTree<T extends Record<any, any> = {}>(
  dataArr: T[],
  option?: {
    /**
     * @default 'id'
     */
    id?: string;
    /**
     * @default 'parentId'
     */
    parentKey?: string;
    /**
     * @default 'menus'
     */
    childrenKey?: string;
    /**
     * @default '-1'
     */
    rootParentId?: string;
  },
) {
  const { id, parentKey, rootParentId, childrenKey } = {
    id: 'id',
    parentKey: 'parentId',
    childrenKey: 'menus',
    rootParentId: '-1',
    ...option,
  };
  const groupData = groupBy(dataArr, parentKey);
  const rootArr: T[] = groupData[rootParentId] || [];
  return rootArr.map((data) => {
    const cloneData = clone(data);
    if (groupData[cloneData[id]]) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      cloneData[childrenKey] = groupData[cloneData[id]] || [];
    }
    if (cloneData[childrenKey]?.length) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      cloneData[childrenKey] =
        convertArrayToTree(dataArr, {
          id,
          parentKey,
          childrenKey,
          rootParentId: cloneData[id],
        }) || [];
    }
    return cloneData;
  });
}

/**
 * @description 获取所有祖先节点
 * @param dataArr
 * @param includedId 被包含的id
 * @param option
 */
export function findAncestorNodes<T extends Record<any, any> = {}>(
  dataArr: T[],
  includedId: string | number,
  option?: {
    /**
     * @default 'id'
     */
    idKey?: string;
    /**
     * @default 'children'
     */
    childrenKey?: string;
  },
): T[] {
  const { idKey, childrenKey, ancestorNodes } = {
    idKey: 'id',
    childrenKey: 'children',
    ancestorNodes: [] as T[],
    ...option,
  };
  const parentNode = searchTreeRecursive(
    dataArr,
    (nodeData) => {
      if (nodeData[childrenKey]?.length) {
        return (nodeData[childrenKey] as T[]).map((item) => item[idKey]).includes(includedId);
      }
      return false;
    },
    childrenKey,
  );
  if (parentNode) {
    ancestorNodes.push(parentNode);
    return ancestorNodes.concat(
      findAncestorNodes(dataArr, parentNode[idKey], {
        idKey,
        childrenKey,
      }),
    );
  }

  return ancestorNodes;
}
