
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AnalysisModalProps {
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ onClose }) => {
  const [expenditure, setExpenditure] = useState('');
  const [savings, setSavings] = useState('');
  const [gains, setGains] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  const pieData = [
    { name: 'Expenditure', value: parseInt(expenditure) || 0, color: '#ef4444' },
    { name: 'Savings', value: parseInt(savings) || 0, color: '#22c55e' },
    { name: 'Gains', value: parseInt(gains) || 0, color: '#3b82f6' },
  ];

  const barData = [
    { month: 'Jan', expenditure: 25000, savings: 15000, gains: 8000 },
    { month: 'Feb', expenditure: 28000, savings: 12000, gains: 9500 },
    { month: 'Mar', expenditure: parseInt(expenditure) || 30000, savings: parseInt(savings) || 15000, gains: parseInt(gains) || 10000 },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center">
            📊 Financial Analysis Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!analyzed ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expenditure" className="text-sm font-medium">Monthly Expenditure (₹)</Label>
                <Input
                  id="expenditure"
                  type="number"
                  placeholder="Enter expenditure"
                  value={expenditure}
                  onChange={(e) => setExpenditure(e.target.value)}
                  className="border-pink-200 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savings" className="text-sm font-medium">Monthly Savings (₹)</Label>
                <Input
                  id="savings"
                  type="number"
                  placeholder="Enter savings"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  className="border-pink-200 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gains" className="text-sm font-medium">Monthly Gains (₹)</Label>
                <Input
                  id="gains"
                  type="number"
                  placeholder="Enter gains"
                  value={gains}
                  onChange={(e) => setGains(e.target.value)}
                  className="border-pink-200 focus:border-purple-400"
                />
              </div>
            </div>
          ) : null}

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
            >
              {analyzed ? 'Update Analysis' : 'Analyze My Finances'}
            </Button>
          </div>

          {analyzed && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">Financial Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, '']} />
                      <Bar dataKey="expenditure" fill="#ef4444" name="Expenditure" />
                      <Bar dataKey="savings" fill="#22c55e" name="Savings" />
                      <Bar dataKey="gains" fill="#3b82f6" name="Gains" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {analyzed && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-red-700">Total Expenditure</h3>
                  <p className="text-2xl font-bold text-red-600">₹{expenditure || 0}</p>
                  <p className="text-sm text-red-500">This Month</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-green-700">Total Savings</h3>
                  <p className="text-2xl font-bold text-green-600">₹{savings || 0}</p>
                  <p className="text-sm text-green-500">This Month</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-blue-700">Total Gains</h3>
                  <p className="text-2xl font-bold text-blue-600">₹{gains || 0}</p>
                  <p className="text-sm text-blue-500">This Month</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
