import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Sparkles,
  CalendarPlus,
  CalendarCheck,
  CalendarClock,
  Clock,
  Users,
  Stethoscope,
  Activity,
  DoorOpen,
  ClipboardList,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const getLinks = () => {
    switch (user?.role) {
      case "PATIENT":
        return [
          { label: t("sidebar.dashboard", "Dashboard"), path: "/patient", icon: LayoutDashboard },
          { label: t("sidebar.myProfile", "My Profile"), path: "/patient/profile", icon: User },
          { label: t("sidebar.myTherapies", "My Therapies"), path: "/patient/therapies", icon: Sparkles },
          { label: t("sidebar.scheduleSession", "Schedule Session"), path: "/patient/schedule", icon: CalendarPlus },
          { label: t("sidebar.mySessions", "My Sessions"), path: "/patient/sessions", icon: Clock },
        ];

      case "VAIDYA":
        return [
          { label: t("sidebar.dashboard", "Dashboard"), path: "/vaidya", icon: LayoutDashboard },
          { label: t("sidebar.patients", "Patients"), path: "/vaidya/patients", icon: Users },
          { label: t("sidebar.treatmentPlans", "Treatment Plans"), path: "/vaidya/treatments", icon: Sparkles },
          { label: t("sidebar.consultations", "Consultations"), path: "/vaidya/consultations", icon: Stethoscope },
        ];

      case "THERAPIST":
        return [
          { label: t("sidebar.dashboard", "Dashboard"), path: "/therapist", icon: LayoutDashboard },
          { label: t("sidebar.todaysSchedule", "Today's Schedule"), path: "/therapist/schedule", icon: CalendarCheck },
          { label: t("sidebar.suiteConsole", "Suite Console"), path: "/therapist/suite", icon: DoorOpen },
          { label: t("sidebar.sessions", "Sessions"), path: "/therapist/sessions", icon: Clock },
          { label: t("sidebar.progressLogs", "Progress Logs"), path: "/therapist/progress", icon: Activity },
        ];

      case "ADMIN":
        return [
          { label: t("sidebar.dashboard", "Dashboard"), path: "/admin", icon: LayoutDashboard },
          { label: t("sidebar.rooms", "Rooms"), path: "/admin/rooms", icon: DoorOpen },
          { label: t("sidebar.availability", "Availability"), path: "/admin/availability", icon: CalendarClock },
          { label: t("sidebar.schedules", "Schedules"), path: "/admin/schedules", icon: ClipboardList },
          { label: t("sidebar.usersStaff", "Users & Staff"), path: "/admin/users", icon: ShieldCheck },
        ];

      default:
        return [];
    }
  };

  const displayName = user?.name || user?.username || t("navbar.practitioner", "Practitioner");
  const userInitial = displayName.charAt(0).toUpperCase();
  const roleDisplay = user?.role ? t(`role.${user.role}`, user.role) : "";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-badge">
          <img src="/logo.png" alt="AyurSutra Logo" className="brand-logo-img" />
        </div>
        <div className="brand-info">
          <span className="brand-title">AyurSutra</span>
          <span className="brand-subtitle">{t("brand.tagline", "Panchakarma Platform")}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {getLinks().map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/patient" || path === "/vaidya" || path === "/therapist" || path === "/admin"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} className="link-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-snippet">
          <div className="user-avatar-sm">{userInitial}</div>
          <div className="user-meta">
            <span className="user-name-text">{displayName}</span>
            <span className="role-badge-sm">{roleDisplay}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn-sidebar-logout"
          title={t("sidebar.logout", "Sign out of AyurSutra")}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
