import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users } from 'lucide-react';

export const FloatingStats = () => {
  return (
    <div className="fixed bottom-1 mb-2 left-1/2 transform -translate-x-1/2 z-30 w-full px-4 sm:px-0">
      <Card className="bg-white/90 backdrop-blur-md border-pink-200 shadow-lg max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center space-x-1">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600">NGOs:</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                150+
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-pink-600" />
              <span className="text-gray-600">States:</span>
              <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                20+
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-indigo-600" />
              <span className="text-gray-600">Women Benefited:</span>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                3.2M+
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
