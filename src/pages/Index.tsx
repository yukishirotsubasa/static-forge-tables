
import React from 'react';
import { useExternalData } from '@/hooks/useExternalData';
import { DataTable } from '@/components/DataTable';
import { ForgeFormulaTable } from '@/components/ForgeFormulaTable';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { forgeFormulasDisplay, itemBase, loading, error } = useExternalData();

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
            <p className="text-3xl font-bold text-blue-600">{forgeFormulasDisplay.length}</p>
            <p className="text-sm text-gray-500">筆配方</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">物品基礎資料</h3>
            <p className="text-3xl font-bold text-green-600">{itemBase.length}</p>
            <p className="text-sm text-gray-500">筆資料</p>
          </div>
        </div>

        {/* 分頁顯示表格 */}
        <Tabs defaultValue="forge" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="forge">鍛造配方</TabsTrigger>
            <TabsTrigger value="items">物品資料</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forge">
            <ForgeFormulaTable
              data={forgeFormulasDisplay}
              className="shadow-sm"
            />
          </TabsContent>
          
          <TabsContent value="items">
            <DataTable
              title="物品基礎資料 (item_base)"
              data={itemBase}
              className="shadow-sm"
              showOnlyRequiredFields={true}
            />
          </TabsContent>
        </Tabs>

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
