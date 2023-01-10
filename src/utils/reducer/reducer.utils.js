export const createAction = (typeInput, payloadInput) => {
    return { 
        type: typeInput, 
        payload: payloadInput };
}