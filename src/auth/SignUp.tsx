import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, Loader2, User, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserSignupSchema, userSingup } from "@/schema/UserSchema";
import { useUserStore } from "@/store/useUserStore";
const Login = () => {
    const [error, setError] = useState<Partial<userSingup>>({});
    const [input, setinput] = useState<userSingup>({
        fullName: '',
        email: '',
        password: '',
        contact: ''
    })

    const { signup,loading} = useUserStore();
    const navigate = useNavigate();    

    const submitHandeler = async (e: FormEvent) => {
        e.preventDefault();

        // Zod form validation
        const result = UserSignupSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<userSingup>);
            return;
        }
        try {
            await signup(input);
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <form onSubmit={submitHandeler} className=" md:p-8 w-full max-w-md md:border rounded-2xl">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">EatersPoint</h1>
                </div>
                <div className=" mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            className="pl-10 focus-visible:ring-1 text-gray-500 rounded-2xl "
                            value={input.fullName}
                            onChange={(e) => setinput({ ...input, fullName: e.target.value })}
                        />
                        <User className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-auto" />
                        {
                            error.fullName && <span className="text-red-500 text-sm">{error.fullName}</span>
                        }
                    </div>
                </div>
                <div className=" mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Contact"
                            className="pl-10 focus-visible:ring-1 text-gray-500 rounded-2xl "
                            value={input.contact}
                            onChange={(e) => setinput({ ...input, contact: e.target.value })}
                        />
                        <Phone className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-auto" />
                        {
                            error.contact && <span className="text-red-500 text-sm">{error.contact}</span>
                        }
                    </div>
                </div>
                <div className=" mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="pl-10 focus-visible:ring-1 text-gray-500 rounded-2xl "
                            value={input.email}
                            onChange={(e) => setinput({ ...input, email: e.target.value })}
                        />
                        <Mail className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-auto" />
                        {
                            error.email && <span className="text-red-500 text-sm">{error.email}</span>
                        }
                    </div>
                </div>

                <div className=" mb-4">
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            className="pl-10 focus-visible:ring-1 text-gray-500 rounded-2xl"
                            value={input.password}
                            onChange={(e) => setinput({ ...input, password: e.target.value })}
                        />
                        <Lock className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-auto" />
                        {
                            error.password && <span className="text-red-500 text-sm">{error.password}</span>
                        }
                    </div>
                </div>

                <div className="mb-5">
                    {loading ? (
                        <Button disabled className="bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">
                            Sign Up
                        </Button>
                    )}
                </div>

                <Separator className="bg-gray-400" />
                <p className="mt-2">
                    Alredy have an account?{" "}
                    <Link to='/login' className=" text-blue-500 hover:text-blue-700">Login</Link>
                </p>

            </form>
        </div>
    )
}

export default Login


