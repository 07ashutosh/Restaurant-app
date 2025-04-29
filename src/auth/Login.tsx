import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { userLogin, UserLogiSchema } from "@/schema/UserSchema";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [error, setError] = useState<Partial<userLogin>>({});

    const [input, setinput] = useState<userLogin>({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const{login,loading} = useUserStore();

    const submitHandeler = async(e: FormEvent) => {
        e.preventDefault();

        const result = UserLogiSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<userLogin>);
            return;

        }

         try {
      await login(input);
      navigate("/");
    } catch (error) {console.log(error);
    }

    }
    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <form onSubmit={submitHandeler} className=" md:p-8 w-full max-w-md md:border rounded-2xl">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">EatersPoint</h1>
                </div>
                <div className=" mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="pl-10 focus-visible:ring-1  rounded-2xl"
                            value={input.email}
                            onChange={(e) => setinput({ ...input, email: e.target.value })}
                        />
                        <Mail className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-auto" />
                        {
                            error.email && <span className="text-sm text-red-500">{error.email}</span>
                        }
                    </div>
                </div>

                <div className=" mb-4">
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            className="pl-10 focus-visible:ring-1  rounded-2xl"
                            value={input.password}
                            onChange={(e) => setinput({ ...input, password: e.target.value })}
                        />
                        <Lock className=" absolute inset-y-2 left-2 text-gray-500 pointer-events-auto" />
                        {
                            error.password && <span className="text-sm text-red-500">{error.password}</span>
                        }
                    </div>
                </div>

                <div className="mb-5">
                    {
                        loading ?
                            (
                                <Button
                                    disabled
                                    className=" bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl"><Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait
                                </Button>
                            ) :
                            (
                                <Button
                                    type="submit"
                                    className=" bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">Login
                                </Button>
                            )
                    }
                    <div className="mt-2">
                        <Link to='/forgot-password' className=" text-blue-500 hover:text-blue-700">Forgot password</Link>
                    </div>

                </div>
                <Separator className="bg-gray-400" />
                <p className="mt-2">
                    Don't have an account?{" "}
                    <Link to='/signup' className=" text-blue-500 hover:text-blue-700">SignUp</Link>
                </p>

            </form>
        </div>
    )
}

export default Login

