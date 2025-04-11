import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const PaymentForm: React.FC = () => {
  const [email, setEmail] = React.useState("zain.wasteem@cloudbin.com.au");
  const [cardNumber, setCardNumber] = React.useState("1234 1234 1234 1234");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [cardholderName, setCardholderName] = React.useState("");
  const [saveInfo, setSaveInfo] = React.useState(false);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-center text-xl font-semibold">
            AdvancedCare, Inc.
          </CardTitle>
          <p className="text-center text-sm text-gray-500">[TEST MODE]</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="text-center">
            <h2 className="text-lg font-medium">Subscribe to Enterprise Plan</h2>
            <p className="text-2xl font-bold">US$29.00 per month</p>
            <p className="text-sm text-gray-500">
              SEO Audit Tool for Healthcare & Wellness Clinics.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Pay with card</Label>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Card information</Label>
                <Input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 1234 1234 1234"
                />
                <div className="flex gap-2">
                  <Input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="flex-1"
                  />
                  <Input
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="cardholder">Cardholder name</Label>
                <Input
                  id="cardholder"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Full name on card"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="country">Country or region</Label>
                <Input
                  id="country"
                  value="Pakistan"
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="save-info"
              checked={saveInfo}
              onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
            />
            <Label htmlFor="save-info" className="text-sm font-normal">
              Securely save my information for 1-click checkout
              <p className="text-xs text-gray-500">
                Pay faster on AdvancedCare, Inc. and everywhere Link is accepted.
              </p>
            </Label>
          </div>

          <Button className="w-full mt-2">Subscribe</Button>

          <p className="text-xs text-gray-500 text-center">
            By continuing your subscription, you allow AdvancedCare, Inc. to charge you for future updates in accordance with their terms. You can always cancel your subscription.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Powered by <strong>stripe</strong></span>
            <span>|</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>|</span>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;