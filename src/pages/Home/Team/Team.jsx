import React from "react";
import "./Team.css";
import Dentist1 from "../../../assets/Dentist1.webp";
import Dentist2 from "../../../assets/Dentist2.webp";
import Dentist3 from "../../../assets/Dentist3.webp";
import Dentist4 from "../../../assets/Dentist4.webp";
import ActionButton from "../../../components/ActionButton/ActionButton";
import { LuUserRoundPlus } from "react-icons/lu";
const teamMembers = [
  {
    name: "Dr. Amy Traore Shumbusho",
    role: "CEO/Orthodontist",
    img: Dentist1,
    link: "/dr-amy-shumbusho",
  },
  {
    name: "Dr. Amaka Nwadiani-Umolu",
    role: "Dentist",
    img: Dentist2,
    link: "/dr-amaka",
  },
  {
    name: "Dr. Ogunjimi",
    role: "Dentist",
    img: Dentist3,
    link: "/dr-ogunjimi",
  },
  {
    name: "Dr. Nidhi Agrawal",
    role: "Orthodontist",
    img: Dentist4,
    link: "/dr-nidhi",
  },
];

const JoinCard = () => (
  <div className="our_team__join_card">
    <div className="our_team__join_icon">
      <LuUserRoundPlus size={60} className="our_team__join_card_icon"/>{" "}
    </div>
    <h3 className="our_team__join_title">Wanna be a part of our team?</h3>
    <p className="our_team__join_text">
      If you're committed to providing exceptional dental care and making a
      positive impact on our patients' smiles, we'd love to hear from you.
    </p>
    <ActionButton
      text="View Open Positions"
      to="/careers"
      variant="outline"
      color="maroon"
      className="our_team__join_btn"
    />
  </div>
);

const DentistCard = ({ member }) => (
  <div className="our_team__card">
    <div className="our_team__card_img_wrap">
      <img src={member.img} alt={member.name} className="our_team__card_img" />
    </div>
    <div className="our_team__card_info">
      <p className="our_team__card_name">{member.name}</p>
      <p className="our_team__card_role">{member.role}</p>
    </div>
  </div>
);

const Team = () => {
  return (
    <section className="section our_team__section">
      <div className="container">
        {/* ── DESKTOP (≥1200px): 3-col grid layout ── */}
        <div className="our_team__desktop_layout">
          {/* Row 1: Header col + 2 dentist cards */}
          <div className="our_team__row our_team__row--top">
            <div className="our_team__header_col">
              <p className="small_section_badge maroon our_team__badge">
                About Clinic
              </p>
              <h2 className="section_title blue our_team__heading">
                Meet the team <br /> behind your smile.
              </h2>
              <ActionButton
                text="About Team"
                to="/about"
                variant="solid"
                color="maroon"
                className="our_team__about_btn"
              />
            </div>
            <DentistCard member={teamMembers[0]} />
            <DentistCard member={teamMembers[1]} />
          </div>

          {/* Row 2: Join card + 2 dentist cards */}
          <div className="our_team__row our_team__row--bottom">
            <JoinCard />
            <DentistCard member={teamMembers[2]} />
            <DentistCard member={teamMembers[3]} />
          </div>
        </div>

        {/* ── LARGE TABLET (947–1199px): header top, 3-col images, 4th full-width, join full-width ── */}
        <div className="our_team__tablet_lg_layout">
          <div className="our_team__tablet_lg_header">
            <div>
              <p className="small_section_badge maroon our_team__badge">
                About Clinic
              </p>
              <h2 className="section_title blue our_team__heading">
                Meet the team <br /> behind your smile.
              </h2>
            </div>
            <ActionButton
              text="About Team"
              to="/about"
              variant="solid"
              color="blue"
              className="our_team__about_btn"
            />
          </div>

          {/* 3 cards in a row */}
          <div className="our_team__tablet_lg_row3">
            {teamMembers.slice(0, 3).map((m) => (
              <DentistCard key={m.link} member={m} />
            ))}
          </div>

          {/* 4th card full width */}
          <div className="our_team__tablet_lg_full">
            <DentistCard member={teamMembers[3]} />
          </div>

          {/* Join card full width */}
          <JoinCard />
        </div>

        {/* ── SMALL TABLET (600–946px): header + button, 2×2 grid, join below ── */}
        <div className="our_team__tablet_sm_layout">
          <div className="our_team__tablet_sm_header">
            <div>
              <p className="small_section_badge maroon our_team__badge">
                About Clinic
              </p>
              <h2 className="section_title blue our_team__heading">
                Meet the team <br /> behind your smile.
              </h2>
            </div>
            <ActionButton
              text="About Team"
              to="/about"
              variant="solid"
              color="blue"
              className="our_team__about_btn"
            />
          </div>

          <div className="our_team__tablet_sm_grid">
            {teamMembers.map((m) => (
              <DentistCard key={m.link} member={m} />
            ))}
          </div>

          <JoinCard />
        </div>

        {/* ── MOBILE (<600px): single column ── */}
        <div className="our_team__mobile_layout">
          <div className="our_team__mobile_header">
            <p className="small_section_badge maroon our_team__badge">
              About Clinic
            </p>
            <h2 className="section_title blue our_team__heading">
              Meet the team <br /> behind your smile.
            </h2>
          </div>

          {teamMembers.map((m) => (
            <DentistCard key={m.link} member={m} />
          ))}

          <JoinCard />
        </div>
      </div>
    </section>
  );
};

export default Team;
