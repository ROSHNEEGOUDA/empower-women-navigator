
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, MapPin, MessageCircle, Heart, Award } from 'lucide-react';

interface SHGCommunityModalProps {
  onClose: () => void;
}

export const SHGCommunityModal: React.FC<SHGCommunityModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('groups');

  const shgGroups = [
    {
      name: 'Sarvashakti Women SHG',
      location: 'Mumbai, Maharashtra',
      members: 12,
      focus: 'Microfinance & Tailoring',
      established: '2019',
      nextMeeting: '2024-07-15',
      description: 'Empowering women through financial literacy and skill development'
    },
    {
      name: 'Pragati Mahila Mandal',
      location: 'Pune, Maharashtra',
      members: 15,
      focus: 'Food Processing & Savings',
      established: '2018',
      nextMeeting: '2024-07-12',
      description: 'Creating sustainable livelihoods through food processing business'
    },
    {
      name: 'Sakhi Support Group',
      location: 'Bangalore, Karnataka',
      members: 18,
      focus: 'Digital Literacy & Crafts',
      established: '2020',
      nextMeeting: '2024-07-18',
      description: 'Bridging the digital divide and promoting traditional crafts'
    }
  ];

  const events = [
    {
      title: 'Financial Planning Workshop',
      date: '2024-07-20',
      time: '10:00 AM',
      location: 'Community Center, Andheri',
      attendees: 45,
      type: 'Workshop'
    },
    {
      title: 'Women Entrepreneurs Meet',
      date: '2024-07-25',
      time: '2:00 PM',
      location: 'Business Hub, Bandra',
      attendees: 30,
      type: 'Networking'
    },
    {
      title: 'Skill Development Session',
      date: '2024-08-01',
      time: '11:00 AM',
      location: 'Training Center, Powai',
      attendees: 25,
      type: 'Training'
    }
  ];

  const mentors = [
    {
      name: 'Dr. Sunita Patel',
      expertise: 'Financial Planning',
      experience: '15 years',
      rating: 4.9,
      sessions: 120
    },
    {
      name: 'Priya Sharma',
      expertise: 'Business Development',
      experience: '12 years',
      rating: 4.8,
      sessions: 95
    },
    {
      name: 'Meera Krishnan',
      expertise: 'Digital Marketing',
      experience: '8 years',
      rating: 4.7,
      sessions: 75
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-700 flex items-center">
            🧑‍🤝‍🧑 SHG Community Hub
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groups">Local SHGs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="mentors">Mentorship</TabsTrigger>
          </TabsList>
          
          <TabsContent value="groups" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {shgGroups.map((group, index) => (
                <Card key={index} className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {group.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {group.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700">{group.description}</p>
                    
                    <div className="flex justify-between text-sm">
                      <span>Members: <strong>{group.members}</strong></span>
                      <span>Since: <strong>{group.established}</strong></span>
                    </div>
                    
                    <Badge className="bg-orange-100 text-orange-700">
                      {group.focus}
                    </Badge>
                    
                    <div className="flex items-center text-sm text-green-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Next Meeting: {group.nextMeeting}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Join Group
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {events.map((event, index) => (
                <Card key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-700">{event.title}</CardTitle>
                      <Badge className="bg-blue-100 text-blue-700">{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-green-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} women registered
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Register Now
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Discuss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mentors" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {mentors.map((mentor, index) => (
                <Card key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarImage src={`/api/placeholder/64/64`} alt={mentor.name} />
                      <AvatarFallback className="bg-purple-500 text-white text-lg">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg text-purple-700">{mentor.name}</CardTitle>
                    <p className="text-sm text-gray-600">{mentor.expertise}</p>
                  </CardHeader>
                  <CardContent className="space-y-3 text-center">
                    <div className="flex justify-center items-center space-x-4 text-sm">
                      <div>
                        <p className="font-semibold">{mentor.experience}</p>
                        <p className="text-gray-500">Experience</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center">
                          <Award className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="font-semibold">{mentor.rating}</span>
                        </div>
                        <p className="text-gray-500">Rating</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {mentor.sessions} successful mentoring sessions
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Heart className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
