
import React from 'react';
import { useExternalData } from '@/hooks/useExternalData';
import { DataTable } from '@/components/DataTable';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

const Index = () => {
  const { forgeFormulas, itemBase, loading, error } = useExternalData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 網站標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            鍛造資料檢視器
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            顯示來自外部 JavaScript 檔案的鍛造配方和物品基礎資料
          </p>
        </div>

        {/* 資料統計 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">鍛造配方</h3>
            <p className="text-3xl font-bold text-blue-600">{forgeFormulas.length}</p>
            <p className="text-sm text-gray-500">筆資料</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">物品基礎資料</h3>
            <p className="text-3xl font-bold text-green-600">{itemBase.length}</p>
            <p className="text-sm text-gray-500">筆資料</p>
          </div>
        </div>

        {/* 資料表格 */}
        <div className="space-y-8">
          <DataTable
            title="鍛造配方 (FORGE_FORMULAS)"
            data={forgeFormulas}
            className="shadow-sm"
          />
          
          <DataTable
            title="物品基礎資料 (item_base)"
            data={itemBase}
            className="shadow-sm"
          />
        </div>

        {/* 頁腳資訊 */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>資料來源：外部 JavaScript 檔案</p>
          <p className="mt-1">最後更新：{new Date().toLocaleString('zh-TW')}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
