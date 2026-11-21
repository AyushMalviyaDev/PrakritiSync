import { Sparkles } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";

const PatientHeader = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const displayName = user?.first_name || user?.name || user?.username || t("role.PATIENT", "Patient");
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="patient-header">
      <div>
        <div className="page-eyebrow">
          <Sparkles size={13} />
          <span>{t("patient.sanctuary", "PATIENT SANCTUARY")}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", color: "var(--text-heading)", margin: "4px 0" }}>
          {t("patient.namaste", "Namaste")}, {displayName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
          {t("patient.welcome", "Welcome to your personalized Panchakarma wellness and rejuvenation journey.")}
        </p>
      </div>

      <div className="patient-avatar-lg">
        {initial}
      </div>
    </div>
  );
};

export default PatientHeader;
