import { useState } from "react";
import { HiMail } from "react-icons/hi";
import EmailInput from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { NameInput } from "./NameInput";
import { ConfirmPasswordInput } from "./ConfirmPassword";

export default function Input1({onGetStarted, loading}) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                onGetStarted(name, email, password);
            }
        }
    };

  return (
    <div className="flex flex-col justify-center items-center">
      <NameInput name={name} setName={setName}/>
      <EmailInput email={email} setEmail={setEmail}/>
      <PasswordInput password={password} setPassword={setPassword} />
      <ConfirmPasswordInput password={password} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />

      <div className="pt-2 pb-6 font-segoe">Already Registered? <Link to="/signin">Click Here!</Link> </div>
      <Button label={loading ? "Signing up..." : "Signup"} trynow={handleSignUp} disabled={loading}/>
    </div>
  );
}
