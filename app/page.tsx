"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Animation Variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Section Wrapper ──────────────────────────────────────────────────────

function Section({
  children,
  className = "",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// ─── Timeline Item ─────────────────────────────────────────────────────────

function TimelineItem({
  period,
  title,
  company,
  points,
  isLast = false,
}: {
  period: string;
  title: string;
  company: string;
  points: string[];
  isLast?: boolean;
}) {
  return (
    <motion.div variants={fadeUp} custom={0} style={{ display: "flex", gap: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "var(--accent)",
            marginTop: 6,
            flexShrink: 0,
          }}
        />
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              background: "var(--border)",
              minHeight: 40,
              marginTop: 4,
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: "2rem", flex: 1 }}>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.05em",
            marginBottom: "0.25rem",
          }}
        >
          {period}
        </div>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "0.125rem",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            marginBottom: "0.75rem",
          }}
        >
          {company}
        </div>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {points.map((point, i) => (
            <li
              key={i}
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                paddingLeft: "1rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--text-muted)",
                }}
              >
                –
              </span>{" "}
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Skill Badge ───────────────────────────────────────────────────────────

function SkillBadge({ label, level }: { label: string; level?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.375rem 0.875rem",
        borderRadius: "999px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        fontSize: "0.8125rem",
        color: level === "Expert" ? "var(--text-primary)" : "var(--text-secondary)",
        transition: "border-color 0.2s, color 0.2s",
        cursor: "default",
      }}
      whileHover={{ borderColor: "var(--border-light)", color: "var(--text-primary)" }}
    >
      {label}
      {level && (
        <span
          style={{
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          {level}
        </span>
      )}
    </motion.div>
  );
}

// ─── Link Button ────────────────────────────────────────────────────────────

function LinkButton({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      variants={fadeUp}
      custom={0}
      whileHover={{ y: -2 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.5rem 1.125rem",
        borderRadius: "6px",
        border: "1px solid var(--border-light)",
        background: "var(--bg-card)",
        color: "var(--text-primary)",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "border-color 0.2s, background 0.2s",
        cursor: "pointer",
      }}
    >
      {label}
      {external && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </motion.a>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(12, 12, 15, 0.85)",
        borderBottom: "1px solid var(--border)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <nav
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <motion.a
          href="#"
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
          whileHover={{ opacity: 0.7 }}
        >
          PH
        </motion.a>
        <ul style={{ display: "flex", gap: "0.25rem", listStyle: "none" }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  padding: "0.375rem 0.625rem",
                  borderRadius: "4px",
                  transition: "color 0.15s",
                }}
                whileHover={{ color: "var(--text-primary)" }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <Section style={{ padding: "2rem 1.5rem 4rem" }}>
      <motion.div
        variants={stagger}
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid var(--border-light)",
              background: "var(--bg-card)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Available for opportunities
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}
        >
          Pasi Hokkanen
        </motion.h1>

        <motion.div
          variants={fadeUp}
          custom={2}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 500,
            color: "var(--accent)",
            marginBottom: "1.25rem",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Software Developer · CAD/CAE Specialist
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={3}
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: "540px",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Desktop software developer with 7+ years of C/C++ experience in large-scale CAD/CAE systems.
          Specializing in software architecture, UI/UX design, automated testing, and PDM/PLM data integration
          for industrial electrical and mechanical design tools.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={4}
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
        >
          <LinkButton
            href="https://www.linkedin.com/in/pasi-hokkanen-5b2198211/"
            label="LinkedIn"
            external
          />
          <LinkButton href="mailto:hokkanen.pasi@gmail.com" label="hokkanen.pasi@gmail.com" />
        </motion.div>
      </motion.div>
    </Section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <Section
      id="about"
      className=""
      style={{
        padding: "6rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h2
          variants={fadeUp}
          custom={0}
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "1.25rem",
          }}
        >
          About
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={1}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            maxWidth: 640,
          }}
        >
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            Desktop software developer with 7+ years of C/C++ experience in large-scale CAD/CAE systems at{" "}
            <strong style={{ color: "var(--text-primary)" }}>Vertex Systems Oy</strong>. Expertise in
            software architecture, UI/UX design, automated testing, and PDM/PLM data integration for
            electrical and mechanical design tools (Vertex ED and Vertex G4).
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            Background in embedded systems and electronics, complemented by exchange studies in Taiwan
            at National Taiwan University of Science and Technology. Completed Master&apos;s thesis on
            integrating wire harness design with 3D mechanical tools, earning a grade of 4/5.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            Passionate about adapting to new cultural and technical environments, clean architecture,
            good UX, and building tools that other engineers actually enjoy using.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Experience ─────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience" style={{ padding: "6rem 1.5rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h2
          variants={fadeUp}
          custom={0}
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "2.5rem",
          }}
        >
          Experience
        </motion.h2>
        <div>
          <TimelineItem
            period="2023 – Present"
            title="Scrum Master"
            company="Vertex Systems Oy, Tampere, Finland"
            points={[
              "Lead and facilitate Scrum events",
              "Introduced new development tools and methods into the team like encourage and openly share about AI tool usages",
            ]}
          />
          <TimelineItem
            period="2018 – Present"
            title="Software Developer"
            company="Vertex Systems Oy, Tampere, Finland"
            points={[
              "Designed and implemented software architecture, UI/UX, and core functionality for Vertex ED (Electrical) and Vertex G4 (Mechanical) desktop software in C/C++",
              "Fully designed and integrated Vertex ED with Vertex G4 for 3D wire harness designing",
              "Built automated test frameworks improving software quality and reliability",
              "Engineered REST API integration between design tools and PDM/PLM/ERP systems (e.g. migrated Vertex Flow PDM client from legacy interface to modern REST API)",
              "Managed design tool customization projects with customers, from specialized reports to large functional extensions",
            ]}
          />
          <TimelineItem
            period="2015 – 2017"
            title="Summer Trainee"
            company="Vertex Systems Oy, Tampere, Finland"
            points={[
              "Contributed to architecture, UI/UX and C/C++ development for a new PLC programming tool",
              "Built electrical design components library and 3D modelling for Vertex ED",
            ]}
            isLast
          />
        </div>
      </div>
    </Section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    label: "Programming Languages",
    skills: [
      { name: "C/C++", level: "Expert" },
      { name: "Python", level: "Basics" },
      { name: "C#", level: "Basics" },
      { name: "VHDL", level: "Basics" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "3D Modeling" },
      { name: "Jira" },
      { name: "GitHub Copilot" },
      { name: "Microsoft Office" },
      { name: "Linux" },
      { name: "Hermes AI Agent" },
    ],
  },
  {
    label: "Core",
    skills: [
      { name: "Software Architecture & Design" },
      { name: "UI/UX Design" },
      { name: "Embedded Systems" },
      { name: "Scrum / Agile" },
      { name: "Technical Support" },
    ],
  },
  {
    label: "Spoken Languages",
    skills: [
      { name: "Finnish", level: "Native" },
      { name: "English", level: "C2" },
      { name: "Chinese", level: "A2" },
      { name: "Swedish", level: "A2" },
    ],
  },
];

