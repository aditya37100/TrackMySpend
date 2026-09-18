import { useState } from "react";
import { HiMail } from "react-icons/hi";
import EmailInput from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export default function Input({getstarted, loading}) {
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");

      const handleSignIn = () => {
        if (email && password) {
            getstarted(email, password);
        }
      };

  return (
    <div className="flex flex-col justify-center items-center">
      <EmailInput email={email} setEmail={setEmail}/>
      <PasswordInput password={password} setPassword={setPassword}/>
      <div className="pt-2 pb-6 font-segoe">Not Registered yet? <Link to="/signup">Click Here!</Link> </div>
      <Button label={loading ? "Signing in..." : "Signin"} trynow={handleSignIn} disabled={loading}/>
    </div>
  );
}
