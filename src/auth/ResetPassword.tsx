import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const { token } = useParams();
    const {loading,resetPassword} = useUserStore();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!token || !newPassword) return;
      await resetPassword(token, newPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:p-8 w-full max-w-md mx-4 rounded-2xl md:border">
            <div className="mb-4">
                <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
                <p className="text-sm text-gray-600">Enter your new password</p>
            </div>
            <div className="relative w-full">
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="pl-10 focus-visible:ring-1 text-gray-500 rounded-2xl"
                />
                <Lock className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
            </div>
            {
                loading ? (
                    <Button disabled className="bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit"  className="bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">
                        Reset Password
                    </Button>
                )
            }
            <span className="text-center">
                Back to{" "}
                <Link to="/login" className="text-blue-500">Login</Link>
            </span>
        </form>
    </div>
);
};

export default ResetPassword;