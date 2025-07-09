
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, AlertCircle, DollarSign, Target, Loader2, TrendingUp, Users } from 'lucide-react';
import { predictLoanApproval, UserLoanData, LoanPrediction, formatCurrency, getCreditScoreColor, getCreditScoreBadgeColor } from '@/lib/mlApi';

interface LoanGeneratorModalProps {
  onClose: () => void;
}

export const LoanGeneratorModal: React.FC<LoanGeneratorModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    monthly_income: '',
    loan_amount: '',
    dependents: '',
    self_employed: false,
    education: '',
    shg_membership: false,
  });
  
  const [prediction, setPrediction] = useState<LoanPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnalyze = async () => {
    if (!formData.monthly_income || !formData.loan_amount) {
      setError('Please fill in monthly income and loan amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData: UserLoanData = {
        monthly_income: parseFloat(formData.monthly_income),
        loan_amount: parseFloat(formData.loan_amount),
        dependents: parseInt(formData.dependents) || 0,
        self_employed: formData.self_employed,
        education: formData.education,
        shg_membership: formData.shg_membership ? 1 : 0,
        // Default behavioral features
        digital_txn_count: 15,
        digital_txn_amount: 2000,
        wallet_balance: 800,
        recharge_amount: 300,
        bill_timeliness: 1,
        rent_paid: 1,
      };

      const response = await predictLoanApproval(userData);
      setPrediction(response.prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze loan application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center">
            💸 AI-Powered Loan Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthly_income" className="text-sm font-medium">Monthly Income (₹)</Label>
              <Input
                id="monthly_income"
                type="number"
                placeholder="Enter monthly income"
                value={formData.monthly_income}
                onChange={(e) => handleInputChange('monthly_income', e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loan_amount" className="text-sm font-medium">Loan Amount (₹)</Label>
              <Input
                id="loan_amount"
                type="number"
                placeholder="Enter loan amount"
                value={formData.loan_amount}
                onChange={(e) => handleInputChange('loan_amount', e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dependents" className="text-sm font-medium">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="Enter number of dependents"
                value={formData.dependents}
                onChange={(e) => handleInputChange('dependents', e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="education" className="text-sm font-medium">Education Level</Label>
              <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Not Graduate">Not Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="self_employed"
                checked={formData.self_employed}
                onCheckedChange={(checked) => handleInputChange('self_employed', checked)}
              />
              <Label htmlFor="self_employed" className="text-sm font-medium">Self Employed</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="shg_membership"
                checked={formData.shg_membership}
                onCheckedChange={(checked) => handleInputChange('shg_membership', checked)}
              />
              <Label htmlFor="shg_membership" className="text-sm font-medium flex items-center">
                <Users className="w-4 h-4 mr-1" />
                SHG Member
              </Label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Analyze Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Loan Application'
              )}
            </Button>
          </div>

          {/* Results */}
          {prediction && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Credit Score Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Credit Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Predicted Credit Score</p>
                    <p className={`text-4xl font-bold ${getCreditScoreColor(prediction.credit_score)}`}>
                      {prediction.credit_score}
                    </p>
                    <Badge className={getCreditScoreBadgeColor(prediction.credit_class)}>
                      {prediction.credit_class}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Approval Probability</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{width: `${prediction.loan_eligibility.approval_probability}%`}}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      {prediction.loan_eligibility.approval_probability.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Loan Eligibility Card */}
              <Card className={`${prediction.loan_eligibility.approved ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    {prediction.loan_eligibility.approved ? (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    )}
                    Loan Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge className={`${prediction.loan_eligibility.approved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {prediction.loan_eligibility.approved ? '✅ Approved' : '❌ Not Approved'}
                    </Badge>
                    <p className="text-sm font-medium mt-2">Status: {prediction.loan_eligibility.status}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Requested Amount:</span>
                      <span className="text-sm font-medium">{formatCurrency(prediction.loan_eligibility.requested_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Max Eligible Amount:</span>
                      <span className="text-sm font-medium">{formatCurrency(prediction.loan_eligibility.max_loan_amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Analysis Card */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">Risk Analysis & Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prediction.risk_factors.risk_factors.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Risk Factors:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {prediction.risk_factors.risk_factors.map((risk, index) => (
                          <li key={index} className="text-sm text-red-600">{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {prediction.risk_factors.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Recommendations:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {prediction.risk_factors.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-green-600">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Women-Specific Benefits Card */}
              <Card className="lg:col-span-2 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Women-Specific Benefits & Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-700">Government Schemes</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Mudra Yojana for business loans</li>
                        <li>• Stand-Up India for SC/ST/Women</li>
                        <li>• Mahila Udyam Nidhi Scheme</li>
                        <li>• Dena Shakti Scheme</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-700">SHG Benefits</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Lower interest rates</li>
                        <li>• Collateral-free loans</li>
                        <li>• Group guarantee support</li>
                        <li>• Financial literacy programs</li>
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
