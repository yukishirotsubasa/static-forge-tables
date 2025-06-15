
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps {
  title: string;
  data: any[];
  className?: string;
  showOnlyRequiredFields?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  title, 
  data, 
  className = '', 
  showOnlyRequiredFields = false 
}) => {
  if (!data || data.length === 0) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            暫無資料
          </div>
        </CardContent>
      </Card>
    );
  }

  // 獲取所有可能的欄位名稱
  const getAllKeys = (dataArray: any[]) => {
    if (showOnlyRequiredFields) {
      // 僅顯示 b_i 和 params 裡的各項資料
      const requiredFields = ['b_i', 'name'];
      const paramsFields: string[] = [];
      
      // 收集所有 params 的欄位
      dataArray.forEach(item => {
        if (item.params && typeof item.params === 'object') {
          Object.keys(item.params).forEach(key => {
            const fieldName = `params.${key}`;
            if (!paramsFields.includes(fieldName)) {
              paramsFields.push(fieldName);
            }
          });
        }
      });
      
      return [...requiredFields, ...paramsFields.sort()];
    }
    
    const keySet = new Set<string>();
    dataArray.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => keySet.add(key));
      }
    });
    return Array.from(keySet);
  };

  const columns = getAllKeys(data);

  // 格式化值的顯示
  const formatValue = (item: any, column: string): string => {
    let value;
    
    if (column.startsWith('params.')) {
      const paramKey = column.replace('params.', '');
      value = item.params?.[paramKey];
    } else {
      value = item[column];
    }
    
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          {title} ({data.length} 筆資料)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-200 px-4 py-3 text-sm text-gray-600"
                    >
                      {formatValue(row, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
