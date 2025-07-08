import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, FileCheck, ExternalLink, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface DigiLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigiLockerModal({ isOpen, onClose }: DigiLockerModalProps) {
  const [verificationStep, setVerificationStep] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinueToApp = () => {
    navigate("/");
    onClose();
  };

  const handleLinkDigiLocker = () => {
    window.open("https://www.digilocker.gov.in/", "_blank");
    setVerificationStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border-pink-200">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {t("digiLockerTitle")}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {t("digiLockerDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {verificationStep === 0 ? (
            <>
              {/* Benefits Card */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    {t("whyDigiLocker")}
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {t("secureStorage")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {t("instantVerification")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {t("paperlessKYC")}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {t("dataProtection")}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleLinkDigiLocker}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("linkPAN")}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {t("alreadyLinked")}
                  </p>
                  <Link to="/dashboard">
                    <Button
                    onClick={handleContinueToApp}
                    variant="outline"
                    className="border-pink-200 hover:bg-pink-50"
                  >
                    {t("continueApp")}
                  </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Progress */}
              <div className="space-y-4">
                <div className="text-center">
                  <Progress value={75} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    Verification in progress...
                  </p>
                </div>

                {/* Steps */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      {t("verificationSteps")}
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>{t("step1")}</li>
                      <li>{t("step2")}</li>
                      <li>{t("step3")}</li>
                      <li>{t("step4")}</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button
                    onClick={handleContinueToApp}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    {t("continueApp")}
                  </Button>
                  <Link to="/dashboard">
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      className="w-full text-gray-600 hover:text-gray-800"
                    >
                      {t("skipForNow")}
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
