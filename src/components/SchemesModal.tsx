
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText, DollarSign, Calendar } from 'lucide-react';

interface SchemesModalProps {
  onClose: () => void;
}

export const SchemesModal: React.FC<SchemesModalProps> = ({ onClose }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [schemes, setSchemes] = useState<any[]>([]);

  const states = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 
    'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ];

  const loanTypes = [
    'Business Loan', 'Personal Loan', 'Home Loan', 'Education Loan', 
    'Agricultural Loan', 'Microfinance', 'Self Help Group Loan'
  ];

  const sampleSchemes = [
    {
      name: 'Pradhan Mantri Mudra Yojana',
      description: 'Provides loans up to ₹10 lakhs for micro and small enterprises',
      eligibility: 'Women entrepreneurs, micro enterprises',
      loanAmount: '₹50,000 - ₹10,00,000',
      interestRate: '8-12%',
      category: 'Business Loan',
      features: ['No collateral required', 'Flexible repayment', 'Government backing']
    },
    {
      name: 'Stand-Up India Scheme',
      description: 'Bank loans for SC/ST and women entrepreneurs',
      eligibility: 'Women, SC/ST entrepreneurs aged 18+',
      loanAmount: '₹10,00,000 - ₹1,00,00,000',
      interestRate: '9-14%',
      category: 'Business Loan',
      features: ['Greenfield enterprise setup', '75% loan guarantee', 'Handholding support']
    },
    {
      name: 'Annapurna Scheme',
      description: 'Loans for setting up food catering and small food business',
      eligibility: 'Women in food business',
      loanAmount: '₹50,000 - ₹5,00,000',
      interestRate: '10-13%',
      category: 'Business Loan',
      features: ['Quick processing', 'Minimal documentation', 'Skill development support']
    },
    {
      name: 'Mahila Udyam Nidhi Scheme',
      description: 'Soft loans for women entrepreneurs in small scale industries',
      eligibility: 'Women entrepreneurs with 51% stake',
      loanAmount: '₹10,00,000 max',
      interestRate: '8-11%',
      category: 'Business Loan',
      features: ['Concessional interest rates', 'Extended repayment period', 'Collateral free']
    }
  ];

  const handleSearch = () => {
    setSchemes(sampleSchemes);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700 flex items-center">
            📑 Government Schemes Finder
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Your State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Choose your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Type</label>
              <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                <SelectTrigger className="border-green-200 focus:border-green-400">
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  {loanTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
              disabled={!selectedState || !selectedLoanType}
            >
              Find Schemes
            </Button>
          </div>

          {schemes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-700">
                Available Schemes for {selectedLoanType} in {selectedState}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {schemes.map((scheme, index) => (
                  <Card key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-green-700">{scheme.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-700">{scheme.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{scheme.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-xs text-gray-500">Loan Amount</p>
                            <p className="text-sm font-semibold">{scheme.loanAmount}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Interest Rate</p>
                            <p className="text-sm font-semibold">{scheme.interestRate}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Eligibility</p>
                        <p className="text-sm">{scheme.eligibility}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Key Features</p>
                        <div className="flex flex-wrap gap-1">
                          {scheme.features.map((feature: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Apply Now
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="w-4 h-4 mr-1" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
