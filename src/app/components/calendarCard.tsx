'use client';

import { Card, CardContent } from '@/components/ui/card';

const CalendarCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1); // contoh tanggal 1 - 30

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-4">
        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600">
          {days.map((day, index) => (
            <div key={`day-${index}`}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2 text-center">
          {dates.map((date, index) => (
            <div
              key={`date-${index}`}
              className="py-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {date}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarCard;
