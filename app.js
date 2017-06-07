const app = {
    init(formSelector){
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.addFlick)
    },

    addFlick(e){
            e.preventDefault()
            const flickName = e.target.flickName.value
            console.log(flickName)
    },
}

app.init("#flickForm")