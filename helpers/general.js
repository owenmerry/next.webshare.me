
// general functions

export const postData = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
   // console.log(response);
    //return response; // parses JSON response into native JavaScript objects
    return response.json(); // parses JSON response into native JavaScript objects
  }


  // Formatting data

export const formatListLinks = (data) => {
    return data.map((item)=> {
      return {
        title:item.title,
        subtitle:item.description,
        image: item.image,
        link: item.url,
        timestamp: item.created_at,
      }; 
    }); 
  }

  export const formatListCollections = (data) => {
    console.log(data);
    return data.map((item)=> {
      return {
        title:item.name,
        image: item.image,
        link: `/collection/${item.id}`,
        timestamp: item.created_at,
      }; 
    }); 
  }

  export const formatListCollectionsUser = (data) => {
    console.log(data);
    return data.map((item)=> {
      return {
        title:item.name,
        image: item.image,
        link: `/collection/${item.collection_id}`,
        timestamp: item.created_at,
      }; 
    }); 
  }

  export const getTopResults = (data,amount) => {
    const dataTop = [];
    const dataOrdered = data.reverse();
    for (var i = 0; i < amount; i++) {
      if(dataOrdered[i]){
        dataTop.push(dataOrdered[i]);
      }
    }

    return dataTop;
  }