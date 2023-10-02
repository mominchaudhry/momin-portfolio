'use client'
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import axios from 'axios';
import React, { useEffect } from 'react'
import _ from 'lodash';

export interface Project {
  title: string,
  link?: string,
  image?: string,
  description: string,
}

export interface ProjectsSection {
  header: string,
  description: string,
  projects: Project[]
}

export interface BackendData {
  header: {
    caption: string,
    full_name: string,
    description: string,
    headshot: string,
  },
  contact: {
    email: string,
    location?: string,
    phone_number: string,
  },
  projects_section?: ProjectsSection,
  socials?: {
    platform: string,
    link: string,
  }[],
}

const baseImagePath = 'data.attributes.url';
const largeImagePath = 'data.attributes.formats.large.url';
const mediumImagePath = 'data.attributes.formats.medium.url';
const smallImagePath = 'data.attributes.formats.small.url';


function HomePage({ data }: { data: BackendData}) {

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className='app'>
        <Intro header={data.header} contact={data.contact} socials={data.socials} />
        { data.projects_section ? <Projects projects_section={data.projects_section} /> : <></>}
    </div>
  )
}

export default HomePage

export async function getStaticProps() {
    const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:1337'
    const response = await axios.get(`${BACKEND_URL}/api/portfolio?populate=deep`);

    const {
      data: {
        data: {
          attributes: {
            header,
            contact,
            socials,
            projects_section
          }
        }
      }
    } = response;

    const propData = {
      header,
      contact,
      socials,
      projects_section,
    }

    const headshotImage = _.get(propData.header.headshot, largeImagePath) ??
                          _.get(propData.header.headshot, baseImagePath) ??
                          _.get(propData.header.headshot, mediumImagePath) ??
                          _.get(propData.header.headshot, smallImagePath);
    propData.header.headshot = headshotImage;

    propData.projects_section.projects.map((project: any) => {
      const projectImage = _.get(project.image, baseImagePath) ??
                          _.get(project.image, largeImagePath) ??
                          _.get(project.image, mediumImagePath) ??
                          _.get(project.image, smallImagePath);
      project.image = projectImage;
      return project;
    });
  
    return {
      props: {
        data: response?.data?.data?.attributes
      },
      revalidate: 60 * 60,
    }
  }