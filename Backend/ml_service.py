#!/usr/bin/env python3
"""
ML Service for Loan Approval Prediction
Integrates the Credit Score ML model with the React app
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score, mean_squared_error
import pickle
import json
import sys
import os

class LoanApprovalMLService:
    def __init__(self):
        self.regression_model = None
        self.classification_model = None
        self.label_encoder = None
        self.features = None
        self.is_trained = False
        
    def load_and_prepare_data(self, csv_path="../loan_approval_dataset.csv"):
        """Load and prepare the dataset"""
        try:
            df = pd.read_csv(csv_path)
            df.columns = df.columns.str.strip()
            df.dropna(inplace=True)
            
            # Rename columns for clarity
            df.rename(columns={
                'income_annum': 'income_annum',
                'loan_amount': 'loan_amount',
                'cibil_score': 'credit_score',
                'self_employed': 'self_employed',
                'no_of_dependents': 'dependents',
            }, inplace=True)
            
            # Feature engineering
            df["monthly_income"] = df["income_annum"] / 12
            df["loan_to_income_ratio"] = df["loan_amount"] / (df["monthly_income"] + 1)
            df["income_stability_score"] = (df["self_employed"].str.lower() == "yes").astype(int)
            df["dependent_count"] = df["dependents"].replace("3+", 3).astype(float)
            
            # Simulated behavioral features for women-centric analysis
            np.random.seed(42)
            n = len(df)
            df["monthly_digital_txn_count"] = np.random.poisson(15, n).clip(0, 40)
            df["monthly_digital_txn_amount"] = np.random.normal(2000, 1000, n).clip(100, 8000)
            df["wallet_balance_avg"] = np.random.normal(800, 500, n).clip(0, 2000)
            df["avg_recharge_amount"] = np.random.normal(300, 100, n).clip(100, 500)
            df["electricity_bill_timeliness"] = np.random.choice([0, 1], n, p=[0.2, 0.8])
            df["rent_paid"] = np.random.choice([0, 1], n, p=[0.5, 0.5])
            df["SHG_membership"] = np.random.choice([0, 1], n, p=[0.4, 0.6])
            
            # Encode education
            df = pd.get_dummies(df, columns=["education"], drop_first=True)
            
            return df
            
        except Exception as e:
            print(f"Error loading data: {e}")
            return None
    
    def train_models(self, df):
        """Train both regression and classification models"""
        try:
            # Feature list
            self.features = [
                "monthly_income", "loan_amount", "loan_to_income_ratio", "income_stability_score",
                "dependent_count", "monthly_digital_txn_count", "monthly_digital_txn_amount",
                "wallet_balance_avg", "avg_recharge_amount", "electricity_bill_timeliness",
                "rent_paid", "SHG_membership"
            ] + [col for col in df.columns if col.startswith("education_")]
            
            X = df[self.features]
            y_regression = df["credit_score"]
            
            # Train regression model
            X_train, X_test, y_train, y_test = train_test_split(X, y_regression, test_size=0.3, random_state=42)
            self.regression_model = RandomForestRegressor(n_estimators=150, max_depth=12, random_state=42)
            self.regression_model.fit(X_train, y_train)
            
            # Train classification model
            df["credit_class"] = df["credit_score"].apply(self.map_score_to_class)
            y_classification = df["credit_class"]
            
            self.label_encoder = LabelEncoder()
            y_encoded = self.label_encoder.fit_transform(y_classification)
            
            X_train_class, X_test_class, y_train_class, y_test_class = train_test_split(
                X, y_encoded, test_size=0.3, random_state=42
            )
            
            self.classification_model = RandomForestClassifier(n_estimators=150, max_depth=10, random_state=42)
            self.classification_model.fit(X_train_class, y_train_class)
            
            self.is_trained = True
            
            # Calculate performance metrics
            y_pred_reg = self.regression_model.predict(X_test)
            r2 = r2_score(y_test, y_pred_reg)
            rmse = np.sqrt(mean_squared_error(y_test, y_pred_reg))
            
            return {
                "status": "success",
                "r2_score": r2,
                "rmse": rmse,
                "features_count": len(self.features)
            }
            
        except Exception as e:
            print(f"Error training models: {e}")
            return {"status": "error", "message": str(e)}
    
    def map_score_to_class(self, score):
        """Map credit score to risk class"""
        if score < 580:
            return "Poor"
        elif score < 670:
            return "Fair"
        elif score < 740:
            return "Good"
        elif score < 800:
            return "Very Good"
        else:
            return "Excellent"
    
    def predict_credit_score(self, user_data):
        """Predict credit score for a user"""
        if not self.is_trained:
            return {"error": "Model not trained"}
        
        try:
            # Create feature vector
            feature_vector = self.create_feature_vector(user_data)
            
            # Predict credit score
            predicted_score = self.regression_model.predict([feature_vector])[0]
            
            # Predict credit class
            predicted_class_encoded = self.classification_model.predict([feature_vector])[0]
            predicted_class = self.label_encoder.inverse_transform([predicted_class_encoded])[0]
            
            # Calculate loan eligibility
            loan_eligibility = self.calculate_loan_eligibility(predicted_score, user_data)
            
            return {
                "credit_score": round(predicted_score, 0),
                "credit_class": predicted_class,
                "loan_eligibility": loan_eligibility,
                "risk_factors": self.analyze_risk_factors(feature_vector, user_data)
            }
            
        except Exception as e:
            return {"error": str(e)}
    
    def create_feature_vector(self, user_data):
        """Create feature vector from user input"""
        # Base features
        monthly_income = user_data.get("monthly_income", 25000)
        loan_amount = user_data.get("loan_amount", 500000)
        dependent_count = user_data.get("dependents", 0)
        self_employed = 1 if user_data.get("self_employed", False) else 0
        
        # Calculated features
        loan_to_income_ratio = loan_amount / (monthly_income + 1)
        
        # Behavioral features (simulated based on user profile)
        digital_txn_count = user_data.get("digital_txn_count", 15)
        digital_txn_amount = user_data.get("digital_txn_amount", 2000)
        wallet_balance = user_data.get("wallet_balance", 800)
        recharge_amount = user_data.get("recharge_amount", 300)
        bill_timeliness = user_data.get("bill_timeliness", 1)
        rent_paid = user_data.get("rent_paid", 1)
        shg_membership = user_data.get("shg_membership", 0)
        
        # Education encoding (simplified)
        education_graduate = 1 if user_data.get("education") == "Graduate" else 0
        
        feature_vector = [
            monthly_income,
            loan_amount, 
            loan_to_income_ratio,
            self_employed,
            dependent_count,
            digital_txn_count,
            digital_txn_amount,
            wallet_balance,
            recharge_amount,
            bill_timeliness,
            rent_paid,
            shg_membership,
            education_graduate
        ]
        
        return feature_vector
    
    def calculate_loan_eligibility(self, credit_score, user_data):
        """Calculate loan eligibility based on credit score and other factors"""
        monthly_income = user_data.get("monthly_income", 25000)
        loan_amount = user_data.get("loan_amount", 500000)
        
        # Base eligibility on credit score
        if credit_score >= 750:
            max_loan = monthly_income * 60
            eligibility = "Excellent"
        elif credit_score >= 650:
            max_loan = monthly_income * 40
            eligibility = "Good"
        elif credit_score >= 550:
            max_loan = monthly_income * 25
            eligibility = "Fair"
        else:
            max_loan = monthly_income * 10
            eligibility = "Poor"
        
        # Check if requested loan is within limit
        approved = loan_amount <= max_loan
        
        return {
            "status": eligibility,
            "max_loan_amount": max_loan,
            "requested_amount": loan_amount,
            "approved": approved,
            "approval_probability": min(100, max(0, (credit_score - 300) / 5.5))
        }
    
    def analyze_risk_factors(self, feature_vector, user_data):
        """Analyze risk factors for the user"""
        risks = []
        recommendations = []
        
        monthly_income = feature_vector[0]
        loan_to_income_ratio = feature_vector[2]
        
        # Income analysis
        if monthly_income < 20000:
            risks.append("Low monthly income")
            recommendations.append("Consider skill development programs")
        
        # Debt-to-income ratio
        if loan_to_income_ratio > 0.5:
            risks.append("High loan-to-income ratio")
            recommendations.append("Consider reducing loan amount")
        
        # SHG membership benefit
        if feature_vector[11] == 1:
            recommendations.append("SHG membership is beneficial for credit building")
        else:
            recommendations.append("Consider joining a Self-Help Group")
        
        return {
            "risk_factors": risks,
            "recommendations": recommendations
        }

def main():
    """Main function to handle command line requests"""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No command provided"}))
        return
    
    command = sys.argv[1]
    ml_service = LoanApprovalMLService()
    
    if command == "train":
        # Train the model
        df = ml_service.load_and_prepare_data()
        if df is not None:
            result = ml_service.train_models(df)
            print(json.dumps(result))
        else:
            print(json.dumps({"error": "Failed to load data"}))
    
    elif command == "predict":
        # Get user data from command line argument
        if len(sys.argv) < 3:
            print(json.dumps({"error": "No user data provided"}))
            return
        
        try:
            user_data = json.loads(sys.argv[2])
            
            # First train the model
            df = ml_service.load_and_prepare_data()
            if df is not None:
                ml_service.train_models(df)
                result = ml_service.predict_credit_score(user_data)
                print(json.dumps(result))
            else:
                print(json.dumps({"error": "Failed to load data"}))
                
        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid JSON data"}))
    
    else:
        print(json.dumps({"error": "Unknown command"}))

if __name__ == "__main__":
    main()