function Skills() {
  return (
    <Section id="skills" style={{ padding: "6rem 1.5rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h2
          variants={fadeUp}
          custom={0}
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "2.5rem",
          }}
        >
          Skills
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.label} variants={fadeUp} custom={gi}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.875rem",
                }}
              >
                {group.label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.skills.map((skill) => (
                  <SkillBadge key={skill.name} label={skill.name} level={"level" in skill ? skill.level : undefined} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Education ──────────────────────────────────────────────────────────────

const education = [
  {
    period: "2017 – 2020",
    degree: "M.Sc. (Tech.) in Electrical Engineering",
    school: "Tampere University, Finland",
    detail: "Major: Embedded Systems · Minor: Power Electronics",
    thesis:
      "Master's Thesis: Integration of wire harness and 3D mechanical design (Grade: 4/5)",
    thesisUrl: "https://trepo.tuni.fi/handle/10024/120220",
  },
  {
    period: "2017 – 2018",
    degree: "Exchange Studies",
    school: "National Taiwan University of Science and Technology, Taipei",
    detail: "Electronics, MCU-OS, power electronics, Mandarin Chinese",
    thesis: null,
    thesisUrl: null,
  },
  {
    period: "2014 – 2017",
    degree: "B.Sc. (Tech.) in Electrical Engineering",
    school: "Tampere University of Technology, Finland",
    detail: "Major: Electronics · Minor: Power Electronics",
    thesis: "Bachelor's Thesis: LED lighting electronics",
    thesisUrl: null,
  },
];

function Education() {
  return (
    <Section id="education" style={{ padding: "6rem 1.5rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h2
          variants={fadeUp}
          custom={0}
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "2.5rem",
          }}
        >
          Education
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {education.map((edu, i) => (
            <motion.div key={edu.period} variants={fadeUp} custom={i}>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  fontFamily: "var(--font-geist-mono)",
                  marginBottom: "0.25rem",
                }}
              >
                {edu.period}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.125rem",
                }}
              >
                {edu.degree}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.375rem",
                }}
              >
                {edu.school}
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  marginBottom: edu.thesis ? "0.25rem" : 0,
                }}
              >
                {edu.detail}
              </div>
              {edu.thesis && (
                edu.thesisUrl ? (
                  <a
                    href={edu.thesisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--accent)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      transition: "color 0.15s",
                    }}
                  >
                    {edu.thesis}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {edu.thesis}
                  </span>
                )
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact" style={{ padding: "6rem 1.5rem 8rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h2
          variants={fadeUp}
          custom={0}
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "2.5rem",
          }}
        >
          Contact
        </motion.h2>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <motion.div
            variants={stagger}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 480, flex: 1 }}
          >
          <motion.p
            variants={fadeUp}
            custom={0}
            style={{
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              lineHeight: 1.6,
            }}
          >
            Open to discussing software architecture, CAD/CAE tools, or industrial
            software opportunities.
          </motion.p>
          <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                href: "mailto:hokkanen.pasi@gmail.com",
                label: "hokkanen.pasi@gmail.com",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
              },
              {
                href: "tel:+358407472506",
                label: "+358 40 747 2506",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.13 6.13l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                ),
              },
              {
                href: "https://www.linkedin.com/in/pasi-hokkanen-5b2198211/",
                label: "linkedin.com/in/pasi-hokkanen",
                external: true,
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                custom={i + 1}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  transition: "color 0.15s",
                }}
                whileHover={{ color: "var(--text-primary)", x: 4 }}
              >
                {item.icon}
                {item.label}
              </motion.a>
            ))}
          </motion.div>
          </motion.div>
          <img
            src="/CV/portrait.jpg"
            alt="Portrait"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        {new Date().getFullYear()} · Pasi Hokkanen
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <img
          src="/CV/banner.jpg"
          alt="Banner"
          style={{
            width: "100%",
            maxWidth: "1200px",
            aspectRatio: "21/9",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            margin: "0 auto",
          }}
        />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
