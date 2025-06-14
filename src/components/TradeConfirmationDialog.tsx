
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, DollarSign, TrendingUp } from "lucide-react";
import { RiskViolation } from "@/hooks/useRiskControls";

interface TradeConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  symbol: string;
  quantity: number;
  price: number;
  violations: RiskViolation[];
}

export function TradeConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  symbol,
  quantity,
  price,
  violations
}: TradeConfirmationDialogProps) {
  const tradeValue = quantity * price;
  const hasErrors = violations.some(v => v.severity === 'error');
  const hasWarnings = violations.some(v => v.severity === 'warning');

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {hasErrors ? (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            ) : (
              <TrendingUp className="h-5 w-5 text-blue-600" />
            )}
            {hasErrors ? 'Trade Blocked' : 'Confirm Your Trade'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Review your trade details and any safety warnings below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4">
          {/* Trade Summary */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-2">Trade Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Stock:</span>
                <span className="font-medium">{symbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{quantity} shares</span>
              </div>
              <div className="flex justify-between">
                <span>Price per share:</span>
                <span>${price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span className="font-medium">Total Cost:</span>
                <span className="font-medium flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {tradeValue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Violations */}
          {violations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Safety Alerts</h4>
              {violations.map((violation, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg ${
                    violation.severity === 'error' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`h-4 w-4 ${
                      violation.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                    <Badge variant={violation.severity === 'error' ? "destructive" : "default"}>
                      {violation.severity === 'error' ? 'Blocked' : 'Warning'}
                    </Badge>
                  </div>
                  <p className="text-sm">{violation.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {!hasErrors && (
            <AlertDialogAction onClick={onConfirm}>
              Confirm Trade
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
