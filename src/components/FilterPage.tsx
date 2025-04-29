import { useEffect } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export type FilterOptionsState = {
    id: string;
    label: string;
};

const FilterPage = () => {
    const { t } = useTranslation();
    const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();

    useEffect(() => {
        const onLangChange = () => {
            resetAppliedFilter();
        };

        i18next.on("languageChanged", onLangChange);

        return () => {
            i18next.off("languageChanged", onLangChange);
        };
    }, [resetAppliedFilter]);

    const filterOptions: FilterOptionsState[] = [
        { id: "indian", label: t("filter.cuisines.indian") },
        { id: "chinese", label: t("filter.cuisines.chinese") },
        { id: "mexican", label: t("filter.cuisines.mexican") },
        { id: "italian", label: t("filter.cuisines.italian") },
        { id: "french", label: t("filter.cuisines.french") },
        { id: "japanese", label: t("filter.cuisines.japanese") },
        { id: "turkish", label: t("filter.cuisines.turkish") },
        { id: "thai", label: t("filter.cuisines.thai") },
    ];

    const appliedFilterHandler = (value: string) => {
        setAppliedFilter(value);
    };

    return (
        <div className="md:w-72 mt-2 mb-2 p-4">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-lg">{t("filter.title")}</h1>
                <Button variant={"link"} onClick={resetAppliedFilter}>
                    {t("filter.reset")}
                </Button>
            </div>
            {filterOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 my-5">
                    <Checkbox
                        id={option.id}
                        checked={appliedFilter.includes(option.id)} 
                        onClick={() => appliedFilterHandler(option.id)} 
                        className="dark:border-2 dark:border-gray-50"
                    />
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {option.label}
                    </Label>
                </div>
            ))}
        </div>
    );
};

export default FilterPage;
