import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faTwitter, faXTwitter, faYoutube, IconDefinition } from "@fortawesome/free-brands-svg-icons"
import { faPhone, faEnvelope, faHome, faFile, faGlobe } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { BackendData } from '@/pages'

const socialPlatformToIconMap: {
    [platform: string] : IconDefinition
} = {
    github: faGithub,
    linkedin: faLinkedin,
    resume: faFile,
    twitter: faTwitter,
    x: faXTwitter,
    instagram: faInstagram,
    youtube: faYoutube,
}

type IntroProps = Omit<BackendData, 'projects_section'>

function Intro({ header, contact, socials }: IntroProps) {
    return (
        <section className="home_banner_area">
           	<div className="container box_1620">
           		<div className="banner_inner d-flex align-items-center justify-content-center">
					<div className="banner_content d-flex flex-column align-items-center">
						<div className="media d-flex">
							<img src={header.headshot} alt="headshot" className="headshot"></img>
							<div className="media-body">
								<div className="personal_text">
									<h6>Hi, I'm</h6>
									<h3>{header.full_name}</h3>
									<h4>{header.caption}</h4>
									<p className="about_me">{header.description}</p>
									<div className='d-flex links'>
										<ul className="list basic_info">
											<li><p><FontAwesomeIcon icon={faPhone} /> {contact.phone_number}</p></li>
											<li><a className="mylink" href={`mailto:${contact.email}`}><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</a></li>
											{contact.location ? <li><p><FontAwesomeIcon icon={faHome} /> {contact.location}</p></li> : <></>}
										</ul>
										<ul className="list basic_info">
                                            {socials?.length ? socials?.map(({ platform, link }, i) => 
                                                <li key={i}><a href={link} target="_blank" rel="noreferrer" className="mylink"><FontAwesomeIcon icon={socialPlatformToIconMap[platform.toLowerCase()]} /> {platform}</a></li>
                                            ) : <></>}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        </section>
    )
}

export default Intro
