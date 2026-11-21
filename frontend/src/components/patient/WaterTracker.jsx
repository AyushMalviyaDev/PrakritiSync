import { useState } from "react";
import useLanguage from "../../hooks/useLanguage";

const WaterTracker = () => {
  const { t } = useLanguage();
  const [glasses, setGlasses] = useState(4);

  const addGlass = () => {
    if (glasses < 8) {
      setGlasses(glasses + 1);
    }
  };

  return (
    <div className="card water-tracker">
      <h3>{t("patient.waterIntake", "Water Intake")}</h3>

      <p>{t("patient.waterDesc", "Stay hydrated throughout your healing journey.")}</p>

      <div className="water-count">
        {glasses} / 8 {t("patient.glasses", "glasses")}
      </div>

      <div className="water-progress">
        <div
          style={{
            width: `${(glasses / 8) * 100}%`,
          }}
        />
      </div>

      <button onClick={addGlass}>
        {t("patient.addGlass", "+ Add Glass")}
      </button>
    </div>
  );
};

export default WaterTracker;
