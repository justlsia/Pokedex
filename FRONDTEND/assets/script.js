// Appel API : Pokémon
const API_URL = 'http://localhost:5001/';
const tbody = document.getElementById("table-tbody");

// Fonction pour récupérer les données de l'API
const fetchDatas = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return null
  }
};

// Fonction pour insérer les données dans le tableau
const insertDatas = async () => {
	try {
		const datas = await fetchDatas();
		if (datas) {
		datas.forEach(data => {
			const tr = document.createElement("tr");
			tr.innerHTML =
			`
			<td>${data.id}</td>
			<td>${data.name.french}</td>
			<td>${data.base.HP} </td>
		  	`;
	  
		  tbody.appendChild(tr);
		});
		}
	} catch (error) {
		console.error("Erreur lors de l'insertion des données:", error);
	}
};


// 
insertDatas();