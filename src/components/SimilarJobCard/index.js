import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="role-details-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="role-rating-section">
          <h1 className="role-title">{title}</h1>
          <div className="stars-container">
            <BsStarFill className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-text-title">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-type-container">
        <div className="card-container">
          <MdLocationOn className="job-details-card-icon" />
          <p className="job-details-text">{location}</p>
        </div>
        <div className="card-container">
          <BsFillBriefcaseFill className="job-details-card-icon" />
          <p className="job-details-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
