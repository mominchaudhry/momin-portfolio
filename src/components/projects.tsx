import { ProjectsSection } from '@/pages'
import React from 'react'
import ProjectCard from './project-card'

function Projects({projects_section}: { projects_section: ProjectsSection}) {

    const {
        header,
        description,
        projects,
    } = projects_section;

    return (
        <section className="feature_area p_120">
        	<div className="container">
        		<div className="main_title">
        			<h2>{header}</h2>
        			<p>{description}</p>
        		</div>
        	</div>
            <br />
        	<div className="container">
        		<div className="feature_inner row">
                    {projects.length >= 1 ?
                        projects.map(
                            (project, index) => 
                            <ProjectCard 
                                key={index} 
                                title={project.title} 
                                description={project.description}
                                image={project.image}
                                link={project.link}
                            />
                        ) : <> </>
                    }
        		</div>
			</div>
        </section>
    )
}

export default Projects
