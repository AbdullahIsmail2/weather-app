import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Search = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const APIKEY = "243840182770b9ab7f767f646c077541";

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchTerm(currentInput);
    setCurrentInput('')
	};

	useEffect(() => {
		if (searchTerm) {
			fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&appid=${APIKEY}`
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setLatitude(data[0].lat);
					setLongitude(data[0].lon);
				});
		}
	}, [searchTerm]);

	useEffect(() => {
		if (longitude && latitude) {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					const temp = Math.round(data.main.temp - 273.15);
					console.log(temp);
					const maxTemp = Math.round(data.main.temp_max - 273.15);
					const minTemp = Math.round(data.main.temp_min - 273.15);
					const feelsLike = Math.round(data.main.feels_like - 273.15);
					const location = data.name;
				});
		}
	}, [longitude, latitude]);

	return (
		<form action="" onSubmit={handleSubmit}>
			<label htmlFor="">Location: </label>
			<input
				type="text"
				value={currentInput}
				onChange={(e) => setCurrentInput(e.target.value)}
			/>
			<button>Get Weather</button>
		</form>
	);
};

export default Search;
