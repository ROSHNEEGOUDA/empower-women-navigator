import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CreditCard,
  FileText,
  Users,
  BookOpen,
  Compass,
  Heart,
  TrendingUp,
  Award,
  Building2,
} from "lucide-react";
import { FloatingStats } from "./FloatingStats";
import { AnalysisModal } from "./AnalysisModal";
import { LoanGeneratorModal } from "./LoanGeneratorModal";
import { SchemesModal } from "./SchemesModal";
import { SHGCommunityModal } from "./SHGCommunityModal";
import { MSMEKnowledgeModal } from "./MSMEKnowledgeModal";
import { NavigationGuideModal } from "./NavigationGuideModal";
import { ChatbotAssistant } from "./ChatbotAssistant";
import { useLanguage } from "../contexts/LanguageContext";
import { getAuth } from "firebase/auth";
import { ProfileDropdown } from "./ProfileDropdown";

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const { t } = useLanguage();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.phoneNumber || "User");
        setUserEmail(user.email || "");
      } else {
        setUserName("");
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  const features = [
    {
      id: "analysis",
      title: t("financialAnalysis"),
      description: t("financialAnalysisDesc"),
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      id: "loan",
      title: t("loanGenerator"),
      description: t("loanGeneratorDesc"),
      icon: CreditCard,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      id: "schemes",
      title: t("governmentSchemes"),
      description: t("governmentSchemesDesc"),
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      id: "shg",
      title: t("shgCommunity"),
      description: t("shgCommunityDesc"),
      icon: Users,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      id: "msme",
      title: t("msmeKnowledge"),
      description: t("msmeKnowledgeDesc"),
      icon: BookOpen,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      id: "guide",
      title: t("navigationGuide"),
      description: t("navigationGuideDesc"),
      icon: Compass,
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
  ];

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 mb-10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {t("CreditSakti")}
                </h1>
                <p className="text-sm text-gray-600">
                  {t("dashboardSubtitle")}
                </p>
              </div>
            </div>
            <ProfileDropdown
              user={{
                displayName: userName,
                email: userEmail,
              }}
              notifications={5}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("welcomeBack")}, {userName}
          </h2>
          <p className="text-gray-600">{t("journeyMessage")}</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 shadow-md bg-white/70 backdrop-blur-sm"
                onClick={() => openModal(feature.id)}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-7 h-7 ${feature.textColor}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button
                    variant="ghost"
                    className={`mt-3 w-full bg-gradient-to-r ${feature.color} text-white hover:opacity-90 transition-opacity`}
                  >
                    {t("exploreNow")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100">{t("thisMonth")}</p>
                  <p className="text-2xl font-bold">₹45,200</p>
                  <p className="text-sm text-pink-100">{t("totalSavings")}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">{t("creditScore")}</p>
                  <p className="text-2xl font-bold">750</p>
                  <p className="text-sm text-purple-100">{t("excellent")}</p>
                </div>
                <Award className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100">{t("activeSchemes")}</p>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-teal-100">
                    {t("governmentBenefits")}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Floating Stats */}
      <FloatingStats />

      {/* Chatbot Assistant */}
      <ChatbotAssistant />

      {/* Modals */}
      {activeModal === "analysis" && <AnalysisModal onClose={closeModal} />}
      {activeModal === "loan" && <LoanGeneratorModal onClose={closeModal} />}
      {activeModal === "schemes" && <SchemesModal onClose={closeModal} />}
      {activeModal === "shg" && <SHGCommunityModal onClose={closeModal} />}
      {activeModal === "msme" && <MSMEKnowledgeModal onClose={closeModal} />}
      {activeModal === "guide" && <NavigationGuideModal onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
