import React, { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import ActionButton from "../../../components/ActionButton/ActionButton";
import "./BookingForm.css";

/* ─── Icon components (inline SVG) ─── */
const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011-.2 11.4 11.4 0 003.6.6 1 1 0 011 1v3.4a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.3 1L6.6 10.8z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V8h14v11z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-4v-2h2V7h2v6z" />
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7.4 8.6L12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4z" />
  </svg>
);

const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15l-5-5 1.4-1.4L11 14.2l6.6-6.6L19 9l-8 8z" />
  </svg>
);

/* ─── Field wrapper — DEFINED OUTSIDE the BookingForm component
   so React treats it as a stable component type across re-renders
   (prevents input focus loss on every keystroke) ─── */
const Field = ({ label, icon, error, children }) => (
  <div className="booking__field">
    <label className="booking__label">{label}</label>
    <div className="booking__input-wrap">
      <span className="booking__input-icon">{icon}</span>
      {children}
    </div>
    {error && <span className="booking__error">{error}</span>}
  </div>
);

/* ─── Constants ─── */
const TOTAL_STEPS = 7;
const BRANCHES = ["CBD Branch", "Westlands Branch", "Karen Branch"];
const PATIENT_TYPES = ["New Patient", "Existing Patient"];
const REFERRAL_SOURCES = [
  "Google",
  "Instagram",
  "Facebook",
  "Friend/Family",
  "Walk-in",
  "Other",
];

const STEP_TITLES = [
  "Your Name",
  "Email Address",
  "Phone Number",
  "Select Branch",
  "Preferred Date & Time",
  "Patient Type",
  "How Did You Hear About Us?",
];

/* ─── Validation helpers ─── */
const lettersOnly = /^[A-Za-z\s'-]+$/;

const validate = (step, data) => {
  const errors = {};
  switch (step) {
    case 1:
      if (!data.firstName.trim()) errors.firstName = "First name is required.";
      else if (!lettersOnly.test(data.firstName))
        errors.firstName = "Letters only.";
      else if (data.firstName.trim().length < 2)
        errors.firstName = "At least 2 characters.";

      if (!data.lastName.trim()) errors.lastName = "Last name is required.";
      else if (!lettersOnly.test(data.lastName))
        errors.lastName = "Letters only.";
      else if (data.lastName.trim().length < 2)
        errors.lastName = "At least 2 characters.";
      break;

    case 2: {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email.trim()) errors.email = "Email is required.";
      else if (!emailRe.test(data.email))
        errors.email = "Enter a valid email address.";
      break;
    }

    case 3: {
      const digitsOnly = /^\d+$/;
      if (!data.phone.trim()) errors.phone = "Phone number is required.";
      else if (!digitsOnly.test(data.phone))
        errors.phone = "Digits only, no spaces or dashes.";
      else if (data.phone.length < 10) errors.phone = "At least 10 digits.";
      break;
    }

    case 4:
      if (!data.branch) errors.branch = "Please select a branch.";
      break;

    case 5: {
      if (!data.date) errors.date = "Please select a date.";
      else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(data.date) < today)
          errors.date = "Date cannot be in the past.";
      }
      if (!data.time) errors.time = "Please select a time.";
      else {
        const [h] = data.time.split(":").map(Number);
        if (h < 8 || h >= 18)
          errors.time = "Time must be between 8:00 AM and 6:00 PM.";
      }
      break;
    }

    case 6:
      if (!data.patientType)
        errors.patientType = "Please select a patient type.";
      break;

    case 7:
      if (!data.referralSource)
        errors.referralSource = "Please select how you heard about us.";
      break;

    default:
      break;
  }
  return errors;
};

/* ═══════════════════════════════════════════
   BookingForm Component
   ═══════════════════════════════════════════ */
