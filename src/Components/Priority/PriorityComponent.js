import './priorityComponent.css';


function PriorityComponent({ data }) {
    const themes = [
        {name: "Low", background: "#08A508"},
        {name: "Medium", background: "#FFBE0B"},
        {name: "High", background: "#FA4D4D"}
    ]

    const theme = themes.find(x => x.name === data.name);

    return (
        theme && 
        <div className="priority-component" style={{borderColor: theme.background, color: theme.background}}>
            <img src={data.filepath} />
            {"\u00A0"}
            <p>{data.name}</p>
        </div>
    )
}

export default PriorityComponent;