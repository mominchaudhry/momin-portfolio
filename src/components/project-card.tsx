import { Project } from '@/pages'
import React from 'react'

function ProjectCard({title, description, image, link}: Project) {

    const handleClick = () => {
        window.open(link)
    }


    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="feature_item" onClick={handleClick}>
                <div className="g_img_item">
                    <img className="project_imgs" src={image} alt=""></img>
                </div>
                <div className="g_item_text">
                    <h4>{title}</h4>
                    <a href={link}><p className="github_links">{link}</p></a>
                    <p>{description}</p> 
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
