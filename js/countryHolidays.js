import holidayApiKey from "./apiKey.js";

const apiKey = holidayApiKey.API_KEY;

document.querySelector("#getHoliday").addEventListener("click", getHoliday);

function getHoliday() {
  const holidaySection = document.querySelector("#holidaySection");

  fetch(`https://api.sampleapis.com/countries/countries`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.forEach((country) => {
        if (
          country.abbreviation === "CA" || // Canada
          country.abbreviation === "JM" || // Jamaica
          country.abbreviation === "BR" || // Brazil
          country.abbreviation === "GR" || // Greece
          country.abbreviation === "JP" || //Japan
          country.abbreviation === "ES" || //Spain
          country.abbreviation === "IT" || //Italy
          country.abbreviation === "GH" || // Ghana
          country.abbreviation === "ZW" || //Zimbabwe
          country.abbreviation === "MX" // Mexico
        ) {
          // console.log(country.abbreviation);

          fetch(
            `https://api.api-ninjas.com/v1/holidays?country=${country.abbreviation}&year=2024&type=major_holiday`,
            {
              method: "GET",
              headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((holidayData) => {
              // console.log(`Holidays for ${country.abbreviation}:`, holidayData);

              // New element for each country
              const countrySection = document.createElement("div");

              // New element for country name
              const countryName = document.createElement("h2");
              countryName.innerText = country.name;
              countrySection.appendChild(countryName);

              // New ul element for holidays
              const holidayList = document.createElement("ul");

              if (holidayData.length > 0) {
                holidayData.forEach((holiday) => {
                  // Create list items for holiday name and date
                  const holidayName = document.createElement("li");
                  holidayName.innerText = holiday.name;

                  // Change the format of the returned date
                  const holidayDate = document.createElement("li");
                  holidayDate.innerText = new Date(holidayDate).toDateString();

                  holidayList.append(holidayName, holidayDate);
                });

                countrySection.appendChild(holidayList);
                holidaySection.appendChild(countrySection);
              }
            })
            .catch((err) => {
              console.log(
                `Error fetching holidays for ${country.abbreviation}: ${err}`
              );
            });
        }
      });
    })
    .catch((err) => {
      console.log(`Error fetching countries: ${err}`);
    });
}
