const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    const listItem = this.renderListItem(flick)
    var promoteButton = document.createElement('button')
    var deleteButton = document.createElement('button')
    var upButton = document.createElement('button')
    var downButton = document.createElement('button')

    upButton.classList.add('up')
    downButton.classList.add('down')
    deleteButton.classList.add('del')
    promoteButton.classList.add('promo')
    promoteButton.classList.add('notclicked')
    promoteButton.textContent = '❤'
    deleteButton.textContent = '🗑'
    upButton.textContent = '👆'
    downButton.textContent = '👇'

    this.list.appendChild(listItem)
    listItem.appendChild(promoteButton)
    listItem.appendChild(deleteButton)
    listItem.appendChild(upButton)
    listItem.appendChild(downButton)
    deleteButton.addEventListener("click", anotherFunction.bind(this))
    promoteButton.addEventListener("click", myFunction)
    
    //delete
    function anotherFunction(ev){
      for (var i=0; i < this.flicks.length; i++){
        if (this.flicks[i].name === flick.name) {
          this.flicks.splice(i,1);
          break;
        }
      }
      this.list.removeChild(listItem)
    }

    //promote
    function myFunction(){
        if (promoteButton.classList.contains('notclicked')){
            this.classList.add('clicked')
            listItem.style.backgroundColor = 'yellow'
            listItem.style.textTransform = "uppercase"
            listItem.style.fontSize = '30px'
            this.classList.remove('notclicked')
        }else{
            listItem.style.backgroundColor = '#DDA0DD'
            this.classList.add('notclicked')
            listItem.style.textTransform = "none"
            listItem.style.fontSize = '18px'
            this.classList.remove('clicked')
        }
    }
    
    //Add flick to this.flicks
    this.flicks.push(flick)
    
    ++ this.max
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    return item
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list'
})