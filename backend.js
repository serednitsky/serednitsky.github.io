function backendVisualization() {
    clearBox('radar')

    async function sendRequest(method, url) {
        return fetch(url).then(response => {
            return response.json()
        })
    }

    const requestURL = 'https://script.google.com/macros/s/AKfycbwtoEusLLLVHvWaFgxXJXsHc0zmex3qIglqpWY4DGJY41sNUW9ReO6epRrPjvBjgSUJ/exec'


    let radarData
    sendRequest('GET', requestURL)
        .then(data => {

            radarData = data
            radar_visualization({
                svg_id: "radar",
                width: 1450,
                height: 1000,
                colors: {
                    background: "#fff",
                    grid: "#bbb",
                    inactive: "#ddd"
                },
                title: "CP TECH RADAR - BACKEND",
                quadrants: [
                    { name: "Data Management" },
                    { name: "Platform & Infrastructure" },
                    { name: "Techniques & Tools" },
                    { name: "Languages & Frameworks" },
                ],
                rings: [
                    { name: "ADOPT", color: "#15c400" },
                    { name: "TRIAL", color: "#3ad2bf" },
                    { name: "ASSESS", color: "#fbac00" },
                    { name: "HOLD", color: "#ef4c6b" }
                ],
                print_layout: true,
                entries: radarData
            });
        })



}
