"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  twoFactorActivated: boolean;
};

export function TwoFactorAuthForm({ twoFactorActivated }: Props) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);

  const onEnableClick = async () => {
    setStep(2);

    // const response = await get2faSecret();
    // if (response.error) {
    //   toast({
    //     variant: "destructive",
    //     title: response.message,
    //   });
    //   return;
    // }
    //
    // setCode(response.twoFactorSecret ?? "");
  };

  return (
    <div>
      {!isActivated && (
        <div>
          {step === 1 && (
            <Button onClick={onEnableClick}>
              Enable Two-Factor Authentication
            </Button>
          )}

          {step === 2 && (
            <div>
              <p className="text-xs text-muted-foreground py-2">
                Scan the QR code below in the Google Authenticator app to
                activate Two-Factor Authentication.
              </p>
              {/* <QRCode value={code} /> */}
              <Button onClick={() => setStep(3)} className="w-full my-2">
                I have scanned the QR code
              </Button>
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-full my-2"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
