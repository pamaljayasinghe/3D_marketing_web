"use client";
import React from "react";
import { motion } from "framer-motion";
import "../app/styles/team.css";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Pamal Jayasinghe",
      role: "Full-Stack Developer",
      image: "/models/pamal.png",
    },
    {
      name: "Seniru Pathirana",
      role: "Full-Stack Developer",
      image: "/models/seniru.jpeg",
    },
    {
      name: "Nethini Perera",
      role: "Backend Developer",
      image: "/models/nethini.jpeg",
    },
    {
      name: "Aeron Wijetunge",
      role: "Full-Stack Developer",
      image: "/models/aeron.png",
    },
    {
      name: "Pasan Hewawasam",
      role: "Backend Developer",
      image: "/models/pasan.jpeg",
    },
    {
      name: "Vishnu Priyan",
      role: "Backend Developer",
      image: "/models/profile.png",
    },
  ];

  return (
    <section className="team-section" id="team">
      <div className="team-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="team-header"
        >
          <h2>Meet Our Team</h2>
          <p className="team-description">
            Our diverse team of experts brings together years of experience in
            design, development, and innovation. Together, we are committed to
            delivering exceptional results for our clients.
          </p>
        </motion.div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="team-member"
            >
              <div className="member-image-container">
                <div className="member-image-wrapper">
                  <div className="member-image-overlay"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image"
                  />
                </div>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
