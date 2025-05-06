import React from "react";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import abdulla from "../../assets/20607.jpg" 
import kaif from "../../assets/kaifPF.jpg" 

const Team = () => {
  const teamMembers = [
    {
      name: "KAIF SHAH",
      role: "Lead Developer",
      bio: "Cybersecurity specialist focused on penetration testing and vulnerability assessment. Conference speaker and open-source contributor.",
      avatar: kaif,
      social: {
        github: "https://github.com/alexmorgan",
        linkedin: "https://linkedin.com/in/alexmorgan",
        twitter: "https://twitter.com/alexmorgan",
        email: "alex@example.com",
      },
    },
    {
      name: "Kalpesh Gupta",
      role: "Full Stack Developer",
      bio: "Full-stack developer with 2+ years of experience in React and Node.js. Passionate about cybersecurity and building robust applications.",
      avatar: "/KalpeshGupta.jpg",
      social: {
        github: "https://github.com/Kalpeshji",
        linkedin: "https://www.linkedin.com/in/kalpesh-gupta-%F0%9F%A5%87-a9a62b251?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B3veUwNXaRp25uGpVfMb4qw%3D%3D",
        website: "https://sarahchen.dev",
      },
    },
    {
      name: "ABDULLA VORA",
      role: "Full Stack Developer",
      bio: "Full-stack developer with 1.2+ years of experience in React and Node.js. Passionate about cybersecurity and building robust applications.",
      avatar: abdulla,
      social: {
        github: "https://github.com/AbdullaVora",
        linkedin: "https://www.linkedin.com/in/abdulla-vora-820872336?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BHdpTGggySxaldD1ycawRZg%3D%3D",
        email: "jamie@example.com",
      },
    },
    {
      name: "ARPIT PATEL",
      role: "UI/UX Designer",
      bio: "Designer with a keen eye for creating intuitive user interfaces. Blends aesthetics with functionality to create seamless user experiences.",
      avatar: "/api/placeholder/400/400",
      social: {
        twitter: "https://twitter.com/michaelr",
        linkedin: "https://linkedin.com/in/michaelr",
        website: "https://michaelr.design",
      },
    },
  ];

  const SocialIcon = ({ type, link }) => {
    const icons = {
      github: <Github size={18} />,
      linkedin: <Linkedin size={18} />,
      twitter: <Twitter size={18} />,
      email: <Mail size={18} />,
      website: <Globe size={18} />,
    };

    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-400 hover:text-[#04D2D2] transition-colors duration-300"
      >
        {icons[type]}
      </a>
    );
  };

  return (
    <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
      <PageTitle
        title="Our Team"
        desc="Meet the experts behind our cybersecurity solutions. Our diverse team brings together 
            skills in development, security research, design, and operations."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#040C1F] border border-[#1E293B] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#04D2D280] hover:border-[#04D2D2] group"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#04D2D2] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040C1F] to-transparent opacity-60"></div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#04D2D2] group-hover:translate-x-1 transition-transform duration-300">
                {member.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-gray-300 mb-6">{member.bio}</p>

              <div className="flex items-center border-t border-[#1E293B] pt-4">
                {member.social.github && (
                  <SocialIcon type="github" link={member.social.github} />
                )}
                {member.social.linkedin && (
                  <SocialIcon type="linkedin" link={member.social.linkedin} />
                )}
                {member.social.twitter && (
                  <SocialIcon type="twitter" link={member.social.twitter} />
                )}
                {member.social.email && (
                  <SocialIcon
                    type="email"
                    link={`mailto:${member.social.email}`}
                  />
                )}
                {member.social.website && (
                  <SocialIcon type="website" link={member.social.website} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
