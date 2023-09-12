import './index.css'

import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'

const FiltersGroup = props => {
  const renderEmploymentTypesFilter = () => {
    const {employmentTypesList} = props

    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(eachType => {
            const {changeEmployeeList} = props
            const onSelectEmploymentType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="employment-type"
                key={eachType.employmentTypeId}
                onChange={onSelectEmploymentType}
              >
                <input
                  className="check-input"
                  type="checkbox"
                  id={eachType.employmentTypeId}
                  value={eachType.employmentTypeId}
                />
                <label
                  htmlFor={eachType.employmentTypeId}
                  className="check-label"
                >
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryFilter = () => {
    const {salaryRangesList} = props

    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Salary Range</h1>
        <ul className="employment-type-list">
          {salaryRangesList.map(eachSalaryRange => {
            const {changeSalaryRange} = props
            const onSelectSalaryRange = () => {
              changeSalaryRange(eachSalaryRange.salaryRangeId)
            }
            return (
              <li
                className="employment-type"
                key={eachSalaryRange.salaryRangeId}
                onChange={onSelectSalaryRange}
              >
                <input
                  type="radio"
                  className="check-input"
                  value="salary"
                  id={eachSalaryRange.salaryRangeId}
                />
                <label
                  htmlFor={eachSalaryRange.salaryRangeId}
                  className="check-label"
                >
                  {eachSalaryRange.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  const onchangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props

    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          placeholder="Search"
          onChange={onchangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return (
    <div className="filter-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="hr-line" />
      {renderEmploymentTypesFilter()}
      <hr className="hr-line" />
      {renderSalaryFilter()}
    </div>
  )
}

export default FiltersGroup
