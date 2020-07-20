export const saveItem = (name, data) => {
    if(localStorage){
        localStorage.setItem(name, JSON.stringify(data));
    }
}

export const retrieveItem = (name, parse = true) => {
    if(localStorage){
        const data = localStorage.getItem(name);
        if (name) {
            if (parse) return JSON.parse(data)
            return data;
        }
    }
}