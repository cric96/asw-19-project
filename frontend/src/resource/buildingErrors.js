
export const creationBuildingError = {
    401: "Non sei autorizzato, la tua sessione potrebbe essere scaduta",
    default: "Errore durante la creazione dell'abitazione"
}

export const editBuildingError = {
    401: creationBuildingError[401],
    404: "Abitazione inesistente",
    403: "Solo il proprietario può modificare questa abitazione",
    default: "Errore durante l'aggiornamento dell'abitazione"
}