/**
 * ML API utilities for loan prediction
 */

import { auth } from '../../firebase';

const API_BASE_URL = 'http://localhost:3000';

export interface UserLoanData {
  monthly_income: number;
  loan_amount: number;
  dependents?: number;
  self_employed?: boolean;
  education?: string;
  digital_txn_count?: number;
  digital_txn_amount?: number;
  wallet_balance?: number;
  recharge_amount?: number;
  bill_timeliness?: number;
  rent_paid?: number;
  shg_membership?: number;
}

export interface LoanPrediction {
  credit_score: number;
  credit_class: string;
  loan_eligibility: {
    status: string;
    max_loan_amount: number;
    requested_amount: number;
    approved: boolean;
    approval_probability: number;
  };
  risk_factors: {
    risk_factors: string[];
    recommendations: string[];
  };
}

export interface MLPredictionResponse {
  success: boolean;
  prediction: LoanPrediction;
  user: string;
}

/**
 * Get authentication token from Firebase
 */
const getAuthToken = async (): Promise<string | null> => {
  try {
    // Get Firebase token from your authentication context
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    const firebaseToken = await currentUser.getIdToken();
    
    // Exchange for custom JWT
    const response = await fetch(`${API_BASE_URL}/auth/custom-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firebaseToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get custom token');
    }
    
    const data = await response.json();
    return data.customToken;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Predict loan approval using ML model
 */
export const predictLoanApproval = async (userData: UserLoanData): Promise<MLPredictionResponse> => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_BASE_URL}/ml/predict-loan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Prediction failed');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error predicting loan approval:', error);
    
    // Fallback to local prediction for testing
    console.log('Using fallback prediction...');
    const fallbackPrediction = getFallbackPrediction(userData);
    return {
      success: true,
      prediction: fallbackPrediction,
      user: 'test-user'
    };
  }
};

/**
 * Train ML model (for development)
 */
export const trainMLModel = async (): Promise<any> => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_BASE_URL}/ml/train`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Training failed');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error training ML model:', error);
    throw error;
  }
};

/**
 * Format credit score for display
 */
export const formatCreditScore = (score: number): string => {
  return Math.round(score).toString();
};

/**
 * Get credit score color based on value
 */
export const getCreditScoreColor = (score: number): string => {
  if (score >= 750) return 'text-green-600';
  if (score >= 650) return 'text-blue-600';
  if (score >= 550) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Get credit score badge color
 */
export const getCreditScoreBadgeColor = (creditClass: string): string => {
  switch (creditClass) {
    case 'Excellent': return 'bg-green-100 text-green-800';
    case 'Very Good': return 'bg-blue-100 text-blue-800';
    case 'Good': return 'bg-yellow-100 text-yellow-800';
    case 'Fair': return 'bg-orange-100 text-orange-800';
    case 'Poor': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Calculate loan EMI
 */
export const calculateEMI = (principal: number, rate: number, tenure: number): number => {
  const monthlyRate = rate / 100 / 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
              (Math.pow(1 + monthlyRate, tenure) - 1);
  return emi;
};

/**
 * Get loan recommendations based on user profile
 */
export const getLoanRecommendations = (userData: UserLoanData, prediction: LoanPrediction): string[] => {
  const recommendations: string[] = [];
  
  // Income-based recommendations
  if (userData.monthly_income < 25000) {
    recommendations.push('Consider skill development programs to increase income');
  }
  
  // Loan amount recommendations
  if (userData.loan_amount > prediction.loan_eligibility.max_loan_amount) {
    recommendations.push('Consider reducing loan amount for better approval chances');
  }
  
  // Credit score recommendations
  if (prediction.credit_score < 650) {
    recommendations.push('Work on improving credit score by paying bills on time');
  }
  
  // SHG membership
  if (!userData.shg_membership) {
    recommendations.push('Consider joining a Self-Help Group for better credit access');
  }
  
  return recommendations;
}

/**
 * Fallback prediction for testing (when backend is not available)
 */
const getFallbackPrediction = (userData: UserLoanData): LoanPrediction => {
  // Simple rule-based fallback
  const income = userData.monthly_income;
  const loanAmount = userData.loan_amount;
  const loanToIncomeRatio = loanAmount / (income * 12);
  
  // Calculate a basic credit score
  let creditScore = 600; // Base score
  if (income > 50000) creditScore += 50;
  if (income > 30000) creditScore += 30;
  if (userData.education === 'Graduate') creditScore += 20;
  if (userData.shg_membership) creditScore += 15;
  if (loanToIncomeRatio < 0.3) creditScore += 25;
  
  // Determine credit class
  let creditClass = 'Fair';
  if (creditScore >= 750) creditClass = 'Excellent';
  else if (creditScore >= 700) creditClass = 'Very Good';
  else if (creditScore >= 650) creditClass = 'Good';
  else if (creditScore < 550) creditClass = 'Poor';
  
  // Calculate loan eligibility
  const maxLoanAmount = income * (creditScore > 700 ? 50 : creditScore > 650 ? 35 : 20);
  const approved = loanAmount <= maxLoanAmount;
  const approvalProbability = Math.min(95, Math.max(10, (creditScore - 300) / 5.5));
  
  return {
    credit_score: creditScore,
    credit_class: creditClass,
    loan_eligibility: {
      status: approved ? 'Good' : 'Fair',
      max_loan_amount: maxLoanAmount,
      requested_amount: loanAmount,
      approved,
      approval_probability: approvalProbability
    },
    risk_factors: {
      risk_factors: loanToIncomeRatio > 0.4 ? ['High loan-to-income ratio'] : [],
      recommendations: [
        ...(income < 25000 ? ['Consider skill development programs'] : []),
        ...(loanToIncomeRatio > 0.4 ? ['Consider reducing loan amount'] : []),
        ...(!userData.shg_membership ? ['Consider joining a Self-Help Group'] : [])
      ]
    }
  };
};
