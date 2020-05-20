// validation

export const isURL = (str) =>
{
  const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}


// getting data

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
    //return response; // parses JSON response into native JavaScript objects
    if(response.status === 200){
      return response.json(); // parses JSON response into native JavaScript objects
    } else {
      return {
        status: 'error',
        errorCode: response.status,
      };
    }
  }

export const fetchData = async (url = '') => {
  const response = await fetch( url ,{credentials: 'include'});

  if(response.status === 200){
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
    return {
      status: 'error',
      errorCode: response.status,
    };
  }
}


  // Formatting data

export const formatListLinks = (data) => {
    return data.map((item)=> {
      return {
        id:item.id,
        title:item.title,
        subtitle:item.description,
        image: item.image,
        link: item.url,
        site: item.site.name,
        timestamp: item.created_at,
      }; 
    }); 
  }

  export const formatListCollections = (data) => {
    console.log(data);
    return data.map((item)=> {
      return {
        id:item.id,
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