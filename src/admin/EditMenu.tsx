import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const EditMenu = ({ selectedMenu, editOpen, setEditOpen, }: { selectedMenu: any; editOpen: boolean; setEditOpen: Dispatch<SetStateAction<boolean>>; }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const { loading, editMenu } = useMenuStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("imageFile", input.image);
      }
      await editMenu(formData, selectedMenu._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="rounded-2xl bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle >{t('editMenu.title')}</DialogTitle>
          <DialogDescription className="">
          {t('editMenu.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label >{t('editMenu.name')}</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder={t('editMenu.placeholderName')}
              className=" rounded-2xl mt-2 focus-visible:ring-1 bg-gray-200 dark:bg-gray-600 "
            />
            {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
          </div>
          <div>
            <Label >{t('editMenu.descriptionLabel')}</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder={t('editMenu.placeholderDescription')}
              className=" rounded-2xl mt-2 focus-visible:ring-1 bg-gray-200 dark:bg-gray-600 "
            />
            {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <Label >{t('editMenu.price')}</Label>
            <Input
              type="number"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder={t('editMenu.placeholderPrice')}
              className=" rounded-2xl mt-2 focus-visible:ring-1 bg-gray-200 dark:bg-gray-600"
            />
            {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <Label >{t('editMenu.uploadImage')}</Label>
            <Input
              type="file"
              name="image"
              className=" rounded-2xl mt-2 focus-visible:ring-1 bg-gray-200 dark:bg-gray-600"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
            />
            {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className=" bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                {t('editMenu.pleaseWait')}
              </Button>
            ) : (
              <Button className=" bg-yellow-500 hover:bg-yellow-600 rounded-2xl">{t('editMenu.submit')}</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;