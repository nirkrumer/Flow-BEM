export const executeApi = async (url: string, method:string, jsonBody:any , headers:any) => {
      fetch(url,
      { 
          method: method,
          body: jsonBody,
          headers : headers,
          credentials: "same-origin",
          mode: 'no-cors'
      });
  }