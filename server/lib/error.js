function errorHandler(e){
    switch(e) {
        case 'User Exists':
            return e;
            break;   
        case 'Invalid User':
            return e;
            break;  
        case 'Invalid Password':
            return e;
            break;      
        case 'JWT ERROR':
            return e;
            break;
        default:
          return "Unhandled Error:"+e;
    }
}

export{
    errorHandler
}