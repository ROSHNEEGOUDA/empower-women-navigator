import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Chrome, Phone, Shield, Globe } from "lucide-react";
import { DigiLockerModal } from "../components/DigiLockerModal";
import { useLanguage } from "../contexts/LanguageContext";

import { auth } from "../../firebase"; // your Firebase auth instance
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  User,
} from "firebase/auth";
import { exchangeFirebaseTokenForCustomJWT } from "../hooks/exchangeFirebaseTokenForCustomJWT";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
];

export default function Login() {
  const { language, setLanguage, t } = useLanguage();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [phoneMode, setPhoneMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const customJWT = await exchangeFirebaseTokenForCustomJWT(user);
      console.log("Custom JWT:", customJWT);

      setShowDigiLocker(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
    window.recaptchaVerifier.render();
  }
}, []);

 const handleSendOTP = async () => {
  if (phoneNumber.length >= 10) {
    const fullPhoneNumber = `+91${phoneNumber}`;
    try {
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );

      setConfirmationResult(result);
      setOtpSent(true);
      console.log("OTP sent to:", fullPhoneNumber);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Enter a valid phone number");
  }
};

const handleVerifyOTP = async () => {
  if (confirmationResult && otp.length === 6) {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const customJWT = await exchangeFirebaseTokenForCustomJWT(user);
      console.log("Custom JWT:", customJWT);

      setShowDigiLocker(true);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Invalid OTP");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Language Selector */}
        <div className="flex justify-center">
          <Select
            value={language}
            onValueChange={(value: string) => setLanguage(value as any)}
          >
            <SelectTrigger className="w-48 bg-white/80 backdrop-blur-md border-pink-200">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("selectLanguage")} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Card */}
        <Card className="bg-white/90 backdrop-blur-md border-pink-200 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {t("appName")}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-2">{t("subtitle")}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {authMode === "signin" ? t("welcomeBack") : t("signUp")}
              </h2>
              <p className="text-gray-600 text-sm">
                {authMode === "signin" ? t("signIn") : t("signUp")}
              </p>
            </div>

            {!phoneMode ? (
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="w-full h-12 border-pink-200 hover:bg-pink-50 text-gray-700"
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  {t("googleSignIn")}
                </Button>

                <Button
                  onClick={() => setPhoneMode(true)}
                  variant="outline"
                  className="w-full h-12 border-purple-200 hover:bg-purple-50 text-gray-700"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  {t("phoneSignIn")}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  {authMode === "signin" ? t("newUser") : t("existingUser")}{" "}
                  <button
                    onClick={() =>
                      setAuthMode(
                        authMode === "signin" ? "signup" : "signin"
                      )
                    }
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    {authMode === "signin"
                      ? t("signUpLink")
                      : t("signInLink")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {!otpSent ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        {t("phoneNumber")}
                      </Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md border">
                          <span className="text-gray-600">+91</span>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t("enterPhone")}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          maxLength={10}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleSendOTP}
                      disabled={phoneNumber.length < 10}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                      {t("sendOTP")}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-center space-y-4">
                      <p className="text-sm text-gray-600">{t("otpSent")}</p>
                      <p className="font-medium text-gray-800">
                        +91 {phoneNumber}
                      </p>

                      <div className="space-y-2">
                        <Label className="text-gray-700">{t("enterOTP")}</Label>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                          >
                            <InputOTPGroup>
                              {[...Array(6)].map((_, idx) => (
                                <InputOTPSlot key={idx} index={idx} />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                      {t("verify")}
                    </Button>
                  </>
                )}

                <Button
                  onClick={() => {
                    setPhoneMode(false);
                    setOtpSent(false);
                    setPhoneNumber("");
                    setOtp("");
                  }}
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  ← {t("back")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DigiLockerModal
        isOpen={showDigiLocker}
        onClose={() => setShowDigiLocker(false)}
      />

      <div id="recaptcha-container"></div>
    </div>
  );
}
