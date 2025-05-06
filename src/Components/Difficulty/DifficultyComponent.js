import './difficultyComponent.css';

function DifficultyComponent({ data }) {
    const themes = [
        {name: "Easy", background: "#08A508"},
        {name: "Normal", background: "#FFBE0B"},
        {name: "Hard", background: "#FA4D4D"}
    ]
    const theme = themes.find(x => x.name === data.name);

    return (
        theme && 
        <div className="difficulty-container" style={{borderColor: theme.background, color: theme.background}}>
            <p>{theme.name}</p>
        </div>
    )
}

export default DifficultyComponent;