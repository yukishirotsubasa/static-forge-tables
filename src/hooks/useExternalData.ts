
import { useState, useEffect } from 'react';

// 定義資料類型
export interface ForgeFormula {
  [key: string]: any;
}

export interface ItemBase {
  [key: string]: any;
}

export const useExternalData = () => {
  const [forgeFormulas, setForgeFormulas] = useState<ForgeFormula[]>([]);
  const [itemBase, setItemBase] = useState<ItemBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkDataAvailability = () => {
      try {
        // 檢查全域變數是否存在
        if (typeof window !== 'undefined') {
          const globalForgeFormulas = (window as any).FORGE_FORMULAS;
          const globalItemBase = (window as any).item_base;

          if (globalForgeFormulas && Array.isArray(globalForgeFormulas)) {
            setForgeFormulas(globalForgeFormulas);
            console.log('FORGE_FORMULAS 載入成功:', globalForgeFormulas.length, '筆資料');
          } else {
            console.warn('FORGE_FORMULAS 未找到或格式不正確');
            setForgeFormulas([]);
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

    // 立即檢查
    checkDataAvailability();

    // 如果資料尚未載入，設定定時器重試
    const retryInterval = setInterval(() => {
      if (loading || error) {
        checkDataAvailability();
      } else {
        clearInterval(retryInterval);
      }
    }, 1000);

    // 清理定時器
    return () => {
      clearInterval(retryInterval);
    };
  }, [loading, error]);

  return {
    forgeFormulas,
    itemBase,
    loading,
    error,
  };
};
