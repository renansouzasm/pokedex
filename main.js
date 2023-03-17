const url = "";

const api = async ( url ) => {
    await fetch( url )
    .then((data) => data.json())
    .catch((error) => console.log(error));
}
api( url );


