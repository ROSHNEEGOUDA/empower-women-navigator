
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, DollarSign, Target } from 'lucide-react';

interface LoanGeneratorModalProps {
  onClose: () => void;
}

export const LoanGeneratorModal: React.FC<LoanGeneratorModalProps> = ({ onClose }) => {
  const [cibilScore, setCibilScore] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  const getLoanEligibility = () => {
    const score = parseInt(cibilScore);
    const income = parseInt(monthlyIncome);
    
    if (score >= 750 && income >= 25000) return { eligible: true, rating: 'Excellent' };
    if (score >= 650 && income >= 20000) return { eligible: true, rating: 'Good' };
    if (score >= 550 && income >= 15000) return { eligible: true, rating: 'Fair' };
    return { eligible: false, rating: 'Needs Improvement' };
  };

  const getMaxLoanAmount = () => {
    const income = parseInt(monthlyIncome);
    const score = parseInt(cibilScore);
    
    let multiplier = 0;
    if (score >= 750) multiplier = 60;
    else if (score >= 650) multiplier = 40;
    else if (score >= 550) multiplier = 25;
    else multiplier = 10;
    
    return income * multiplier;
  };

  const eligibility = analyzed ? getLoanEligibility() : null;
  const maxLoan = analyzed ? getMaxLoanAmount() : 0;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center">
            💸 Smart Loan Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cibil" className="text-sm font-medium">CIBIL Score</Label>
              <Input
                id="cibil"
                type="number"
                placeholder="Enter your CIBIL score"
                value={cibilScore}
                onChange={(e) => setCibilScore(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
                min="300"
                max="900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment" className="text-sm font-medium">Employment Type</Label>
              <Select value={employmentType} onValueChange={setEmploymentType}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="homemaker">Homemaker with Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="income" className="text-sm font-medium">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter monthly income"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8"
              disabled={!cibilScore || !employmentType || !monthlyIncome}
            >
              Check Loan Eligibility
            </Button>
          </div>

          {analyzed && eligibility && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`${eligibility.eligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <CardTitle className="text-lg">Loan Eligibility</CardTitle>
                    {eligibility.eligible ? 
                      <CheckCircle className="w-6 h-6 text-green-600 ml-auto" /> :
                      <AlertCircle className="w-6 h-6 text-red-600 ml-auto" />
                    }
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge className={`${eligibility.eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {eligibility.eligible ? '✅ Eligible' : '❌ Not Eligible'}
                      </Badge>
                      <p className="text-sm font-medium">Rating: {eligibility.rating}</p>
                      <p className="text-xs text-gray-600">
                        {eligibility.eligible ? 
                          'Congratulations! You qualify for various loan options.' :
                          'Consider improving your credit score and income.'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <CardTitle className="text-lg">Maximum Loan Amount</CardTitle>
                    <DollarSign className="w-6 h-6 text-blue-600 ml-auto" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-blue-600">₹{maxLoan.toLocaleString()}</p>
                      <p className="text-sm text-blue-700">Based on your profile</p>
                      <p className="text-xs text-gray-600">
                        This is an estimated amount. Final approval depends on additional factors.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-lg text-purple-700">Loan Tips for Women 🎯</CardTitle>
                  <Target className="w-6 h-6 text-purple-600 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-700">Government Schemes</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Mudra Yojana for business loans</li>
                        <li>• Stand-Up India for SC/ST/Women</li>
                        <li>• Annapurna Scheme for food business</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-700">Improve Your Score</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Pay bills on time consistently</li>
                        <li>• Keep credit utilization below 30%</li>
                        <li>• Maintain old credit accounts</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
