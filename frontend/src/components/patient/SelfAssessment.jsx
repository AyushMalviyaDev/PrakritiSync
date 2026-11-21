import { useState } from "react";
import useLanguage from "../../hooks/useLanguage";

const SelfAssessment = () => {
  const { t } = useLanguage();
  const [mood, setMood] = useState("");

  const options = [
    { key: "Excellent", label: t("patient.excellent", "Excellent") },
    { key: "Good", label: t("patient.good", "Good") },
    { key: "Okay", label: t("patient.okay", "Okay") },
    { key: "Low", label: t("patient.low", "Low") },
  ];

  return (
    <div className="card">
      <h3>{t("patient.selfAssessment", "Daily Self Assessment")}</h3>

      <p>{t("patient.feelingQuestion", "How are you feeling today?")}</p>

      <div className="assessment-options">
        {options.map((option) => (
          <button
            key={option.key}
            className={mood === option.key ? "selected" : ""}
            onClick={() => setMood(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {mood && (
        <p className="assessment-result">
          {t("patient.youSelected", "You selected")}:{" "}
          <strong>{options.find((o) => o.key === mood)?.label || mood}</strong>
        </p>
      )}
    </div>
  );
};

export default SelfAssessment;
