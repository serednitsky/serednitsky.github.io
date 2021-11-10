function mobileVisualization() {
    clearBox('radar')

    async function sendRequest(method, url) {
        return fetch(url).then(response => {
            return response.json()
        })
    }

    const requestURL = 'https://script.google.com/macros/s/AKfycbwaMODg9acevseHPsTpVBp1gb6nle43vwm3SP2zoKtQsE63Qgg1CnlcZynkmkjb_6k-/exec'


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
