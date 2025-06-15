
import { useState, useEffect } from 'react';

export interface ForgeFormula {
  item_id: number;
  level: number;
  chance: number;
  pattern: number[][];
}

export interface ItemBase {
  b_i: number;
  name: string;
  [key: string]: any;
}

export interface ForgeFormulaDisplay {
  id: string;
  productName: string;
  level: number;
  chance: number;
  materials: string;
}

export const useExternalData = () => {
  const [forgeFormulas, setForgeFormulas] = useState<Record<string, ForgeFormula>>({});
  const [itemBase, setItemBase] = useState<ItemBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 根據 item_id 找到對應的物品名稱
  const getItemName = (itemId: number, items: ItemBase[]): string => {
    const item = items.find(item => item.b_i === itemId);
    return item ? item.name : `Unknown Item (${itemId})`;
  };

  // 統計材料並格式化顯示
  const formatMaterials = (pattern: number[][], items: ItemBase[]): string => {
    const materialCount: Record<number, number> = {};
    
    // 統計每個材料的數量
    pattern.forEach(row => {
      row.forEach(itemId => {
        if (itemId !== -1) { // -1 表示空格
          materialCount[itemId] = (materialCount[itemId] || 0) + 1;
        }
      });
    });

    // 轉換為名稱和數量的字串
    return Object.entries(materialCount)
      .map(([itemId, count]) => {
        const name = getItemName(Number(itemId), items);
        return count > 1 ? `${name} x ${count}` : name;
      })
      .join(', ');
  };

  // 轉換鍛造配方資料為顯示格式
  const getForgeFormulasDisplay = (): ForgeFormulaDisplay[] => {
    if (!forgeFormulas || !itemBase.length) return [];

    return Object.entries(forgeFormulas).map(([key, formula]) => ({
      id: key,
      productName: getItemName(formula.item_id, itemBase),
      level: formula.level,
      chance: formula.chance,
      materials: formatMaterials(formula.pattern, itemBase)
    }));
  };

  useEffect(() => {
    const checkDataAvailability = () => {
      try {
        if (typeof window !== 'undefined') {
          const globalForgeFormulas = (window as any).FORGE_FORMULAS;
          const globalItemBase = (window as any).item_base;

          if (globalForgeFormulas && typeof globalForgeFormulas === 'object') {
            setForgeFormulas(globalForgeFormulas);
            console.log('FORGE_FORMULAS 載入成功:', Object.keys(globalForgeFormulas).length, '筆配方');
          } else {
            console.warn('FORGE_FORMULAS 未找到或格式不正確');
            setForgeFormulas({});
          }

          if (globalItemBase && Array.isArray(globalItemBase)) {
            setItemBase(globalItemBase);
            console.log('item_base 載入成功:', globalItemBase.length, '筆資料');
          } else {
            console.warn('item_base 未找到或格式不正確');
            setItemBase([]);
          }

          if (!globalForgeFormulas && !globalItemBase) {
            setError('外部資料檔案尚未載入或變數不存在');
          } else {
            setError(null);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('載入外部資料時發生錯誤:', err);
        setError('載入資料時發生錯誤');
        setLoading(false);
      }
    };

    checkDataAvailability();

    const retryInterval = setInterval(() => {
      if (loading || error) {
        checkDataAvailability();
      } else {
        clearInterval(retryInterval);
      }
    }, 1000);

    return () => {
      clearInterval(retryInterval);
    };
  }, [loading, error]);

  return {
    forgeFormulas,
    itemBase,
    forgeFormulasDisplay: getForgeFormulasDisplay(),
    loading,
    error,
  };
};