const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "",
    date: "",
    time: "",
    patientType: "",
    referralSource: "",
  });

  /* ── helpers ── */
  const handleChange = useCallback(
    (field) => (e) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value })),
    []
  );

  const setRadio = useCallback(
    (field, value) => setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const isConfirmation = step === TOTAL_STEPS + 1;

  /* ── navigation ── */
  const handleNext = () => {
    if (isConfirmation) return;
    const errs = validate(step, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setDirection("backward");
    setStep((s) => s - 1);
  };

  /* ── submit ── */
  const handleSubmit = () => {
    setSending(true);
    const templateParams = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      branch: form.branch,
      date: form.date,
      time: form.time,
      patient_type: form.patientType,
      referral_source: form.referralSource,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSending(false);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setSending(false);
        alert("Something went wrong. Please try again.");
      });
  };

  /* ─── render helpers ─── */
  const progressPercent = isConfirmation
    ? 100
    : ((step - 1) / TOTAL_STEPS) * 100;

  const animClass =
    direction === "forward"
      ? "booking__step-body--forward"
      : "booking__step-body--backward";

  /* ── Steps ── */
  const renderStep = () => {
    switch (step) {
      /* Step 1 — Name */
      case 1:
        return (
          <div className={animClass} key="step1">
            <h3 className="booking__step-title">{STEP_TITLES[0]}</h3>
            <div className="booking__row">
              <Field
                label="First Name"
                icon={<PersonIcon />}
                error={errors.firstName}
              >
                <input
                  id="booking-first-name"
                  className="booking__input"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  autoComplete="given-name"
                />
              </Field>
              <Field
                label="Last Name"
                icon={<PersonIcon />}
                error={errors.lastName}
              >
                <input
                  id="booking-last-name"
                  className="booking__input"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  autoComplete="family-name"
                />
              </Field>
            </div>
          </div>
        );

      /* Step 2 — Email */
      case 2:
        return (
          <div className={animClass} key="step2">
            <h3 className="booking__step-title">{STEP_TITLES[1]}</h3>
            <Field label="Email" icon={<EnvelopeIcon />} error={errors.email}>
              <input
                id="booking-email"
                className="booking__input"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                autoComplete="email"
              />
            </Field>
          </div>
        );

      /* Step 3 — Phone */
      case 3:
        return (
          <div className={animClass} key="step3">
            <h3 className="booking__step-title">{STEP_TITLES[2]}</h3>
            <Field
              label="Phone Number"
              icon={<PhoneIcon />}
              error={errors.phone}
            >
              <input
                id="booking-phone"
                className="booking__input"
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                autoComplete="tel"
              />
            </Field>
          </div>
        );

      /* Step 4 — Branch */
      case 4:
        return (
          <div className={animClass} key="step4">
            <h3 className="booking__step-title">{STEP_TITLES[3]}</h3>
            <div className="booking__radio-group">
              {BRANCHES.map((b) => (
                <label
                  key={b}
                  className={`booking__radio-card${
                    form.branch === b ? " booking__radio-card--selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="branch"
                    value={b}
                    checked={form.branch === b}
                    onChange={() => setRadio("branch", b)}
                  />
                  {b}
                </label>
              ))}
            </div>
            {errors.branch && (
              <span className="booking__error">{errors.branch}</span>
            )}
          </div>
        );

      /* Step 5 — Date & Time */
      case 5:
        return (
          <div className={animClass} key="step5">
            <h3 className="booking__step-title">{STEP_TITLES[4]}</h3>
            <div className="booking__row">
              <Field
                label="Preferred Date"
                icon={<CalendarIcon />}
                error={errors.date}
              >
                <input
                  id="booking-date"
                  className="booking__input"
                  type="date"
                  value={form.date}
                  onChange={handleChange("date")}
                />
              </Field>
              <Field
                label="Preferred Time"
                icon={<ClockIcon />}
                error={errors.time}
              >
                <input
                  id="booking-time"
                  className="booking__input"
                  type="time"
                  value={form.time}
                  onChange={handleChange("time")}
                  min="08:00"
                  max="18:00"
                />
              </Field>
            </div>
          </div>
        );

      /* Step 6 — Patient Type */
      case 6:
        return (
          <div className={animClass} key="step6">
            <h3 className="booking__step-title">{STEP_TITLES[5]}</h3>
            <div className="booking__radio-group">
              {PATIENT_TYPES.map((t) => (
                <label
                  key={t}
                  className={`booking__radio-card${
                    form.patientType === t
                      ? " booking__radio-card--selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="patientType"
                    value={t}
                    checked={form.patientType === t}
                    onChange={() => setRadio("patientType", t)}
                  />
                  {t}
                </label>
              ))}
            </div>
            {errors.patientType && (
              <span className="booking__error">{errors.patientType}</span>
            )}
          </div>
        );

      /* Step 7 — Referral Source */
      case 7:
        return (
          <div className={animClass} key="step7">
            <h3 className="booking__step-title">{STEP_TITLES[6]}</h3>
            <div className="booking__field">
              <label className="booking__label">Source</label>
              <div className="booking__select-wrap">
                <select
                  id="booking-referral"
                  className="booking__select"
                  value={form.referralSource}
                  onChange={handleChange("referralSource")}
                >
                  <option value="">— Select —</option>
                  {REFERRAL_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="booking__select-chevron">
                  <ChevronDown />
                </span>
              </div>
              {errors.referralSource && (
                <span className="booking__error">{errors.referralSource}</span>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ── Confirmation screen ── */
  const renderConfirmation = () => {
    const items = [
      { label: "Name", value: `${form.firstName} ${form.lastName}` },
      { label: "Email", value: form.email },
      { label: "Phone", value: form.phone },
      { label: "Branch", value: form.branch },
      { label: "Date", value: form.date },
      { label: "Time", value: form.time },
      { label: "Patient Type", value: form.patientType },
      { label: "Referral", value: form.referralSource },
    ];

    return (
      <div className={`booking__confirm ${animClass}`} key="confirm">
        <h3 className="booking__confirm-title">Review Your Details</h3>
        <div className="booking__confirm-list">
          {items.map((it) => (
            <div className="booking__confirm-item" key={it.label}>
              <span className="booking__confirm-label">{it.label}</span>
              <span className="booking__confirm-value">{it.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ── Success screen ── */
  const renderSuccess = () => (
    <div className="booking__success">
      <div className="booking__success-icon">
        <CheckCircle />
      </div>
      <h3 className="booking__success-heading">Appointment Requested!</h3>
      <p className="booking__success-text">
        Thank you, {form.firstName}! We've received your booking request. Our
        team at Smile 360 will reach out shortly to confirm your appointment.
      </p>
    </div>
  );

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <section className="booking__section section" id="booking">
      <div className="container booking__wrapper">
        {/* ── LEFT COLUMN ── */}
        <div className="booking__info">
          <span className="booking__badge">Book a Visit</span>
          <h2 className="section_title blue booking__heading">
            Book an Appointment
          </h2>
          <p className="booking__description">
            Ready for a brighter smile? Schedule your visit at Smile 360 today
            — our friendly team is here to make every appointment comfortable
            and convenient.
          </p>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="booking__card">
          {submitted ? (
            renderSuccess()
          ) : (
            <>
              {/* Progress */}
              <div className="booking__progress">
                <div className="booking__progress-track">
                  <div
                    className="booking__progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="booking__step-count">
                  {isConfirmation
                    ? "Review"
                    : `Step ${step} of ${TOTAL_STEPS}`}
                </span>
              </div>

              {/* Step body */}
              {isConfirmation ? renderConfirmation() : renderStep()}

              {/* Navigation */}
              <div
                className={`booking__nav${
                  step === 1 ? " booking__nav--end" : ""
                }`}
              >
                {step > 1 && (
                  <ActionButton
                    text="Back"
                    variant="outline"
                    color="blue"
                    onClick={handleBack}
                  />
                )}

                {isConfirmation ? (
                  <ActionButton
                    text={sending ? "Sending…" : "Confirm & Book"}
                    variant="solid"
                    color="blue"
                    onClick={handleSubmit}
                  />
                ) : (
                  <ActionButton
                    text={step === TOTAL_STEPS ? "Review" : "Next"}
                    variant="solid"
                    color="blue"
                    onClick={handleNext}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
