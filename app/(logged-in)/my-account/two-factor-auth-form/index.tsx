"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { activate2fa, get2faSecret } from "./actions";
import { toast } from "sonner";
import { QRCodeSVG as QRCode } from "qrcode.react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
  twoFactorActivated: boolean;
};

export function TwoFactorAuthForm({ twoFactorActivated }: Props) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState("");

  const onEnableClick = async () => {
    const response = await get2faSecret();
    if (response.error) {
      toast.error(response.message);
      return;
    }
    setStep(2);
    setCode(response.twoFactorSecret ?? "");
  };

  const onOTPSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await activate2fa(otp);
    if (response?.error) {
      toast.error(response.message);
      return;
    }
    toast.success("Two-Factor Authentication has been enabled");

    setIsActivated(true);
  };

  const onDisable2faClick = async () => {
    //await disable2fa();
    toast.success("Two-Factor Authentication has been disabled");
    setIsActivated(false);
  };

  return (
    <>
      {!!isActivated && (
        <Button variant="destructive" onClick={onDisable2faClick}>
          Disable Two-Factor Authentication
        </Button>
      )}

      {!isActivated && (
        <div>
          {step === 1 && (
            <Button onClick={onEnableClick}>
              Enable Two-Factor Authentication
            </Button>
          )}

          {step === 2 && (
            <>
              <p className="text-xs text-muted-foreground py-2">
                Scan the QR code below in the Google Authenticator app to
                activate Two-Factor Authentication.
              </p>
              <div className="flex justify-center my-2">
                <QRCode value={code} />
              </div>
              <Button onClick={() => setStep(3)} className="w-full my-1">
                I have scanned the QR code
              </Button>
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-full my-1"
              >
                Cancel
              </Button>
            </>
          )}

          {step === 3 && (
            <form onSubmit={onOTPSubmit} className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">
                Please enter the one-time passcode from the Google Authenticator
                app.
              </p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button disabled={otp.length !== 6} type="submit">
                Submit and activate
              </Button>
              <Button onClick={() => setStep(2)} variant="outline">
                Cancel
              </Button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
