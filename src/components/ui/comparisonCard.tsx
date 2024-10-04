import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export const ComparisonCard = ({ title, subtitle, items, isTorque = true }: { title: string, subtitle: string, items: string[], isTorque?: boolean }) => {
  return (
    <Card className={`w-full max-w-md ${isTorque ? 'bg-[#0D2321]' : 'bg-[#1D1D1D]'}`}>
      <CardHeader className="space-y-2">
        <div className={`inline-block px-3 py-1 rounded-full text-xs ${isTorque ? 'bg-[#4DFFF0] bg-opacity-20 text-[#4DFFF0]' : 'bg-white bg-opacity-10 text-white'}`}>
          {title}
        </div>
        <h3 className="text-2xl font-bold text-white">
          {subtitle} <span className={isTorque ? 'text-[#4DFFF0]' : 'text-white'}>{isTorque ? 'in minutes' : 'in months'}</span>
        </h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-3 ${isTorque ? 'text-[#4DFFF0]' : 'text-white'}`}>
                {isTorque ? '•' : '×'}
              </span>
              <span className={`text-sm ${isTorque ? 'text-[#A1FFFF]' : 'text-white'}`}>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};