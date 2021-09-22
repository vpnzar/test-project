import db from '../db.json';

db.displayName;
console.log(db[0].displayName);

const key = 'Km0Hecx17NF6R7dP';
const user = 'vpnazarenko@gmail.com';
const restApi = 'vpnazarenko@gmail.com_Km0Hecx17NF6R7dP';

const resultContactsAPI = async restApi => {
  const response = await fetch(
    `https://know-how.od2.odx.vtiger.com/vpnazarenko@gmail.com_Km0Hecx17NF6R7dP/v1/vtiger/default`,
  );
  const wordsJson = response.json();
};

resultContactsAPI(restApi);
