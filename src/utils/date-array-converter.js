const dateArrayConverter = (jsDate) => {
    return [ jsDate.getUTCFullYear(), jsDate.getUTCMonth(), jsDate.getUTCDate(), jsDate.getUTCHours(), jsDate.getUTCMinutes() ];    
}

export default dateArrayConverter;