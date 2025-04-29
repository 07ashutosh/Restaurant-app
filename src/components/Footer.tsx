import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="h-16 shadow-lg">
      <div className=" flex items-center justify-center h-full max-w-9xl mx-auto px-6 text-center dark:shadow-gray-900/100  md:px-10 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.1)]">
        <p >© {new Date().getFullYear()} EatersPoint. {t("footer.rightsReserved")}</p>
      </div>
    </footer>
  );
}

export default Footer;
