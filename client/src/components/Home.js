import React from 'react';

function Home() {
    const [sample, setSample] = React.useState(null);

    const getSample = () => {
        fetch('/api/sample')
            .then(response => response.json())
            .then(data => setSample(data));
    };

    return (
        <div>
            <button onClick={getSample}>Get sample data</button>
            <h2>{sample && (
                <div>
                    {sample}
                </div>
            )}</h2>
        </div>
    );
}

export default Home;