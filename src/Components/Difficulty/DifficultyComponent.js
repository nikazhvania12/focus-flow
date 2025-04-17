import './difficultyComponent.css';

function DifficultyComponent() {
    const data = "Easy";

    const themes = [
        {name: "Easy", background: "#08A508"},
        {name: "Normal", background: "#FFBE0B"},
        {name: "Hard", background: "#FA4D4D"}
    ]

    const theme = themes.find(x => x.name === data);

    return (
        theme && 
        <div className="difficulty-container" style={{borderColor: theme.background, color: theme.background}}>
            <p>{theme.name}</p>
        </div>
    )
}

export default DifficultyComponent;