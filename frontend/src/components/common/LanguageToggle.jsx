import { Languages } from "lucide-react";
import useLanguage from "../../hooks/useLanguage";

const LanguageToggle = ({ className = "", compact = false }) => {
  const { language, setLanguage, toggleLanguage, isHindi } = useLanguage();

  return (
    <div
      className={`lang-toggle-container ${compact ? "lang-toggle-compact" : ""} ${className}`}
      title={isHindi ? "Switch to English" : "हिन्दी में बदलें (Switch to Hindi)"}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        className="lang-toggle-icon-btn"
        onClick={toggleLanguage}
        aria-label="Toggle language between English and Hindi"
      >
        <Languages size={15} className="lang-icon" />
      </button>

      <div className="lang-toggle-switch">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`lang-option ${language === "en" ? "active" : ""}`}
          aria-pressed={language === "en"}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => setLanguage("hi")}
          className={`lang-option ${language === "hi" ? "active" : ""}`}
          aria-pressed={language === "hi"}
        >
          हिन्दी
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
