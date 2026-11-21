import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

import { loginUser } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";
import useLanguage from "../hooks/useLanguage";
import LanguageToggle from "../components/common/LanguageToggle";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuickFill = (email, password) => {
    setFormData({ email, password });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      login(
        data.user,
        data.access,
        data.refresh
      );

      switch (data.user.role) {
        case "PATIENT":
          navigate("/patient");
          break;

        case "VAIDYA":
          navigate("/vaidya");
          break;

        case "THERAPIST":
          navigate("/therapist");
          break;

        case "ADMIN":
          navigate("/admin");
          break;

        default:
          navigate("/");
      }

    } catch (err) {
      if (err.response?.data) {
        const responseData = err.response.data;

        if (responseData.non_field_errors) {
          setError(responseData.non_field_errors[0]);
        } else if (responseData.detail) {
          setError(responseData.detail);
        } else if (responseData.email) {
          setError(responseData.email[0]);
        } else {
          setError("Invalid email or password.");
        }
      } else {
        setError("Unable to connect to server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-lang-bar">
        <LanguageToggle />
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            <img src="/logo.png" alt="AyurSutra Logo" className="auth-logo-img" />
          </div>
          <h1>AyurSutra</h1>
          <p>{t("auth.signInSubtitle", "Panchakarma Management & Scheduling Platform")}</p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#fca5a5",
              fontSize: "0.85rem",
              padding: "12px 14px",
              borderRadius: "10px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t("auth.email", "Email Address")}</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                placeholder={t("auth.emailPlaceholder", "name@example.com")}
                value={formData.email}
                onChange={handleChange}
                className="input-control"
                style={{ paddingLeft: "42px" }}
                required
              />
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">{t("auth.password", "Password")}</label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                className="input-control"
                style={{ paddingLeft: "42px" }}
                required
              />
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px", fontSize: "0.95rem" }}
            disabled={loading}
          >
            {loading ? (
              t("auth.signingIn", "Signing in...")
            ) : (
              <>
                <span>{t("auth.signInButton", "Sign In to Portal")}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "0.88rem",
              color: "var(--text-muted)",
            }}
          >
            {t("auth.noAccount", "Don't have an account?")}{" "}
            <Link
              to="/register"
              style={{
                color: "var(--gold-primary)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("auth.registerHere", "Register here")}
            </Link>
          </p>

          <div
            style={{
              marginTop: "26px",
              paddingTop: "18px",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.74rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "10px",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={14} /> {t("auth.quickDemo", "Quick Demo Access")}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              <button
                type="button"
                onClick={() => handleQuickFill("patient@ayursutra.local", "Panchakarma@123")}
                className="btn btn-secondary btn-sm"
              >
                {t("role.PATIENT", "Patient")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("vaidya@ayursutra.local", "Panchakarma@123")}
                className="btn btn-secondary btn-sm"
              >
                {t("role.VAIDYA", "Vaidya")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("therapist@ayursutra.local", "Panchakarma@123")}
                className="btn btn-secondary btn-sm"
              >
                {t("role.THERAPIST", "Therapist")}
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("admin@ayursutra.local", "Panchakarma@123")}
                className="btn btn-secondary btn-sm"
              >
                {t("role.ADMIN", "Admin")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
