
import { useState, useEffect } from 'react';

export interface RiskSettings {
  maxPositionSize: number; // Maximum $ amount per position
  maxDailyTrades: number; // Maximum trades per day
  stopLossEnabled: boolean; // Automatic stop loss
  stopLossPercent: number; // Stop loss percentage
  requireConfirmation: boolean; // Require confirmation for all trades
  allowedSymbols: string[]; // Whitelist of allowed stocks
  dailyLossLimit: number; // Maximum daily loss amount
}

export interface RiskViolation {
  type: 'position_size' | 'daily_trades' | 'daily_loss' | 'symbol_not_allowed' | 'insufficient_funds';
  message: string;
  severity: 'warning' | 'error';
}

const DEFAULT_RISK_SETTINGS: RiskSettings = {
  maxPositionSize: 1000, // $1,000 max per position
  maxDailyTrades: 5, // 5 trades per day max
  stopLossEnabled: true,
  stopLossPercent: 10, // 10% stop loss
  requireConfirmation: true,
  allowedSymbols: ['SPY', 'QQQ', 'IWM', 'VTI', 'AAPL', 'MSFT', 'GOOGL'], // Conservative ETFs and blue chips
  dailyLossLimit: 500 // $500 daily loss limit
};

const STORAGE_KEY = 'risk-control-settings';

export const useRiskControls = () => {
  const [riskSettings, setRiskSettings] = useState<RiskSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_RISK_SETTINGS;
  });

  const [dailyTradeCount, setDailyTradeCount] = useState(0);
  const [dailyLoss, setDailyLoss] = useState(0);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(riskSettings));
  }, [riskSettings]);

  // Reset daily counters at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilReset = tomorrow.getTime() - now.getTime();
    
    const timer = setTimeout(() => {
      setDailyTradeCount(0);
      setDailyLoss(0);
    }, timeUntilReset);

    return () => clearTimeout(timer);
  }, []);

  const validateTrade = (
    symbol: string, 
    quantity: number, 
    price: number, 
    availableCash: number
  ): RiskViolation[] => {
    const violations: RiskViolation[] = [];
    const tradeValue = quantity * price;

    // Check if symbol is allowed
    if (!riskSettings.allowedSymbols.includes(symbol)) {
      violations.push({
        type: 'symbol_not_allowed',
        message: `${symbol} is not in your approved trading list. Only conservative stocks and ETFs are allowed.`,
        severity: 'error'
      });
    }

    // Check position size limit
    if (tradeValue > riskSettings.maxPositionSize) {
      violations.push({
        type: 'position_size',
        message: `Trade value $${tradeValue.toFixed(2)} exceeds your maximum position size of $${riskSettings.maxPositionSize}.`,
        severity: 'error'
      });
    }

    // Check daily trade limit
    if (dailyTradeCount >= riskSettings.maxDailyTrades) {
      violations.push({
        type: 'daily_trades',
        message: `You've reached your daily limit of ${riskSettings.maxDailyTrades} trades. Consider taking a break.`,
        severity: 'error'
      });
    }

    // Check sufficient funds
    if (tradeValue > availableCash) {
      violations.push({
        type: 'insufficient_funds',
        message: `Insufficient funds. You need $${tradeValue.toFixed(2)} but only have $${availableCash.toFixed(2)}.`,
        severity: 'error'
      });
    }

    // Check daily loss limit
    if (dailyLoss >= riskSettings.dailyLossLimit) {
      violations.push({
        type: 'daily_loss',
        message: `You've reached your daily loss limit of $${riskSettings.dailyLossLimit}. Trading is disabled for today.`,
        severity: 'error'
      });
    }

    return violations;
  };

  const recordTrade = (pnl: number = 0) => {
    setDailyTradeCount(prev => prev + 1);
    if (pnl < 0) {
      setDailyLoss(prev => prev + Math.abs(pnl));
    }
  };

  const updateRiskSettings = (newSettings: Partial<RiskSettings>) => {
    setRiskSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setRiskSettings(DEFAULT_RISK_SETTINGS);
    setDailyTradeCount(0);
    setDailyLoss(0);
  };

  return {
    riskSettings,
    dailyTradeCount,
    dailyLoss,
    validateTrade,
    recordTrade,
    updateRiskSettings,
    resetToDefaults
  };
};
