import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");

    const {forgotPassword,loading} = useUserStore();
    // const loading = false;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        await forgotPassword(email);
    };
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:p-8 w-full max-w-md mx-4 rounded-2xl md:border">  
                <div className="mb-4">
                    <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
                </div>
                <div className="mb-4 relative">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-2xl pl-10 focus-visible:ring-1 text-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                </div>

                <div className="mb-3">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </Button>
                </div>

                <span className="text-center">
                    Back to <Link to="/login" className="text-blue-500">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default ForgotPassword;