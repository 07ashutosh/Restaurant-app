import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    const { loading, verifyEmail } = useUserStore();
    const navigate = useNavigate();
    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
        // Move to the next input field id a digit is entered
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="p-8  w-full max-w-md flex flex-col gap-10 border rounded-2xl">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl">Verify your email</h1>
                    <p className="text-sm text-gray-600">
                        Enter the 6 digit code sent to your email address
                    </p>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="flex justify-between">
                        {otp.map((letter: string, index: number) => (
                            <Input
                                key={index}
                                type="text"
                                ref={(el) => { inputRef.current[index] = el }}
                                maxLength={1}
                                value={letter}
                                className="rounded-2xl md:w-12 md:h-12 w-8 h-8 focus-visible:ring-1 text-gray-500 mb-4 text-center md:text-2xl font-normal md:font-bold focus:outline-none "
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                    handleKeyDown(index, e)
                                }
                            />
                        ))}
                    </div>
                    {loading ? (
                        <Button
                            disabled
                            className="bg-yellow-500 hover:bg-yellow-600 w-full rounded"
                        >
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button className="bg-yellow-500 hover:bg-yellow-600 w-full rounded">
                            Verify
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;