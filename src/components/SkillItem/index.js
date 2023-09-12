import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-item-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
