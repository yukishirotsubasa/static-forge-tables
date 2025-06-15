
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForgeFormulaDisplay } from '@/hooks/useExternalData';

interface ForgeFormulaTableProps {
  data: ForgeFormulaDisplay[];
  className?: string;
}

export const ForgeFormulaTable: React.FC<ForgeFormulaTableProps> = ({ data, className = '' }) => {
  if (!data || data.length === 0) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">鍛造配方 (FORGE_FORMULAS)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            暫無鍛造配方資料
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          鍛造配方 (FORGE_FORMULAS) ({data.length} 筆配方)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  編號
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  產出物名稱
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  等級
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  成功率
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  材料列表
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((formula, index) => (
                <tr
                  key={formula.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}
                >
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                    {formula.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600 font-medium">
                    {formula.productName}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                    {formula.level}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                    {(formula.chance * 100).toFixed(1)}%
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                    {formula.materials}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
