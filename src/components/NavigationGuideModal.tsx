
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, BarChart3, CreditCard, FileText, Users, Compass, CheckCircle } from 'lucide-react';

interface NavigationGuideModalProps {
  onClose: () => void;
}

export const NavigationGuideModal: React.FC<NavigationGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);

  const tutorials = [
    {
      id: 'analysis',
      title: 'How to Use Financial Analysis',
      icon: BarChart3,
      duration: '3 min',
      difficulty: 'Beginner',
      description: 'Learn how to track your expenses, savings, and gains with detailed charts and insights.',
      steps: [
        'Navigate to Financial Analysis section',
        'Enter your monthly expenditure, savings, and gains',
        'Click "Analyze My Finances" to generate reports',
        'Review pie charts and bar graphs for insights',
        'Use the data to make informed financial decisions'
      ]
    },
    {
      id: 'loan',
      title: 'How to Apply for Loans',
      icon: CreditCard,
      duration: '5 min',
      difficulty: 'Intermediate',
      description: 'Understand the loan application process and get personalized recommendations.',
      steps: [
        'Access the Loan Generator section',
        'Enter your CIBIL score and employment details',
        'Provide accurate monthly income information',
        'Review your loan eligibility status',
        'Explore recommended loan options and tips'
      ]
    },
    {
      id: 'schemes',
      title: 'Finding Government Schemes',
      icon: FileText,
      duration: '4 min',
      difficulty: 'Beginner',
      description: 'Discover available government schemes based on your location and needs.',
      steps: [
        'Open the Government Schemes finder',
        'Select your state from the dropdown',
        'Choose the type of loan you need',
        'Browse through available schemes',
        'Apply directly or learn more about eligibility'
      ]
    },
    {
      id: 'shg',
      title: 'How to Connect with SHGs',
      icon: Users,
      duration: '6 min',
      difficulty: 'Beginner',
      description: 'Join Self Help Groups and participate in community events.',
      steps: [
        'Visit the SHG Community section',
        'Browse local Self Help Groups',
        'Check upcoming events and workshops',
        'Connect with mentors in your field',
        'Join groups that match your interests'
      ]
    }
  ];

  const markTutorialComplete = (tutorialId: string) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials([...completedTutorials, tutorialId]);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-700 flex items-center">
            🧭 App Navigation Guide
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tutorials">Mini-Tutorials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-xl text-teal-700">Welcome to Your Financial Journey!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  This comprehensive platform is designed to empower women with financial independence through various tools and resources. 
                  Here's how you can make the most of each feature:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold text-purple-700">Financial Analysis</h3>
                    <p className="text-sm text-gray-600">Track and visualize your financial health with interactive charts</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <CreditCard className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-blue-700">Loan Generator</h3>
                    <p className="text-sm text-gray-600">Get personalized loan recommendations based on your profile</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <FileText className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-green-700">Government Schemes</h3>
                    <p className="text-sm text-gray-600">Discover schemes tailored to your state and loan type</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <Users className="w-8 h-8 text-orange-600 mb-2" />
                    <h3 className="font-semibold text-orange-700">SHG Community</h3>
                    <p className="text-sm text-gray-600">Connect with local groups and join mentorship programs</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <Compass className="w-8 h-8 text-indigo-600 mb-2" />
                    <h3 className="font-semibold text-indigo-700">MSME Knowledge</h3>
                    <p className="text-sm text-gray-600">Learn about business registration and government benefits</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <Play className="w-8 h-8 text-pink-600 mb-2" />
                    <h3 className="font-semibold text-pink-700">Navigation Guide</h3>
                    <p className="text-sm text-gray-600">Step-by-step tutorials for all platform features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">Quick Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">🎯 Getting Started</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Complete your profile for personalized recommendations</li>
                      <li>• Start with Financial Analysis to understand your current status</li>
                      <li>• Explore government schemes relevant to your state</li>
                      <li>• Join local SHG groups for community support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">💡 Pro Tips</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Update your financial data regularly for accurate insights</li>
                      <li>• Attend community events for networking opportunities</li>
                      <li>• Use the chatbot for quick answers and guidance</li>
                      <li>• Check for new schemes and benefits monthly</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutorials" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => {
                const IconComponent = tutorial.icon;
                const isCompleted = completedTutorials.includes(tutorial.id);
                
                return (
                  <Card key={tutorial.id} className={`${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCompleted ? 'bg-green-100' : 'bg-teal-100'}`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                              <IconComponent className="w-6 h-6 text-teal-600" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{tutorial.duration}</Badge>
                              <Badge variant="outline" className="text-xs">{tutorial.difficulty}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{tutorial.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Tutorial Steps:</h4>
                        <div className="space-y-2">
                          {tutorial.steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <span className="text-sm text-gray-700">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className={`flex-1 ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                          onClick={() => markTutorialComplete(tutorial.id)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          {isCompleted ? 'Completed' : 'Start Tutorial'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Tutorials Completed</span>
                  <span className="font-semibold">{completedTutorials.length} / {tutorials.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedTutorials.length / tutorials.length) * 100}%` }}
                  ></div>
                </div>
                {completedTutorials.length === tutorials.length && (
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-100 text-green-700 text-sm px-4 py-2">
                      🎉 Congratulations! You've completed all tutorials!
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
