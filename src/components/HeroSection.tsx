import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import pizza from './../assets/pizzaslice (1).png'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HereSection = () => {
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-5 rounded-2xl items-center justify-center mt-4 mb-4 gap-5">
                <div className="flex flex-col gap-10 md:w-[40%] ">
                    <div className="flex flex-col gap-5">
                        <h1 className="font-bold md:font-extrabold md:text-4xl leading-relaxed">
                            {t('hero.title')}
                        </h1>
                        <p className="text-gray-600">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                    <div className=" relative flex items-center gap-2">
                        <Input
                            type="text"
                            value={searchText}
                            placeholder={t('hero.placeholder')}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="pl-9 focus-visible:ring-1  rounded-2xl shadow-lg text-gray-400 truncate dark:bg-gray-900 dark:text-white"

                        />
                        <Button
                            className="h-7.5 absolute right-1 inset-y inset-x rounded-2xl bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => navigate(`/search/${searchText}`)}
                        >
                            {t('hero.search')}
                        </Button>
                        <Search className="absolute border-gray-700 inset-y-1 left-2 h-7.5" />

                    </div>
                </div>
                <div>
                    <img
                        src={pizza}
                        alt=""
                        className="object-cover w-full max-h-[700px] rounded-2xl"
                    />
                </div>
               
            </div>

        </>

    );
};

export default HereSection;


