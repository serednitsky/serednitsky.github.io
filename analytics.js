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
                width: document.querySelector('.container').offsetWidth,
                height: document.querySelector('.container').offsetHeight,
                colors: {
                    background: "transparent",
                    grid: "#393939",
                    inactive: "#ddd"
                },
               /* title: "CP TECH RADAR - ANALYTICS", */
                quadrants: [
                    {name: "Data Management"},
                    {name: "Platform & Infrastructure"},
                    {name: "Techniques & Tools"},
                    {name: "Languages & Frameworks"},
                ],
                rings: [
                    {name: "ADOPT", color: "#3853f3"},
                    {name: "TRIAL", color: "#3853f3"},
                    {name: "ASSESS", color: "#3853f3"},
                    {name: "HOLD", color: "#3853f3"}
                ],
                print_layout: true,
                entries: data
            });
        })
}
