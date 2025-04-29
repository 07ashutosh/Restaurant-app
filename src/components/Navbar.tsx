import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { GlobeIcon, HandPlatter, Home, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo-3.png"

const Navbar = () => {
    const { user, loading, logout } = useUserStore();
    const { cart } = useCartStore();
    const { setTheme } = useThemeStore();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);


    const handleThemeToggle = () => {
        const newTheme = isDark ? "light" : "dark";
        setIsDark(!isDark);
        setTheme(newTheme);
    };

    return (
        <div className="max-w-9xl mx-auto py-2 shadow-md  dark:shadow-gray-900/100  px-4 md:px-10 rounded-b-2xl">
            <div className="flex items-center justify-between h-14">
                <Link to="/">
                    <div className="hidden md:flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                    <h1 className="font-bold md:font-extrabold text-2xl">EatersPoint</h1>
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/">{t('home')}</Link>
                        <Link to="/restaurants">{t('restaurantHome')}</Link>
                        <Link to="/order/status">{t('order')}</Link>

                        {
                            user?.admin && (
                                <Menubar className="rounded-2xl  hover:bg-gray-200 hover:text-black">
                                    <MenubarMenu >
                                        <MenubarTrigger>{t('dashboard')}</MenubarTrigger>
                                        <MenubarContent className=" flex flex-col gap-2 backdrop-blur-[10px]  dark:bg-black/20 rounded-2xl shadow-xl p-4">
                                            <Button className="focus-visible:ring-0 bg-gray-200 hover:bg-gray-300  rounded-2xl border w-full">
                                                {<Link to="/admin/restaurant"><MenubarItem>{t('restaurantHome')}</MenubarItem></Link>}
                                            </Button>
                                            <Button className="focus-visible:ring-0 bg-gray-200 hover:bg-gray-300  rounded-2xl border w-full">
                                                {<Link to="/admin/menu"><MenubarItem>{t('menu')}</MenubarItem></Link>}
                                            </Button>
                                            <Button className="focus-visible:ring-0 bg-gray-200 hover:bg-gray-300  rounded-2xl border w-full">
                                                {<Link to="/admin/orders"><MenubarItem>{t('orders')}</MenubarItem></Link>}
                                            </Button>

                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            )}
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-full p-2 hover:bg-gray-200 hover:text-black">
                                        <GlobeIcon className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-2xl shadow-xl backdrop-blur-[10px] dark:bg-black/20">
                                    <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("hi")}>हिंदी</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("gu")}>ગુજરાતી</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("fr")}>Français</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("es")}>Español</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("ja")}>日本語</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("zh")}>中文</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative cursor-pointer">
                            <ShoppingCart />
                            {cart.length > 0 && (
                                <Button
                                    size={"icon"}
                                    className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                                >
                                    {cart.length}
                                </Button>
                            )}
                        </Link>
                        <label className="relative inline-block w-14 h-8 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isDark}
                                onChange={handleThemeToggle}
                            />
                            <div className="absolute inset-0 bg-gray-800 dark:bg-gray-100 rounded-full peer-focus:outline-none transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-between px-2 text-sm">
                                <Sun className="h-4 w-4 text-yellow-500" />
                                <Moon className="h-4 w-4 text-white" />
                            </div>
                            <div
                                className="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6"
                            />
                        </label>
                        {
                            user ? (
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profilePhoto} alt="profilephoto" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="backdrop-blur-[10px] dark:bg-black/20 rounded-2xl shadow-xl p-4 gap-1.5 ">
                                            <DropdownMenuItem asChild className="border-gray-200">
                                                <Button className="focus-visible:ring-0 rounded-2xl border w-full mb-3">
                                                    <Link to="/profile">{t('profileHome')}</Link>
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="flex flex-col w-full">
                                                {
                                                    loading ? (
                                                        <Button
                                                            disabled
                                                            className=" bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("please_wait")}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={logout}
                                                            className=" bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">{t('logout')}
                                                        </Button>
                                                    )
                                                }
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl">{t('login')}</Button>
                                </Link>
                            )
                        }


                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    <MobileNavbar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

const MobileNavbar = () => {
    const { user, logout, loading } = useUserStore();
    const { cart } = useCartStore();
    const { setTheme } = useThemeStore();
    const [isDark, setIsDark] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };


    const handleThemeToggle = () => {
        const newTheme = isDark ? "light" : "dark";
        setIsDark(!isDark);
        setTheme(newTheme);
    };
    return (
        <Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full p-2">
                        <GlobeIcon className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl shadow-xl bg-white dark:bg-gray-900">
                    <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("hi")}>हिंदी</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("gu")}>ગુજરાતી</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("fr")}>Français</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("es")}>Español</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("ja")}>日本語</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("zh")}>中文</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <SheetTrigger asChild>
                <Button
                    size={"icon"}
                    className=" rounded-2xl text-black hover:bg-gray-200 dark:bg-gray-600"
                    variant="outline"
                >
                    <Menu size={"18"} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col bg-white dark:bg-gray-800 w-3/4 p-4 rounded-l-2xl shadow-xl">
                <SheetHeader className="flex flex-row items-center justify-between mt-5">
                    <SheetTitle>EatersPoint</SheetTitle>
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isDark}
                            onChange={handleThemeToggle}
                        />
                        <div className="absolute inset-0 bg-gray-800 dark:bg-gray-100 rounded-full peer-focus:outline-none transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-between px-2 text-sm">
                            <Sun className="h-4 w-4 text-yellow-500" />
                            <Moon className="h-4 w-4 text-white" />
                        </div>
                        <div
                            className="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6"
                        />
                    </label>
                </SheetHeader>
                <Separator className="my-2 dark:bg-gray-400 bg-gray-800" />
                <SheetDescription className="flex-1">
                    <Link
                        to="/"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <Home />
                        <span className="dark:text-white">{t('home')}</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <User />
                        <span className="dark:text-white">{t('profileHome')}</span>
                    </Link>
                    <Link
                        to="/restaurants"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >   
                        <UtensilsCrossed />
                        <span className="dark:text-white">{t('restaurantHome')}</span>
                    </Link>
                    <Link
                        to="/order/status"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <HandPlatter />
                        <span className="dark:text-white">{t('order')}</span>
                    </Link>
                    <Link
                        to="/cart"
                        className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                    >
                        <ShoppingCart />
                        <span className="dark:text-white ">{t('cartHome')}({cart.length}) </span>
                    </Link>
                    {user?.admin && (
                        <>
                            <Link
                                to="/admin/menu"
                                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                            >
                                <SquareMenu />
                                <span>{t('menu')}</span>
                            </Link>
                            <Link
                                to="/admin/restaurant"
                                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                            >
                                <UtensilsCrossed />
                                <span>{t('restaurantHome')}</span>
                            </Link>
                            <Link
                                to="/admin/orders"
                                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                            >
                                <PackageCheck />
                                <span>{t('orders')}</span>
                            </Link>
                        </>
                    )}
                </SheetDescription>
                <SheetFooter className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <Avatar>
                            <AvatarImage src={user?.profilePhoto} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-bold"></h1>
                    </div>
                    <SheetClose asChild>
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
                                        onClick={logout}
                                        className=" bg-yellow-500 hover:bg-yellow-600 w-full rounded-2xl">{t('logout')}
                                    </Button>
                                )
                        }
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};