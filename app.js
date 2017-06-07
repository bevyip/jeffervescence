const app = {
    init(formSelector){
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addFlick)
    },
    
    renderListItem(flick){
        const item = document.createElement('li')
        item.textContent = flick.name
        return item
    },

    addFlick(e){
            e.preventDefault()
            const flickName = e.target
            const flick = {
                id: this.max +1,
                name: flickName.value,
            }

            const listItem = this.renderListItem(flick)
            this.list.appendChild(listItem)
        
        //TODO: Add items to flicks array

            ++this.max
    },

}

app.init({
    formSelector: '#flick-form',
    listSelector: '#flick-list',
})
