export const http = {
    makePost: async(method, payload) =>{
        const result = await fetch(
            "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries", {method, body: JSON.stringify(payload) }
          );
          const jsonData = await result.json();
return jsonData
        //   result.then((res) => res.json())
        //   .then(res => res)
        //   return result
    }
    
};
