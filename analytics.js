function analyticsVisualization() {
    clearBox('radar')

    async function sendRequest(method, url) {
        return fetch(url).then(response => {
            return response.json()
        })
    }

    const requestURL = 'https://script.google.com/macros/s/AKfycbxmVqJ3reHhhos-R7mVrht1m1mBXTw5Lc-qrnDZjSLkSOT7d1IeVcA0pRO_BQOs-uu9/exec'


    sendRequest('GET', requestURL)
        .then(data => {

            radar_visualization({
                svg_id: "radar",
                width: 1450,
                height: 1000,
                colors: {
                    background: "#fff",
                    grid: "#bbb",
                    inactive: "#ddd"
                },
                title: "CP TECH RADAR - ANALYTICS",
                quadrants: [
                    {name: "Data Management"},
                    {name: "Platform & Infrastructure"},
                    {name: "Techniques & Tools"},
                    {name: "Languages & Frameworks"},
                ],
                rings: [
                    {name: "ADOPT", color: "#15c400"},
                    {name: "TRIAL", color: "#3ad2bf"},
                    {name: "ASSESS", color: "#fbac00"},
                    {name: "HOLD", color: "#ef4c6b"}
                ],
                print_layout: true,
                entries: data
            });
        })


}
