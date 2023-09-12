import {Link} from 'react-router-dom'

import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    companyLogoUrl,
    employmentType,
    location,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-card">
      <div className="job-card">
        <div className="company-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-stars-container">
            <h1 className="title-heading">{title}</h1>
            <div className="stars-container">
              <BsStarFill className="star-icon" />
              <p className="location-type-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-type-container">
            <div className="card-container">
              <MdLocationOn className="job-card-icon" />
              <p className="location-type-text">{location}</p>
            </div>
            <div className="card-container">
              <BsFillBriefcaseFill className="job-card-icon" />
              <p className="location-type-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="description-title">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
