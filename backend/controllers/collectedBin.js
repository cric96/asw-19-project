module.exports = class CollectedBin {
    constructor(binCategory) {
        this.collectedTrashes = []
        this.binCategory = binCategory
        this.binCategory.trashCategories = undefined
    }

    pushTrash(trashCategory, amount) {
        this.collectedTrashes.push({
            trashCategory : trashCategory,
            quantity : amount
        })
    }

    toJSON() {
        return {
            binCategory : this.binCategory,
            collectedTrashes : this.collectedTrashes
        }
    }
}