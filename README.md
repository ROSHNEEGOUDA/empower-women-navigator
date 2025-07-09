# Women's Financial Empowerment Navigator 🚀

An AI-powered platform designed to empower women with financial tools, loan approval predictions, and comprehensive financial guidance.

## 🌟 Project Overview

This application combines machine learning with women-centric financial services to provide:
- **AI-powered loan approval predictions**
- **Credit score analysis and recommendations**
- **Government schemes and SHG community features**
- **Comprehensive financial analysis tools**
- **Multi-language support for accessibility**

**Live Demo**: https://empower-women-navigator.vercel.app/

## 🤖 ML Model Features

### Credit Score Prediction
- **Random Forest Regressor** for accurate credit score prediction (300-850 range)
- **Alternative data sources** including digital transaction patterns
- **SHG membership integration** for enhanced scoring
- **Women-specific behavioral features**

### Loan Approval System
- **Real-time approval probability** calculation (0-100%)
- **Maximum loan amount** estimation based on income and credit profile
- **Risk factor analysis** with personalized recommendations
- **Government scheme suggestions** tailored for women entrepreneurs

### Key ML Features:
- 📊 **Credit Classification**: Poor, Fair, Good, Very Good, Excellent
- 💰 **Loan Eligibility**: Smart approval decisions
- ⚠️ **Risk Assessment**: Comprehensive factor analysis
- 👥 **SHG Benefits**: Community-based credit enhancement
- 📱 **Digital Finance**: Transaction pattern analysis

## 🚀 Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Python 3.8+ for ML backend
- Firebase account for authentication

### Installation & Setup

#### 1. Clone the Repository
```sh
git clone <YOUR_GIT_URL>
cd empower-women-navigator
```

#### 2. Frontend Setup
```sh
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

#### 3. Backend Setup
```sh
# Navigate to backend directory
cd Backend

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
node server.js
```

#### 4. Environment Configuration
- Add your Firebase service account key to `Backend/serviceAccountKey.json`
- Configure your Firebase project settings in `firebase.tsx`

### 🖥️ Running the Application
- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:3000`
- **ML Endpoints**: Available at `/ml/predict-loan` and `/ml/train`

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible components
- **Firebase Auth** - Secure authentication
- **React Query** - Server state management

### Backend
- **Node.js/Express** - RESTful API server
- **Firebase Admin** - User authentication & management
- **JWT** - Secure token-based auth
- **Python** - ML model serving
- **CORS** - Cross-origin resource sharing

### Machine Learning
- **Python 3.8+** - ML runtime environment
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **Random Forest** - Credit scoring algorithm
- **Feature Engineering** - Alternative data processing

### Database & Deployment
- **Firebase Firestore** - NoSQL database
- **Vercel** - Frontend deployment
- **Node.js Server** - Backend hosting

## 📊 Project Structure

```
empower-women-navigator/
├── src/                          # Frontend React application
│   ├── components/               # UI components
│   │   ├── LoanGeneratorModal.tsx    # ML-powered loan analyzer
│   │   ├── AnalysisModal.tsx         # Financial analysis tools
│   │   ├── Dashboard.tsx             # Main dashboard
│   │   └── ui/                       # Reusable UI components
│   ├── lib/                      # Utilities and helpers
│   │   ├── mlApi.ts                  # ML API integration
│   │   └── utils.ts                  # Common utilities
│   ├── contexts/                 # React contexts
│   └── pages/                    # Application pages
├── Backend/                      # Backend services
│   ├── server.js                 # Express API server
│   ├── ml_service.py             # Python ML service
│   ├── package.json              # Node.js dependencies
│   └── requirements.txt          # Python dependencies
├── public/                       # Static assets
└── Credit_Score_2.ipynb          # ML model development notebook
```

## 🎯 Key Features

### 🔮 AI-Powered Loan Generator
- Real-time credit score prediction
- Loan approval probability analysis
- Maximum loan amount calculation
- Risk factor identification
- Personalized recommendations

### 📈 Financial Analysis Dashboard
- Income, expenditure, and savings tracking
- Interactive charts and visualizations
- Financial health scoring
- Goal setting and progress tracking

### 🏛️ Government Schemes Integration
- Mudra Yojana information
- Stand-Up India scheme details
- Women-specific loan programs
- Application guidance and links

### 👥 SHG Community Features
- Self-Help Group benefits
- Community lending opportunities
- Group guarantee support
- Financial literacy resources

### 🌐 Accessibility & Inclusion
- Multi-language support
- Mobile-responsive design
- Screen reader compatibility
- Simple, intuitive interface

## 🧪 ML Model Details

### Dataset Features
- **Traditional Data**: Income, loan amount, education, employment
- **Alternative Data**: Digital transactions, utility payments, mobile usage
- **Social Data**: SHG membership, community involvement
- **Behavioral Data**: Payment history, financial discipline

### Model Performance
- **Algorithm**: Random Forest (Regression + Classification)
- **Features**: 13 engineered features
- **Accuracy**: Optimized for women-centric financial patterns
- **Real-time**: Sub-second prediction latency

### Prediction Outputs
1. **Credit Score** (300-850 range)
2. **Credit Class** (Poor/Fair/Good/Very Good/Excellent)
3. **Loan Eligibility** (Approved/Not Approved)
4. **Maximum Loan Amount**
5. **Approval Probability** (0-100%)
6. **Risk Factors** and **Recommendations**

## 🔐 Security & Privacy

- **Firebase Authentication** - Secure user management
- **JWT Tokens** - Stateless authentication
- **Data Encryption** - All sensitive data encrypted
- **Privacy First** - No personal data stored unnecessarily
- **GDPR Compliant** - Data protection standards

## 🚀 Deployment

### Frontend (Vercel)
```sh
npm run build
# Deploy to Vercel via GitHub integration
```

### Backend
- Deploy Express server to your preferred hosting platform
- Ensure Python environment is configured for ML service
- Configure environment variables for production

## 🤝 Contributing

We welcome contributions! This project has been enhanced with ML capabilities as a collaborative effort.

### 🎯 **Recent ML Integration Contribution**
This repository includes a significant machine learning enhancement contributed to the original [empower-women-navigator](https://github.com/ROSHNEEGOUDA/empower-women-navigator) project:

**ML Features Added:**
- 🧠 **AI-Powered Loan Approval System** - Real-time credit scoring and loan predictions
- 📊 **Credit Risk Classification** - 5-tier classification system (Poor to Excellent)  
- 🎯 **Personalized Recommendations** - Risk analysis and financial guidance
- 👥 **SHG Integration** - Self-Help Group membership benefits in scoring
- 📱 **Alternative Data Processing** - Digital transaction patterns and behavioral features

**Technical Implementation:**
- `Backend/ml_service.py` - Python ML service with Random Forest models
- `src/lib/mlApi.ts` - Frontend ML API integration  
- `src/components/LoanGeneratorModal.tsx` - Enhanced UI with ML predictions
- `Backend/server.js` - Added ML prediction endpoints

### 🔄 **How to Contribute:**

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) for rapid prototyping
- Thanks to the open-source community for the amazing tools
- Special thanks to women entrepreneurs who inspired this project

**Made with ❤️ for women's financial empowerment**
