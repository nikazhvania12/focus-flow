import './priorityComponent.css';
import LowImg from '../../Resources/LowPriority.png'
import MediumImg from '../../Resources/MediumPriority.png'
import HighImg from '../../Resources/HighPriority.png'


function PriorityComponent({ data }) {

    const themes = [
        {name: "Low", background: "#08A508", icon: LowImg},
        {name: "Medium", background: "#FFBE0B", icon: MediumImg},
        {name: "High", background: "#FA4D4D", icon: HighImg}
    ]

    const theme = themes.find(x => x.name === data);

    return (
        theme && 
        <div className="priority-component" style={{borderColor: theme.background, color: theme.background}}>
            <img src={theme.icon} />
            {"\u00A0"}
            <p>{theme.name}</p>
        </div>
    )
}

export default PriorityComponent;