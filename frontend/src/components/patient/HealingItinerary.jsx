import TherapyCard from "./TherapyCard";
import useLanguage from "../../hooks/useLanguage";

const HealingItinerary = ({ sessions = [] }) => {
  const { t } = useLanguage();

  return (
    <section>
      <div className="section-heading">
        <div>
          <h2>{t("patient.healingItinerary", "Healing Itinerary")}</h2>
          <p>{t("patient.itinerarySubtitle", "Your upcoming Panchakarma therapies")}</p>
        </div>
      </div>

      <div className="therapy-list">
        {sessions.length === 0 ? (
          <p>{t("patient.noSessions", "No therapy sessions scheduled.")}</p>
        ) : (
          sessions.map((session) => (
            <TherapyCard
              key={session.id}
              therapy={session}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default HealingItinerary;
