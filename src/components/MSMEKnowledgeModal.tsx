
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, Award, Download, ExternalLink, CheckCircle } from 'lucide-react';

interface MSMEKnowledgeModalProps {
  onClose: () => void;
}

export const MSMEKnowledgeModal: React.FC<MSMEKnowledgeModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('registration');

  const registrationSteps = [
    {
      step: 1,
      title: 'Prepare Required Documents',
      description: 'Gather all necessary documents before starting the registration process',
      documents: ['Aadhaar Card', 'PAN Card', 'Business Address Proof', 'Bank Account Details', 'Business Activity Proof']
    },
    {
      step: 2,
      title: 'Online Registration on Udyam Portal',
      description: 'Visit the official Udyam Registration portal and fill the form',
      documents: ['Go to udyamregistration.gov.in', 'Fill Aadhaar and PAN details', 'Provide business information', 'Upload documents']
    },
    {
      step: 3,
      title: 'Verification & Certificate',
      description: 'Submit the form and download your Udyam Registration Certificate',
      documents: ['Review all details', 'Submit the form', 'Download certificate instantly', 'Keep certificate safe for future use']
    }
  ];

  const documents = [
    { name: 'Aadhaar Card', purpose: 'Identity proof of business owner', mandatory: true },
    { name: 'PAN Card', purpose: 'Tax identification for business', mandatory: true },
    { name: 'Business Address Proof', purpose: 'Location verification of business premises', mandatory: true },
    { name: 'Bank Account Statement', purpose: 'Financial details and transaction history', mandatory: true },
    { name: 'Business Activity Proof', purpose: 'Evidence of business operations', mandatory: false },
    { name: 'Partnership Deed', purpose: 'For partnership businesses only', mandatory: false }
  ];

  const benefits = [
    {
      category: 'Financial Benefits',
      benefits: [
        'Priority sector lending from banks',
        'Collateral-free loans up to ₹1 crore',
        'Lower interest rates on loans',
        'Credit guarantee scheme coverage'
      ]
    },
    {
      category: 'Tax Benefits',
      benefits: [
        'Reduced income tax rates',
        'Exemption from various fees',
        'GST composition scheme eligibility',
        'Presumptive taxation scheme'
      ]
    },
    {
      category: 'Government Support',
      benefits: [
        'Reservation in government tenders',
        'Subsidies for technology upgradation',
        'Marketing assistance programs',
        'Export promotion benefits'
      ]
    },
    {
      category: 'Business Development',
      benefits: [
        'Skill development programs',
        'Market linkage support',
        'Technology transfer assistance',
        'Quality certification support'
      ]
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-700 flex items-center">
            📘 MSME Knowledge Hub
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="registration" className="space-y-4">
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-700 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  How to Register for MSME
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  MSME registration (now called Udyam Registration) is a simple online process that can be completed in minutes. 
                  Follow these steps to register your business and unlock numerous benefits.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {registrationSteps.map((step) => (
                    <Card key={step.step} className="bg-white border-l-4 border-indigo-400">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {step.step}
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        <div className="space-y-1">
                          {step.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {doc}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 flex space-x-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Start Registration
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <Card key={index} className={`${doc.mandatory ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{doc.name}</CardTitle>
                      <Badge className={doc.mandatory ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>
                        {doc.mandatory ? 'Mandatory' : 'Optional'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{doc.purpose}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-700 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Document Checklist for Women Entrepreneurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Essential Documents</h4>
                    <ul className="space-y-1 text-sm">
                      <li>✅ Aadhaar Card (Business Owner)</li>
                      <li>✅ PAN Card (Individual/Entity)</li>
                      <li>✅ Bank Account Details</li>
                      <li>✅ Business Address Proof</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Additional Benefits</h4>
                    <ul className="space-y-1 text-sm">
                      <li>🎯 Special schemes for women</li>
                      <li>🎯 Lower interest rates</li>
                      <li>🎯 Government support programs</li>
                      <li>🎯 Skill development opportunities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl text-purple-700">Certification Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Udyam Portal</h3>
                      <p className="text-gray-600">Go to udyamregistration.gov.in - the official government portal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-lg">Fill Basic Details</h3>
                      <p className="text-gray-600">Enter Aadhaar number, PAN, and business owner details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-lg">Business Information</h3>
                      <p className="text-gray-600">Provide business name, address, activity, and investment details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h3 className="font-semibold text-lg">Submit & Download</h3>
                      <p className="text-gray-600">Review details, submit form, and download certificate instantly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {benefits.map((category, index) => (
                <Card key={index} className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-teal-700 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">Special Benefits for Women Entrepreneurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">👩‍💼</span>
                    </div>
                    <h4 className="font-semibold">Women-Only Schemes</h4>
                    <p className="text-sm text-gray-600">Access to exclusive government schemes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h4 className="font-semibold">Lower Interest Rates</h4>
                    <p className="text-sm text-gray-600">Special rates for women entrepreneurs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h4 className="font-semibold">Skill Development</h4>
                    <p className="text-sm text-gray-600">Free training and mentorship programs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
