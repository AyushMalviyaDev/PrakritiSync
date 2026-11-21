import { Calendar, Sparkles } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";
import LanguageToggle from "../common/LanguageToggle";

const Navbar = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("navbar.goodMorning", "Good morning");
    if (hour < 17) return t("navbar.goodAfternoon", "Good afternoon");
    return t("navbar.goodEvening", "Good evening");
  };

  const todayFormatted = new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  const displayName = user?.first_name || user?.name || user?.username || t("navbar.guest", "Guest");
  const roleDisplay = user?.role ? t(`role.${user.role}`, user.role) : t("role.PORTAL", "PORTAL");

  return (
    <header className="navbar">
      <div className="navbar-greeting">
        <h2>
          {getGreeting()}, <span style={{ color: "var(--emerald-primary)" }}>{displayName}</span>
        </h2>
        <div className="navbar-date">
          <Calendar size={13} style={{ color: "var(--emerald-primary)" }} />
          <span>{todayFormatted}</span>
          <span style={{ margin: "0 4px", opacity: 0.4 }}>•</span>
          <span style={{ color: "var(--emerald-accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={12} /> {t("navbar.active", "AyurSutra Active")}
          </span>
        </div>
      </div>

      <div className="navbar-actions">
        <LanguageToggle />
        <span className="role-pill">
          {roleDisplay}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
