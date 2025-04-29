import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { t } = useTranslation();
    const { user, updateProfile } = useUserStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
        contact: user?.contact || "",
        profilePhoto: user?.profilePhoto || "",
    });
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<string>(profileData.profilePhoto || "");
    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedProfilePicture(result);
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePhoto: result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateProfile(profileData);
        } catch (error) {
            console.error("update api error: ", error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div >
            <form onSubmit={updateProfileHandler} className="max-w-4xl mx-auto rounded-2xl p-6 mt-5 mb-5">
                <div className="flex flex-col md:items-center">
                    <div className="  flex justify-center items-center">
                        <Avatar className=" items-center relative md:w-28 md:h-28 w-20 h-20 border-1 border-gray-300">
                            <AvatarImage src={selectedProfilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                            <input
                                ref={imageRef}
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={fileChangeHandler}
                            />
                            <div
                                onClick={() => imageRef.current?.click()}
                                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
                            >
                                <Plus className="text-white w-8 h-8" />
                            </div>
                        </Avatar>
                        <Input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={changeHandler}
                            className="justify-center font-bold text-2xl outline-none border-none focus-visible:ring-transparent dark:text-gray-50"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div className="flex items-center gap-4 rounded-2xl p-2 bg-gray-200 dark:bg-gray-600">
                        <Mail className="text-gray-500 dark:text-gray-50" />
                        <div className="w-full">
                            <Label>{t('profile.email')}</Label>
                            <input
                                disabled
                                name="email"
                                value={profileData.email}
                                onChange={changeHandler}
                                className="w-full text-gray-600 dark:text-gray-50 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl p-2 bg-gray-200 dark:bg-gray-600">
                        <LocateIcon className="text-gray-500 dark:text-gray-50" />
                        <div className="w-full">
                            <Label>{t('profile.address')}</Label>
                            <input
                                name="address"
                                value={profileData.address}
                                onChange={changeHandler}
                                className="w-full text-gray-600 dark:text-gray-50 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl p-2 bg-gray-200 dark:bg-gray-600">
                        <MapPin className="text-gray-500 dark:text-gray-50" />
                        <div className="w-full">
                            <Label>{t('profile.city')}</Label>
                            <input
                                name="city"
                                value={profileData.city}
                                onChange={changeHandler}
                                className="w-full text-gray-600 dark:text-gray-50 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl p-2 bg-gray-200 dark:bg-gray-600">
                        <MapPinnedIcon className="text-gray-500 dark:text-gray-50" />
                        <div className="w-full">
                            <Label>{t('profile.country')}</Label>
                            <input
                                name="country"
                                value={profileData.country}
                                onChange={changeHandler}
                                className="w-full text-gray-600 dark:text-gray-50 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl p-2 bg-gray-200 dark:bg-gray-600">
                        <MapPinnedIcon className="text-gray-500 dark:text-gray-50" />
                        <div className="w-full">
                            <Label>{t('profile.contact')}</Label>
                            <input
                                name="contact"
                                value={profileData.contact}
                                onChange={changeHandler}
                                className="w-full text-gray-600 dark:text-gray-50 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    {isLoading ?
                        (
                            <Button
                                disabled
                                className=" bg-yellow-500 hover:bg-yellow-600 w-1/2 rounded-2xl"><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('profile.pleaseWait')}
                            </Button>
                        ) :
                        (
                            <Button
                                type="submit"
                                className=" bg-yellow-500 hover:bg-yellow-600 w-1/2 rounded-2xl">{t('profile.update')}
                            </Button>
                        )}
                </div>
            </form>

        </div>
    );
};

export default Profile;

