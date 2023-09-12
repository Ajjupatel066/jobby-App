import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BiLinkExternal} from 'react-icons/bi'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'

import SimilarJobCard from '../SimilarJobCard'
import SkillItem from '../SkillItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobsData: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      console.log(updatedData)
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
        similarJobsData: updatedSimilarJobsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobsData} = this.state
    const {
      title,
      rating,
      companyLogoUrl,
      employmentType,
      location,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-detials-card">
          <div className="company-role-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="role-stars-container">
              <h1 className="title-heading">{title}</h1>
              <div className="stars-container">
                <BsStarFill className="star-icon" />
                <p className="job-details-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
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
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="description-container">
            <h1 className="description-title">Description</h1>
            <div className="visit-container">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-heading"
              >
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="job-details-card-description">{jobDescription}</p>
          <h1 className="skill-title">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <SkillItem key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          <div className="life-at-company-section">
            <h1 className="life-at-title">Life at Company</h1>
            <div className="description-img-container">
              <p className="life-at-description">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <h1 className="skill-title">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsData.map(eachJob => (
            <SimilarJobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    // eslint-disable-next-line
    const {id} = params
    return (
      <div className="job-item-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-item-failure-img"
        />
        <h1 className="job-item-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="job-item-failure-description">
          We cannot seem to find the page you are looking for
        </p>

        <button
          type="button"
          data-testid="button"
          className="job-item-failure-button"
          onClick={this.getJobDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobDetailsCard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetailsCard()}
      </>
    )
  }
}

export default JobItemDetails
