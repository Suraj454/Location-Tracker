
console.log("hello")
const showDetails = document.querySelector(".showDetails");
const fullAddress = document.querySelector(".fullAddress");
const formattedAddress = document.querySelector(".formattedAddress");

let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
let apiKey = "d04af01a92ad4ea0b67719e07456ad90";

//api to get user address
const getUserCurrentAddress = async (latitude, longitude) => {

    let query = `${latitude},${longitude}`;
    let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`;

    try {
        const res = await fetch(apiUrl)
        const data = await res.json();
        console.log(data)
        const { state_district, state, postcode, country } = data.results[0].components;
        fullAddress.textContent = `User address: ${state_district}, ${postcode}, ${state}, ${country}`;
        formattedAddress.textContent = `User full address: ${data.results[0].formatted}`;

    }
    catch (error) {
        console.log(error);
    }

}

document.querySelector(".geo-btn").addEventListener("click", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                showDetails.textContent = ` the latitude ${latitude} & longitude ${longitude}`

                getUserCurrentAddress(latitude, longitude);

            },
            (error) => {
                showDetails.textContent = error.message;
                console.log(error.message);
            }
        );
    }
});