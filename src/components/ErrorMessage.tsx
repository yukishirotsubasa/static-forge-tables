
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-red-800">載入錯誤</h3>
        </div>
        <p className="text-red-700">{message}</p>
        <div className="mt-4 text-sm text-red-600">
          <p>請確認：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>外部 JavaScript 檔案已正確載入</li>
            <li>檔案中包含 FORGE_FORMULAS 和 item_base 變數</li>
            <li>變數格式為陣列</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
