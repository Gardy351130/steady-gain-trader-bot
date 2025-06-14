
import { useState, useEffect } from 'react';

export interface Position {
  id: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  timestamp: Date;
}

export interface PaperTradingState {
  cash: number;
  positions: Position[];
  totalValue: number;
  totalPnL: number;
}

const INITIAL_CASH = 100000; // Start with $100k virtual money
const STORAGE_KEY = 'paper-trading-portfolio';

export const usePaperTrading = () => {
  const [portfolio, setPortfolio] = useState<PaperTradingState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        positions: parsed.positions.map((p: any) => ({
          ...p,
          timestamp: new Date(p.timestamp)
        }))
      };
    }
    return {
      cash: INITIAL_CASH,
      positions: [],
      totalValue: INITIAL_CASH,
      totalPnL: 0
    };
  });

  // Save to localStorage whenever portfolio changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  }, [portfolio]);

  const buyStock = (symbol: string, quantity: number, price: number) => {
    const cost = quantity * price;
    if (cost > portfolio.cash) {
      throw new Error('Insufficient funds');
    }

    const newPosition: Position = {
      id: Date.now().toString(),
      symbol,
      quantity,
      buyPrice: price,
      currentPrice: price,
      pnl: 0,
      pnlPercent: 0,
      timestamp: new Date()
    };

    setPortfolio(prev => ({
      ...prev,
      cash: prev.cash - cost,
      positions: [...prev.positions, newPosition]
    }));
  };

  const sellStock = (positionId: string, quantity: number, price: number) => {
    setPortfolio(prev => {
      const position = prev.positions.find(p => p.id === positionId);
      if (!position || quantity > position.quantity) {
        throw new Error('Invalid sell order');
      }

      const revenue = quantity * price;
      const updatedPositions = prev.positions.map(p => {
        if (p.id === positionId) {
          if (p.quantity === quantity) {
            return null; // Remove position
          }
          return { ...p, quantity: p.quantity - quantity };
        }
        return p;
      }).filter(Boolean) as Position[];

      return {
        ...prev,
        cash: prev.cash + revenue,
        positions: updatedPositions
      };
    });
  };

  const updatePositionPrices = (marketData: Array<{ symbol: string; price: number }>) => {
    setPortfolio(prev => {
      const updatedPositions = prev.positions.map(position => {
        const marketPrice = marketData.find(m => m.symbol === position.symbol)?.price;
        if (marketPrice) {
          const pnl = (marketPrice - position.buyPrice) * position.quantity;
          const pnlPercent = ((marketPrice - position.buyPrice) / position.buyPrice) * 100;
          return {
            ...position,
            currentPrice: marketPrice,
            pnl,
            pnlPercent
          };
        }
        return position;
      });

      const totalPositionValue = updatedPositions.reduce((sum, pos) => 
        sum + (pos.currentPrice * pos.quantity), 0
      );
      const totalPnL = updatedPositions.reduce((sum, pos) => sum + pos.pnl, 0);

      return {
        ...prev,
        positions: updatedPositions,
        totalValue: prev.cash + totalPositionValue,
        totalPnL
      };
    });
  };

  const resetPortfolio = () => {
    setPortfolio({
      cash: INITIAL_CASH,
      positions: [],
      totalValue: INITIAL_CASH,
      totalPnL: 0
    });
  };

  return {
    portfolio,
    buyStock,
    sellStock,
    updatePositionPrices,
    resetPortfolio
  };
};
