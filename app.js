const app = {
    init(formSelector){
        this.max = 0
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.addFlick)
    },

    addFlick(e){
            e.preventDefault()
            const flickName = e.target
            const flick = {
                id: this.max +1,
                name: f.flickName.value,
            }
            ++this.max
    },
}

app.init("#flickForm")